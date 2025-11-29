import React, { useState } from "react";
import { messaging } from "../firebase/config";
import { getToken } from "firebase/messaging";
import { useLanguage } from "../contexts/LanguageContext";

export default function NotificationsButton() {
  const { language } = useLanguage();
  const [response, setResponse] = useState("");

  async function enableNotifications() {
    try {
      const permission = await Notification.requestPermission();

      if (permission !== "granted") {
        setResponse(
          language === "hi"
            ? "❌ नोटिफिकेशन अनुमति अस्वीकृत"
            : "❌ Notification permission denied"
        );
        return;
      }

      // VAPID Key FROM YOUR FIREBASE PANEL
      const token = await getToken(messaging, {
        vapidKey:
          "BHNWZ2DsR_P3wHBe4P6evaKKMTbIljDjwmImRpT37prfIwuagqEiPjhz5MWzAwxFcd2tkDic4Nt2eSiVVseVakI",
      });

      console.log("FCM TOKEN → ", token);

      setResponse(
        language === "hi"
          ? "🔔 नोटिफिकेशन चालू — कंसोल में टोकन देखें"
          : "🔔 Notifications enabled — Check console for token"
      );

      // Later we will save token into Firestore users collection
    } catch (err) {
      console.error(err);
      setResponse(
        language === "hi"
          ? "⚠ त्रुटि — नोटिफिकेशन चालू नहीं"
          : "⚠ Error enabling notifications"
      );
    }
  }

  return (
    <div className="flex flex-col items-end">
      <button
        onClick={enableNotifications}
        className="px-4 py-2 rounded bg-emerald-500 text-black font-semibold hover:bg-emerald-600 transition"
      >
        {language === "hi"
          ? "🔔 नोटिफिकेशन चालू करें"
          : "🔔 Enable Notifications"}
      </button>

      {response && (
        <p className="text-xs text-gray-300 mt-1 text-right">{response}</p>
      )}
    </div>
  );
}
