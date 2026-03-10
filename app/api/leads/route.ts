import { NextRequest, NextResponse } from "next/server";

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN!;
const CHAT_ID   = process.env.TELEGRAM_CHAT_ID!;

export async function POST(req: NextRequest) {
  try {
    const { name, phone, goal, source } = await req.json();

    if (!name || !phone) {
      return NextResponse.json({ error: "Ism va telefon majburiy" }, { status: 400 });
    }

    const label = goal
      ? { study_germany: "Germaniyada o'qish", work_germany: "Germaniyada ishlash", certificate: "Sertifikat olish", general: "Umumiy o'rganish" }[goal as string] ?? goal
      : source ?? "Noma'lum";

    const message = [
      "*Yangi ariza — GermanGo*",
      "",
      `👤 *Ism:* ${name}`,
      `📱 *Telefon:* ${phone}`,
      `📌 *Manba:* ${label}`,
      `🕐 *Vaqt:* ${new Date().toLocaleString("uz-UZ", { timeZone: "Asia/Tashkent" })}`,
    ].join("\n");

    const res = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: CHAT_ID, text: message, parse_mode: "Markdown" }),
    });

    if (!res.ok) {
      return NextResponse.json({ error: "Telegram xatosi" }, { status: 500 });
    }

  
  // Google Sheets ga yuborish
  try {
    await fetch("https://script.google.com/macros/s/AKfycbzQxT3YkNgJn_S_PTIyu9tf4F_Nn0g3FQ07Wsux4ziatydVSUsdrhXDzx1QLYMiolbeCg/exec", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        vaqt: new Date().toLocaleString("uz-UZ", { timeZone: "Asia/Tashkent" }),
        ism: name,
        telefon: phone.replace(/[^0-9+]/g, ""),
        manba: label || "",
        maqsad: (({ study_germany: "Germaniyada o'qish", work_germany: "Germaniyada ishlash", certificate: "Sertifikat olish", general: "Umumiy o'rganish" } as Record<string, string>)[goal as string]) || goal || ""
      })
    })
  } catch (e) {
    console.error("Sheets error:", e)
  }

  return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server xatosi" }, { status: 500 });
  }
}
