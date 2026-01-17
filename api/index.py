import os
import json
from flask import Flask, request, jsonify
from google import genai
from supabase import create_client, Client

app = Flask(__name__)

# 1. Initialize Clients using Vercel Environment Variables
# These keys are NEVER visible in your GitHub code.
GEMINI_KEY = os.environ.get("GEMINI_API_KEY")
SUPABASE_URL = os.environ.get("SUPABASE_URL")
SUPABASE_KEY = os.environ.get("SUPABASE_ANON_KEY")

# Initialize the AI and Database clients
gemini_client = genai.Client(api_key=GEMINI_KEY)
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

@app.route('/api/analyze', methods=['POST'])
def analyze():
    try:
        # Handle incoming data from index.html
        data = request.get_json(silent=True)
        if not data or "text" not in data:
            return jsonify({"error": "No text content provided"}), 400

        user_input = data.get("text")

        # 2. Construct the Security Audit Prompt
        prompt = f"""
        Act as a Cyber Security Expert. Analyze this message: "{user_input}"
        Identify if it is a scam (UPI, Bank KYC, Phishing).
        Return ONLY a JSON:
        {{
            "riskScore": (number 0-100),
            "verdict": "SAFE" or "SUSPICIOUS" or "DANGEROUS",
            "explanation": "Brief reason in Hindi/English"
        }}
        """
        
        # 3. Call Gemini AI
        response = gemini_client.models.generate_content(
            model="gemini-2.0-flash", 
            contents=prompt
        )
        
        # Clean AI response to ensure valid JSON output
        result_text = response.text.replace('```json', '').replace('```', '').strip()
        result_json = json.loads(result_text)

        # 4. Save scan to Supabase logs
        supabase.table('scam_logs').insert({
            "message_text": user_input,
            "risk_score": result_json["riskScore"],
            "verdict": result_json["verdict"]
        }).execute()

        # Send final result back to index.html frontend
        return jsonify(result_json)
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500
