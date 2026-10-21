import type { Bilingual } from "../site";

export type QuizItem = { message: Bilingual; scam: boolean; explain: Bilingual };

export const quiz: QuizItem[] = [
  {
    scam: true,
    message: {
      en: "Dear customer, your SBI account will be blocked today. Update PAN immediately: http://sbi-pan-verify.top",
      hi: "प्रिय ग्राहक, आपका SBI खाता आज ब्लॉक होगा। तुरंत PAN अपडेट करें: http://sbi-pan-verify.top",
    },
    explain: {
      en: "Scam. Banks never send KYC/PAN links. The .top domain isn't SBI's, and the 'today' deadline is a pressure tactic.",
      hi: "स्कैम। बैंक KYC/PAN लिंक नहीं भेजते। .top डोमेन SBI का नहीं है और 'आज' की समय-सीमा दबाव की चाल है।",
    },
  },
  {
    scam: false,
    message: {
      en: "739104 is your OTP for login to Axis Mobile. Valid for 3 minutes. Do not share it with anyone. -Axis Bank",
      hi: "739104 is your OTP for login to Axis Mobile. Valid for 3 minutes. Do not share it with anyone. -Axis Bank",
    },
    explain: {
      en: "Safe — if you requested it. A normal OTP with a 'do not share' warning and no link. Only a problem if someone asks you to read it out.",
      hi: "सुरक्षित — अगर आपने ख़ुद मंगाया हो। सामान्य OTP, 'साझा न करें' चेतावनी के साथ और बिना लिंक। समस्या तभी जब कोई आपसे इसे पूछे।",
    },
  },
  {
    scam: true,
    message: {
      en: "I'm sending ₹5,000 for your OLX item. I've sent a request on GPay — just enter your UPI PIN to receive it.",
      hi: "आपके OLX सामान के लिए ₹5,000 भेज रहा हूं। GPay पर रिक्वेस्ट भेजी है — पैसे पाने के लिए बस UPI PIN डालें।",
    },
    explain: {
      en: "Scam. You never need a UPI PIN to receive money. Entering it sends money out of your account.",
      hi: "स्कैम। पैसे पाने के लिए UPI PIN की कभी ज़रूरत नहीं होती। PIN डालने से पैसा आपके खाते से जाता है।",
    },
  },
  {
    scam: true,
    message: {
      en: "This is Delhi Police Cyber Cell. Your Aadhaar is linked to a money laundering case. Stay on video call, you are under digital arrest.",
      hi: "यह दिल्ली पुलिस साइबर सेल है। आपका आधार मनी लॉन्ड्रिंग केस से जुड़ा है। वीडियो कॉल पर रहें, आप डिजिटल अरेस्ट में हैं।",
    },
    explain: {
      en: "Scam. There is no 'digital arrest' in Indian law. Police never arrest or question people over video calls.",
      hi: "स्कैम। भारतीय कानून में 'डिजिटल अरेस्ट' नहीं है। पुलिस वीडियो कॉल पर गिरफ़्तारी या पूछताछ नहीं करती।",
    },
  },
  {
    scam: false,
    message: {
      en: "Your Amazon order #408-1234567 has been shipped and will arrive by Thursday. Track it in the Amazon app.",
      hi: "आपका Amazon ऑर्डर #408-1234567 भेज दिया गया है और गुरुवार तक पहुंचेगा। Amazon ऐप में ट्रैक करें।",
    },
    explain: {
      en: "Likely safe — it asks for nothing and directs you to the official app. Still, verify inside the app rather than tapping links.",
      hi: "संभवतः सुरक्षित — कुछ नहीं मांगता और आधिकारिक ऐप पर भेजता है। फिर भी लिंक के बजाय ऐप में ही जांचें।",
    },
  },
  {
    scam: true,
    message: {
      en: "Part-time job! Like YouTube videos and earn ₹150 per like, ₹5000/day. Message HR on Telegram @easyearn_hr",
      hi: "पार्ट-टाइम जॉब! YouTube वीडियो लाइक करें और ₹150 प्रति लाइक, ₹5000/दिन कमाएं। Telegram @easyearn_hr पर HR को मैसेज करें।",
    },
    explain: {
      en: "Scam. Task scams pay a little first, then demand deposits for 'prepaid tasks' you can never withdraw.",
      hi: "स्कैम। टास्क स्कैम पहले थोड़े पैसे देते हैं, फिर 'प्रीपेड टास्क' के लिए पैसे जमा कराते हैं जो कभी नहीं निकलते।",
    },
  },
  {
    scam: true,
    message: {
      en: "Dear consumer, your electricity will be disconnected tonight at 9:30 PM as last bill not updated. Call officer 98XXXXXX21.",
      hi: "प्रिय उपभोक्ता, पिछला बिल अपडेट न होने से आज रात 9:30 बजे बिजली कट जाएगी। अधिकारी को कॉल करें 98XXXXXX21।",
    },
    explain: {
      en: "Scam. Electricity boards don't send threats from personal numbers. The 'officer' will make you install a remote-access app.",
      hi: "स्कैम। बिजली बोर्ड निजी नंबर से धमकी नहीं भेजते। 'अधिकारी' आपसे रिमोट-एक्सेस ऐप इंस्टॉल करवाएगा।",
    },
  },
  {
    scam: true,
    message: {
      en: "Congratulations! You won ₹25 lakh in KBC lucky draw. Pay ₹12,500 GST to release your prize. Contact on WhatsApp.",
      hi: "बधाई! आपने KBC लकी ड्रॉ में ₹25 लाख जीते। इनाम जारी करने के लिए ₹12,500 GST भरें। WhatsApp पर संपर्क करें।",
    },
    explain: {
      en: "Scam. You can't win a lottery you never entered, and real prizes never require advance tax payments.",
      hi: "स्कैम। जिस लॉटरी में भाग नहीं लिया वह जीत नहीं सकते, और असली इनाम के लिए पहले टैक्स नहीं भरना पड़ता।",
    },
  },
  {
    scam: false,
    message: {
      en: "Rs 2,499.00 debited from A/c XX4521 on 18-Oct for UPI/Swiggy. Not you? Call the number on the back of your debit card. -HDFC Bank",
      hi: "Rs 2,499.00 debited from A/c XX4521 on 18-Oct for UPI/Swiggy. Not you? Call the number on the back of your debit card. -HDFC Bank",
    },
    explain: {
      en: "Likely safe — a standard debit alert that tells you to use the number on your card, not a number in the SMS.",
      hi: "संभवतः सुरक्षित — सामान्य डेबिट अलर्ट जो SMS के नंबर के बजाय कार्ड के पीछे वाले नंबर पर कॉल करने को कहता है।",
    },
  },
  {
    scam: true,
    message: {
      en: "Join our VIP stock club 📈 SEBI-registered expert. Guaranteed 30% weekly returns + IPO allotment via our institutional app.",
      hi: "हमारे VIP स्टॉक क्लब से जुड़ें 📈 SEBI-रजिस्टर्ड एक्सपर्ट। हर हफ़्ते 30% पक्का रिटर्न + हमारे इंस्टीट्यूशनल ऐप से IPO अलॉटमेंट।",
    },
    explain: {
      en: "Scam. No legitimate adviser guarantees returns. 'Institutional apps' are fake trading platforms that block withdrawals.",
      hi: "स्कैम। कोई असली सलाहकार पक्का रिटर्न नहीं देता। 'इंस्टीट्यूशनल ऐप' नकली ट्रेडिंग प्लेटफ़ॉर्म हैं जो निकासी रोक देते हैं।",
    },
  },
];
