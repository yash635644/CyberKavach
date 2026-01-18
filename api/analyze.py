import os
import json
from http.server import BaseHTTPRequestHandler
import google.generativeai as genai

# Initialize Clients
GEMINI_KEY = os.environ.get("GEMINI_API_KEY")
SUPABASE_URL = os.environ.get("SUPABASE_URL")
SUPABASE_KEY = os.environ.get("SUPABASE_KEY")

# Configure Gemini
if GEMINI_KEY:
    genai.configure(api_key=GEMINI_KEY)

# Only import and create Supabase client if credentials exist
supabase = None
if SUPABASE_URL and SUPABASE_KEY:
    try:
        from supabase import create_client
        supabase = create_client(SUPABASE_URL, SUPABASE_KEY)
    except Exception as e:
        print(f"Supabase initialization failed: {e}")
        supabase = None

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
            # Read request data
            content_length = int(self.headers.get('Content-Length', 0))
            post_data = self.rfile.read(content_length)
            data = json.loads(post_data.decode('utf-8'))
            
            user_input = data.get('text', '').strip()
            if not user_input:
                self._send_error(400, "No text content provided")
                return
            
            # Check if API key exists
            if not GEMINI_KEY:
                self._send_error(500, "GEMINI_API_KEY not configured in Vercel")
                return
            
            # Create prompt
            prompt = f"""Act as a Cyber Security Expert. Analyze this message: "{user_input}"

Identify if it is a scam (UPI fraud, Bank KYC scam, Phishing, Lottery scam, etc.).

Return ONLY valid JSON in this exact format (no markdown, no code blocks):
{{
    "riskScore": <number between 0-100>,
    "verdict": "<SAFE or SUSPICIOUS or DANGEROUS>",
    "explanation": "<Brief reason in 2-3 sentences>"
}}"""
            
            # Call Gemini AI - CHANGED MODEL NAME
            model = genai.GenerativeModel('gemini-1.5-flash')
            response = model.generate_content(prompt)
            
            # Clean response - IMPROVED CLEANING
            result_text = response.text.strip()
            
            # Remove markdown if present
            if '```' in result_text:
                parts = result_text.split('```')
                if len(parts) >= 2:
                    result_text = parts[1]
                    if result_text.startswith('json'):
                        result_text = result_text[4:].strip()
            
            result_text = result_text.replace('```', '').strip()
            
            # Parse JSON
            result_json = json.loads(result_text)
            
            # Validate fields
            required_fields = ['riskScore', 'verdict', 'explanation']
            if not all(field in result_json for field in required_fields):
                raise ValueError("AI response missing required fields")
            
            # Save to Supabase (optional)
            if supabase:
                try:
                    supabase.table('scam_logs').insert({
                        "message_text": user_input,
                        "risk_score": result_json["riskScore"],
                        "verdict": result_json["verdict"]
                    }).execute()
                except Exception as db_error:
                    print(f"Supabase error (non-critical): {db_error}")
            
            # Return success
            self._send_json(200, result_json)
            
        except json.JSONDecodeError as e:
            self._send_error(500, f"Failed to parse AI response: {str(e)}")
        except Exception as e:
            self._send_error(500, f"Analysis failed: {str(e)}")
    
    def do_GET(self):
        """Handle GET requests for testing"""
        self._send_json(200, {
            "status": "Cyber Kavach API is running",
            "endpoint": "/api/analyze",
            "method": "POST",
            "gemini_configured": GEMINI_KEY is not None,
            "supabase_configured": supabase is not None
        })
    
    def _send_json(self, status_code, data):
        self.send_response(status_code)
        self._set_cors_headers()
        self.send_header('Content-Type', 'application/json')
        self.end_headers()
        self.wfile.write(json.dumps(data).encode('utf-8'))
    
    def _send_error(self, status_code, message):
        self._send_json(status_code, {"error": message})
