import os
import json
import traceback
from http.server import BaseHTTPRequestHandler
from supabase import create_client, Client # Added import

try:
    import google.generativeai as genai
    GENAI_AVAILABLE = True
except Exception as import_error:
    genai = None
    GENAI_AVAILABLE = False

# Load Environment Variables
GEMINI_KEY = os.environ.get("GEMINI_API_KEY")
SUPABASE_URL = os.environ.get("SUPABASE_URL")
SUPABASE_KEY = os.environ.get("SUPABASE_ANON_KEY")

# Initialize Supabase Client
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY) if SUPABASE_URL and SUPABASE_KEY else None

if GEMINI_KEY and GENAI_AVAILABLE:
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

            # 1. Call Gemini AI
            model = genai.GenerativeModel('gemini-1.5-flash')
            prompt = f"Analyze this for scams. Return ONLY JSON: {{\"riskScore\": 0-100, \"verdict\": \"SAFE/SUSPICIOUS/DANGEROUS\", \"explanation\": \"reason\"}}\n\nMessage: {user_input}"
            
            response = model.generate_content(prompt)
            result_text = response.text
            
            # Clean JSON Response
            if '{' in result_text and '}' in result_text:
                result_text = result_text[result_text.find('{'):result_text.rfind('}') + 1]
            
            result_json = json.loads(result_text)

            # 2. LOG TO SUPABASE (New logic)
            if supabase:
                try:
                    supabase.table('scam_logs').insert({
                        "message_text": user_input,
                        "risk_score": result_json.get("riskScore", 0),
                        "verdict": result_json.get("verdict", "UNKNOWN")
                    }).execute()
                    print("✅ Log saved to Supabase")
                except Exception as db_err:
                    print(f"❌ Supabase Error: {db_err}")

            self._send_json(200, result_json)
            
        except Exception as e:
            self._send_error(500, f"Server error: {str(e)}")

    def _send_json(self, status_code, data):
        self.send_response(status_code)
        self._set_cors_headers()
        self.send_header('Content-Type', 'application/json')
        self.end_headers()
        self.wfile.write(json.dumps(data).encode('utf-8'))

    def _send_error(self, status_code, message):
        self._send_json(status_code, {"error": message})
