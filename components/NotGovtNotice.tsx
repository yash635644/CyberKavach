import { Icon } from "./Icon";
import type { Locale } from "@/lib/site";

/** Clear independence notice — avoids any impression that Cyber Kavach is a government portal. */
export function NotGovtNotice({ lang, className = "" }: { lang: Locale; className?: string }) {
  return (
    <p
      role="note"
      className={`flex items-start gap-2.5 rounded-2xl border border-amber-500/30 bg-amber-500/[0.07] px-4 py-3 text-sm leading-relaxed text-amber-100 ${className}`}
    >
      <Icon name="info" className="mt-0.5 h-4 w-4 shrink-0 text-amber-300" />
      <span>
        {lang === "hi" ? (
          <>
            <strong className="text-amber-200">साइबर कवच सरकारी वेबसाइट नहीं है।</strong> यह एक स्वतंत्र जन-जागरूकता प्रोजेक्ट है। हम शिकायतें स्वीकार नहीं करते — सभी लिंक
            सीधे आधिकारिक सरकारी पोर्टल खोलते हैं। किसी को भी &quot;शिकायत/रिकवरी फ़ीस&quot; न दें।
          </>
        ) : (
          <>
            <strong className="text-amber-200">Cyber Kavach is not a government website.</strong> It is an independent public-awareness project. We do not accept
            complaints — every link opens the official government portal directly. Never pay anyone a &quot;complaint&quot; or &quot;recovery&quot; fee.
          </>
        )}
      </span>
    </p>
  );
}
