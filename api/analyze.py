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
        print("✅ Supabase connected")
    except Exception as e:
        print(f"⚠️ Supabase initialization failed: {e}")
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
                self._send_error(500, "GEMINI_API_KEY not configured")
                return
            
            print(f"📝 Analyzing: {user_input[:50]}...")
            
            # Create prompt
            prompt = f"""Act as a Cyber Security Expert. Analyze this message: "{user_input}"

Identify if it is a scam (UPI fraud, Bank KYC scam, Phishing, Lottery scam, etc.).

Return ONLY valid JSON in this exact format (no markdown, no code blocks):
{{
    "riskScore": <number between 0-100>,
    "verdict": "<SAFE or SUSPICIOUS or DANGEROUS>",
    "explanation": "<Brief reason in 2-3 sentences>"
}}"""
            
            # Call Gemini AI with better error handling
            try:
                model = genai.GenerativeModel('gemini-1.5-flash')
                response = model.generate_content(prompt)
                print(f"🤖 AI Raw Response: {response.text[:100]}...")
            except Exception as api_error:
                print(f"❌ Gemini API Error: {api_error}")
                self._send_error(500, f"AI API Error: {str(api_error)}")
                return
            
            # Clean response
            result_text = response.text.strip()
            
            # Remove markdown code blocks if present
            if '```' in result_text:
                # Extract content between code blocks
                parts = result_text.split('```')
                if len(parts) >= 2:
                    result_text = parts[1]
                    # Remove 'json' language identifier if present
                    if result_text.startswith('json'):
                        result_text = result_text[4:].strip()
            
            # Remove any remaining backticks
            result_text = result_text.replace('```', '').strip()
            
            print(f"🧹 Cleaned Response: {result_text}")
            
            # Parse JSON with better error handling
            try:
                result_json = json.loads(result_text)
            except json.JSONDecodeError as parse_error:
                print(f"❌ JSON Parse Error: {parse_error}")
                print(f"📄 Failed to parse: {result_text}")
                # Return a fallback response
                result_json = {
                    "riskScore": 50,
                    "verdict": "ANALYSIS_ERROR",
                    "explanation": "Unable to parse AI response. The message could not be analyzed properly. Please try again."
                }
            
            # Validate fields
            required_fields = ['riskScore', 'verdict', 'explanation']
            if not all(field in result_json for field in required_fields):
                print(f"⚠️ Missing fields in response: {result_json}")
                result_json = {
                    "riskScore": result_json.get("riskScore", 50),
                    "verdict": result_json.get("verdict", "UNKNOWN"),
                    "explanation": result_json.get("explanation", "Analysis incomplete")
                }
            
            # Save to Supabase (optional)
            if supabase:
                try:
                    supabase.table('scam_logs').insert({
                        "message_text": user_input,
                        "risk_score": result_json["riskScore"],
                        "verdict": result_json["verdict"]
                    }).execute()
                    print("💾 Saved to Supabase")
                except Exception as db_error:
                    print(f"⚠️ Supabase error (non-critical): {db_error}")
            
            # Return success
            print(f"✅ Analysis complete: {result_json['verdict']}")
            self._send_json(200, result_json)
            
        except json.JSONDecodeError as e:
            print(f"❌ Request JSON Error: {e}")
            self._send_error(400, f"Invalid JSON in request: {str(e)}")
        except Exception as e:
            print(f"❌ Unexpected Error: {e}")
            import traceback
            traceback.print_exc()
            self._send_error(500, f"Analysis failed: {str(e)}")
    
    def do_GET(self):
        """Handle GET requests for testing"""
        status = {
            "status": "Cyber Kavach API is running",
            "endpoint": "/api/analyze",
            "method": "POST",
            "gemini_configured": GEMINI_KEY is not None,
            "supabase_configured": supabase is not None
        }
        self._send_json(200, status)
    
    def _send_json(self, status_code, data):
        self.send_response(status_code)
        self._set_cors_headers()
        self.send_header('Content-Type', 'application/json')
        self.end_headers()
        self.wfile.write(json.dumps(data).encode('utf-8'))
    
    def _send_error(self, status_code, message):
        self._send_json(status_code, {"error": message})
