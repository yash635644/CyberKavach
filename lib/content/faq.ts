import type { Bilingual } from "../site";

export const homeFaq: Bilingual<{ q: string; a: string }[]> = {
  en: [
    {
      q: "How can I check if a message is a scam?",
      a: "Paste the SMS, WhatsApp message, email or link into the Cyber Kavach scanner. It checks the text against known Indian scam patterns and an AI model, then shows a risk score, red flags and next steps. Never click links or share OTPs while you check.",
    },
    {
      q: "Is Cyber Kavach really free?",
      a: "Yes. Cyber Kavach is free to use with no sign-up, no ads and no paid plan. It runs on free infrastructure and the scanner falls back to an offline pattern engine if the AI is busy, so it always works.",
    },
    {
      q: "Does Cyber Kavach store the messages I scan?",
      a: "No. Messages, links and screenshots are processed only to produce your result and are not saved in any database by Cyber Kavach. Avoid pasting OTPs, PINs or passwords.",
    },
    {
      q: "What is the cyber crime helpline number in India?",
      a: "Dial 1930, the National Cyber Crime Helpline, to report online financial fraud. You can also file a complaint at cybercrime.gov.in. For immediate danger, call 112.",
    },
    {
      q: "What should I do immediately after losing money to an online scam?",
      a: "Call 1930 within the first hour, inform your bank to block cards and UPI, file a complaint on cybercrime.gov.in with transaction IDs and screenshots, and do not pay anyone who promises to 'recover' your money.",
    },
    {
      q: "Can I check a screenshot of a WhatsApp chat?",
      a: "Yes. Choose the Screenshot tab and upload or paste an image. It is resized on your device and analysed by AI to read the text and spot scam signs.",
    },
  ],
  hi: [
    {
      q: "कैसे जांचें कि कोई मैसेज स्कैम है?",
      a: "SMS, WhatsApp मैसेज, ईमेल या लिंक को साइबर कवच स्कैनर में पेस्ट करें। यह ज्ञात भारतीय स्कैम पैटर्न और AI मॉडल से जांच करके जोखिम स्कोर, ख़तरे के संकेत और अगले कदम दिखाता है। जांच के दौरान लिंक पर क्लिक न करें और OTP साझा न करें।",
    },
    {
      q: "क्या साइबर कवच सच में मुफ़्त है?",
      a: "हां। साइबर कवच बिना साइन-अप, बिना विज्ञापन और बिना किसी पेड प्लान के मुफ़्त है। AI व्यस्त होने पर स्कैनर ऑफ़लाइन पैटर्न इंजन से काम करता है, इसलिए यह हमेशा चलता है।",
    },
    {
      q: "क्या साइबर कवच मेरे मैसेज सेव करता है?",
      a: "नहीं। मैसेज, लिंक और स्क्रीनशॉट सिर्फ़ आपका नतीजा बनाने के लिए प्रोसेस होते हैं और साइबर कवच किसी डेटाबेस में सेव नहीं करता। OTP, PIN या पासवर्ड पेस्ट न करें।",
    },
    {
      q: "भारत में साइबर क्राइम हेल्पलाइन नंबर क्या है?",
      a: "ऑनलाइन वित्तीय धोखाधड़ी की शिकायत के लिए राष्ट्रीय साइबर अपराध हेल्पलाइन 1930 डायल करें। cybercrime.gov.in पर भी शिकायत कर सकते हैं। तत्काल ख़तरे में 112 पर कॉल करें।",
    },
    {
      q: "ऑनलाइन ठगी में पैसे जाने के तुरंत बाद क्या करें?",
      a: "पहले घंटे में 1930 पर कॉल करें, बैंक को कार्ड और UPI ब्लॉक करने को कहें, ट्रांज़ैक्शन ID और स्क्रीनशॉट के साथ cybercrime.gov.in पर शिकायत करें, और पैसा 'वापस दिलाने' का वादा करने वाले किसी को भुगतान न करें।",
    },
    {
      q: "क्या मैं WhatsApp चैट का स्क्रीनशॉट जांच सकता हूं?",
      a: "हां। स्क्रीनशॉट टैब चुनें और इमेज अपलोड या पेस्ट करें। यह आपके डिवाइस पर छोटा किया जाता है और AI टेक्स्ट पढ़कर स्कैम के संकेत खोजता है।",
    },
  ],
};
