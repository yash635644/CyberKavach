import os
import json
from http.server import BaseHTTPRequestHandler
import google.generativeai as genai

GEMINI_KEY = os.environ.get("GEMINI_API_KEY")

if GEMINI_KEY:
    genai.configure(api_key=GEMINI_KEY)

class handler(BaseHTTPRequestHandler):
    def _set_cors_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS, GET')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
    
    def do_OPTIONS(self):
        self.send_response(200)
        self._set_cors_headers()
        self.end_headers()
    
    def do_POST(self):
        try:
            content_length = int(self.headers.get('Content-Length', 0))
            post_data = self.rfile.read(content_length)
            data = json.loads(post_data.decode('utf-8'))
            
            user_input = data.get('text', '').strip()
            
            if not user_input:
                self._send_error(400, "No text provided")
                return
            
            if not GEMINI_KEY:
                self._send_error(500, "GEMINI_API_KEY not configured")
                return
            
            prompt = f"""Act as a Cyber Security Expert. Analyze this message: "{user_input}"

Identify if it is a scam (UPI fraud, Bank KYC scam, Phishing, Lottery scam, etc.).

Return ONLY valid JSON in this exact format (no markdown, no code blocks):
{{
    "riskScore": <number between 0-100>,
    "verdict": "<SAFE or SUSPICIOUS or DANGEROUS>",
    "explanation": "<Brief reason in 2-3 sentences>"
}}"""
            
            model = genai.GenerativeModel('gemini-1.5-flash')
            response = model.generate_content(prompt)
            
            result_text = response.text.strip()
            
            if '```' in result_text:
                parts = result_text.split('```')
                if len(parts) >= 2:
                    result_text = parts[1]
                    if result_text.startswith('json'):
                        result_text = result_text[4:].strip()
            
            result_text = result_text.replace('```', '').strip()
            result_json = json.loads(result_text)
            
            self._send_json(200, result_json)
            
        except Exception as e:
            self._send_error(500, f"Analysis failed: {str(e)}")
    
    def do_GET(self):
        self._send_json(200, {"status": "API running", "gemini_configured": GEMINI_KEY is not None})
    
    def _send_json(self, status_code, data):
        self.send_response(status_code)
        self._set_cors_headers()
        self.send_header('Content-Type', 'application/json')
        self.end_headers()
        self.wfile.write(json.dumps(data).encode('utf-8'))
    
    def _send_error(self, status_code, message):
        self._send_json(status_code, {"error": message})
