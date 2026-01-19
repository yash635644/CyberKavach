import os
import json
import traceback
from http.server import BaseHTTPRequestHandler
from supabase import create_client, Client

try:
    import google.generativeai as genai
    from google.generativeai.types import RequestOptions
    GENAI_AVAILABLE = True
except Exception as import_error:
    print(f"IMPORT ERROR: {import_error}")
    genai = None
    GENAI_AVAILABLE = False

# Load Environment Variables
GEMINI_KEY = os.environ.get("GEMINI_API_KEY")
SUPABASE_URL = os.environ.get("SUPABASE_URL")
SUPABASE_KEY = os.environ.get("SUPABASE_ANON_KEY")

# Initialize Supabase Client
supabase: Client = None
if SUPABASE_URL and SUPABASE_KEY:
    try:
        supabase = create_client(SUPABASE_URL, SUPABASE_KEY)
    except Exception as e:
        print(f"Supabase Init Error: {e}")

# Initialize Gemini
if GEMINI_KEY and GENAI_AVAILABLE:
    try:
        genai.configure(api_key=GEMINI_KEY)
    except Exception as e:
        print(f"Gemini Config Error: {e}")

class handler(BaseHTTPRequestHandler):
    def _set_cors_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS, GET')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
    
    def do_OPTIONS(self):
        self.send_response(200)
        self._set_cors_headers()
        self.end_headers()

    def do_GET(self):
        status_data = {
            "status": "Cyber Kavach API Online",
            "gemini_ready": GEMINI_KEY is not None,
            "supabase_ready": supabase is not None
        }
        self._send_json(200, status_data)
    
    def do_POST(self):
        try:
            content_length = int(self.headers.get('Content-Length', 0))
            post_data = self.rfile.read(content_length)
            data = json.loads(post_data.decode('utf-8'))
            user_input = data.get('text', '').strip()
            
            if not user_input:
                self._send_error(400, "No text provided")
                return

            # 1. CALL GEMINI (Updated to 2.5 Flash for stability in 2026)
            # This name is a stable alias that prevents 404 errors
            model = genai.GenerativeModel('gemini-2.5-flash')
            
            prompt = f"Analyze this message for scams. Return ONLY JSON: {{\"riskScore\": 0-100, \"verdict\": \"SAFE/SUSPICIOUS/DANGEROUS\", \"explanation\": \"reason\"}}\n\nMessage: {user_input}"
            
            # The SDK will now correctly map to the v1 stable endpoint
            response = model.generate_content(prompt)
            result_text = response.text

            # --- CLEAN THE JSON RESPONSE ---
            if '{' in result_text and '}' in result_text:
                result_text = result_text[result_text.find('{'):result_text.rfind('}') + 1]
            
            result_json = json.loads(result_text)

            # 2. LOG TO SUPABASE
            if supabase:
                try:
                    supabase.table('scam_logs').insert({
                        "message_text": user_input,
                        "risk_score": int(result_json.get("riskScore", 50)),
                        "verdict": result_json.get("verdict", "UNKNOWN")
                    }).execute()
                except Exception as db_err:
                    print(f"Supabase Log Error: {db_err}")

            self._send_json(200, result_json)
            
        except Exception as e:
            traceback.print_exc()
            self._send_error(500, f"AI analysis failed: {str(e)}")

    def _send_json(self, status_code, data):
        self.send_response(status_code)
        self._set_cors_headers()
        self.send_header('Content-Type', 'application/json')
        self.end_headers()
        self.wfile.write(json.dumps(data).encode('utf-8'))

    def _send_error(self, status_code, message):
        self._send_json(status_code, {"error": message})
