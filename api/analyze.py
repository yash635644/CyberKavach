import os
import json
import traceback
from http.server import BaseHTTPRequestHandler

try:
    import google.generativeai as genai
    GENAI_AVAILABLE = True
except Exception as import_error:
    print(f"IMPORT ERROR: {import_error}")
    genai = None
    GENAI_AVAILABLE = False

GEMINI_KEY = os.environ.get("GEMINI_API_KEY")

if GEMINI_KEY and GENAI_AVAILABLE:
    try:
        genai.configure(api_key=GEMINI_KEY)
        print("Gemini configured successfully")
    except Exception as config_error:
        print(f"CONFIG ERROR: {config_error}")

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
        print("\n=== ANALYSIS REQUEST ===")
        try:
            # Read request
            content_length = int(self.headers.get('Content-Length', 0))
            post_data = self.rfile.read(content_length)
            data = json.loads(post_data.decode('utf-8'))
            
            user_input = data.get('text', '').strip()
            print(f"Input: {user_input[:100]}")
            
            if not user_input:
                print("ERROR: No text provided")
                self._send_error(400, "No text provided")
                return
            
            if not GEMINI_KEY:
                print("ERROR: GEMINI_API_KEY not set")
                self._send_error(500, "GEMINI_API_KEY not configured")
                return
            
            if not GENAI_AVAILABLE:
                print("ERROR: genai module not available")
                self._send_error(500, "AI module not available")
                return
            
            # Create prompt
            prompt = f"""You are a cybersecurity expert. Analyze this message for scams:

"{user_input}"

Respond with ONLY this JSON (no markdown, no explanation):
{{"riskScore": 0-100, "verdict": "SAFE/SUSPICIOUS/DANGEROUS", "explanation": "brief explanation"}}"""
            
            print("Calling Gemini API...")
            
            # Call Gemini with error handling
            try:
                model = genai.GenerativeModel('gemini-1.5-flash')
                response = model.generate_content(
                    prompt,
                    generation_config=genai.types.GenerationConfig(
                        temperature=0.3,
                    )
                )
                
                if not response or not response.text:
                    raise Exception("Empty response from Gemini")
                
                print(f"Gemini response: {response.text[:200]}")
                
            except Exception as api_error:
                error_str = str(api_error)
                print(f"GEMINI API ERROR: {error_str}")
                traceback.print_exc()
                
                if "API_KEY_INVALID" in error_str or "invalid api key" in error_str.lower():
                    self._send_error(500, "Invalid Gemini API key")
                elif "quota" in error_str.lower() or "rate" in error_str.lower():
                    self._send_error(429, "API quota exceeded. Try again later")
                elif "permission" in error_str.lower():
                    self._send_error(500, "Gemini API not enabled")
                else:
                    self._send_error(500, f"AI service error: {error_str}")
                return
            
            # Clean response
            result_text = response.text.strip()
            
            # Remove markdown code blocks
            if '```' in result_text:
                parts = result_text.split('```')
                for part in parts:
                    part = part.strip()
                    if part.startswith('json'):
                        result_text = part[4:].strip()
                        break
                    elif part and not part.startswith('json') and '{' in part:
                        result_text = part.strip()
                        break
            
            result_text = result_text.replace('```', '').strip()
            
            # Find JSON in response if embedded in text
            if '{' in result_text and '}' in result_text:
                start = result_text.find('{')
                end = result_text.rfind('}') + 1
                result_text = result_text[start:end]
            
            print(f"Cleaned response: {result_text}")
            
            # Parse JSON
            try:
                result_json = json.loads(result_text)
            except json.JSONDecodeError as parse_error:
                print(f"JSON PARSE ERROR: {parse_error}")
                print(f"Failed to parse: {result_text}")
                
                # Fallback response
                result_json = {
                    "riskScore": 50,
                    "verdict": "ANALYSIS_ERROR",
                    "explanation": "Unable to analyze. Please try again."
                }
            
            # Validate and normalize fields
            if "riskScore" not in result_json:
                result_json["riskScore"] = 50
            if "verdict" not in result_json:
                result_json["verdict"] = "UNKNOWN"
            if "explanation" not in result_json:
                result_json["explanation"] = "Analysis incomplete"
            
            # Ensure riskScore is a number
            try:
                result_json["riskScore"] = int(result_json["riskScore"])
            except:
                result_json["riskScore"] = 50
            
            print(f"Final result: {result_json}")
            
            # Success
            self._send_json(200, result_json)
            
        except json.JSONDecodeError as e:
            print(f"REQUEST JSON ERROR: {e}")
            traceback.print_exc()
            self._send_error(400, "Invalid request format")
        except Exception as e:
            print(f"UNEXPECTED ERROR: {e}")
            traceback.print_exc()
            self._send_error(500, f"Server error: {str(e)}")
    
    def do_GET(self):
        self._send_json(200, {
            "status": "API running",
            "gemini_configured": GEMINI_KEY is not None and GENAI_AVAILABLE
        })
    
    def _send_json(self, status_code, data):
        self.send_response(status_code)
        self._set_cors_headers()
        self.send_header('Content-Type', 'application/json')
        self.end_headers()
        self.wfile.write(json.dumps(data).encode('utf-8'))
    
    def _send_error(self, status_code, message):
        print(f"Sending error: {status_code} - {message}")
        self._send_json(status_code, {"error": message})
