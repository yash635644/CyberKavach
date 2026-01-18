import os
import json
from http.server import BaseHTTPRequestHandler
import google.generativeai as genai

# Initialize Clients
GEMINI_KEY = os.environ.get("GEMINI_API_KEY")
SUPABASE_URL = os.environ.get("SUPABASE_URL")
SUPABASE_KEY = os.environ.get("SUPABASE_KEY")

print(f"🔑 GEMINI_KEY present: {GEMINI_KEY is not None}")
print(f"🗄️ SUPABASE_URL present: {SUPABASE_URL is not None}")
print(f"🗄️ SUPABASE_KEY present: {SUPABASE_KEY is not None}")

# Configure Gemini
if GEMINI_KEY:
    try:
        genai.configure(api_key=GEMINI_KEY)
        print("✅ Gemini configured successfully")
    except Exception as e:
        print(f"❌ Gemini configuration failed: {e}")
else:
    print("⚠️ No GEMINI_API_KEY found")

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
else:
    print("⚠️ Supabase credentials not found (optional)")

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
        print("\n=== NEW REQUEST ===")
        try:
            # Read request data
            print("📥 Reading request...")
            content_length = int(self.headers.get('Content-Length', 0))
            post_data = self.rfile.read(content_length)
            data = json.loads(post_data.decode('utf-8'))
            
            user_input = data.get('text', '').strip()
            print(f"📝 Input text: {user_input[:50]}...")
            
            if not user_input:
                print("❌ No text provided")
                self._send_error(400, "No text content provided")
                return
            
            # Check if API key exists
            if not GEMINI_KEY:
                print("❌ GEMINI_API_KEY not configured")
                self._send_error(500, "GEMINI_API_KEY not configured")
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
            
            print("🤖 Calling Gemini API...")
            
            # Call Gemini AI
            try:
                model = genai.GenerativeModel('gemini-1.5-flash')
                response = model.generate_content(prompt)
                print(f"✅ Got response from Gemini")
                print(f"📄 Raw response: {response.text[:200]}...")
            except Exception as api_error:
                print(f"❌ Gemini API call failed: {api_error}")
                import traceback
                traceback.print_exc()
                self._send_error(500, f"AI API Error: {str(api_error)}")
                return
            
            # Clean response
            result_text = response.text.strip()
            print(f"🧹 Cleaning response...")
            
            # Remove markdown if present
            if '```' in result_text:
                print("📦 Removing markdown code blocks...")
                parts = result_text.split('```')
                if len(parts) >= 2:
                    result_text = parts[1]
                    if result_text.startswith('json'):
                        result_text = result_text[4:].strip()
            
            result_text = result_text.replace('```', '').strip()
            print(f"✨ Cleaned response: {result_text[:200]}...")
            
            # Parse JSON
            print("🔍 Parsing JSON...")
            try:
                result_json = json.loads(result_text)
                print(f"✅ JSON parsed successfully")
            except json.JSONDecodeError as parse_error:
                print(f"❌ JSON parse failed: {parse_error}")
                print(f"📄 Failed text: {result_text}")
                self._send_error(500, f"Failed to parse AI response: {str(parse_error)}")
                return
            
            # Validate fields
            required_fields = ['riskScore', 'verdict', 'explanation']
            if not all(field in result_json for field in required_fields):
                print(f"⚠️ Missing required fields. Got: {list(result_json.keys())}")
                raise ValueError("AI response missing required fields")
            
            print(f"✅ Validation passed: {result_json['verdict']}")
            
            # Save to Supabase (optional)
            if supabase:
                try:
                    print("💾 Saving to Supabase...")
                    supabase.table('scam_logs').insert({
                        "message_text": user_input,
                        "risk_score": result_json["riskScore"],
                        "verdict": result_json["verdict"]
                    }).execute()
                    print("✅ Saved to Supabase")
                except Exception as db_error:
                    print(f"⚠️ Supabase error (non-critical): {db_error}")
            
            # Return success
            print("🎉 Sending success response")
            self._send_json(200, result_json)
            
        except json.JSONDecodeError as e:
            print(f"❌ Request JSON error: {e}")
            import traceback
            traceback.print_exc()
            self._send_error(400, f"Invalid JSON in request: {str(e)}")
        except Exception as e:
            print(f"❌ Unexpected error: {e}")
            import traceback
            traceback.print_exc()
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
        print(f"⚠️ Sending error: {status_code} - {message}")
        self._send_json(status_code, {"error": message})
```

## Step 3: Test Again

1. Save the updated file
2. Run your local server again
3. Try the analysis from your webpage
4. **Copy ALL the output** from your terminal and share it with me

You should see detailed logs like:
```
🔑 GEMINI_KEY present: True
🗄️ SUPABASE_URL present: True
🗄️ SUPABASE_KEY present: True
✅ Gemini configured successfully
✅ Supabase connected

=== NEW REQUEST ===
📥 Reading request...
📝 Input text: Congratulations! You won...
🤖 Calling Gemini API...
✅ Got response from Gemini
📄 Raw response: ```json...
