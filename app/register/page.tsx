/* eslint-disable react/no-unescaped-entities */
"use client";
import { useState } from "react";
import Link from "next/link";

export default function RegisterPage() {
  const [form, setForm] = useState({ name: "", phone: "", goal: "" });
  const [status, setStatus] = useState<"idle"|"loading"|"success"|"error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async () => {
    if (!form.name || !form.phone || !form.goal) {
      setErrorMsg("Barcha maydonlarni to'ldiring");
      return;
    }
    setStatus("loading");
    setErrorMsg("");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) { setErrorMsg(data.error || "Xato yuz berdi"); setStatus("error"); return; }
      setStatus("success");
    } catch { setErrorMsg("Internetga ulanishda xato"); setStatus("error"); }
  };

  if (status === "success") {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-6">🎉</div>
          <h1 className="text-3xl font-bold text-white mb-4">Arizangiz qabul qilindi!</h1>
          <p className="text-gray-400 mb-8">24 soat ichida siz bilan bog'lanamiz.</p>
          <Link href="/" className="inline-block bg-yellow-500 hover:bg-yellow-400 text-black font-semibold px-8 py-3 rounded-xl transition-colors">Bosh sahifaga qaytish</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-yellow-500 rounded-xl flex items-center justify-center">
              <span className="text-black font-bold text-lg">G</span>
            </div>
            <span className="text-white text-2xl font-bold">German<span className="text-yellow-500">Go</span></span>
          </div>
          <p className="text-gray-400 text-sm mt-2">Beta ro'yxatiga yoziling — bepul</p>
        </div>
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8">
          <h2 className="text-white text-xl font-semibold mb-6">Ariza qoldiring</h2>
          <div className="mb-4">
            <label className="block text-gray-400 text-sm mb-2">Ism Familiya <span className="text-yellow-500">*</span></label>
            <input type="text" placeholder="Abdullayev Jasur" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full bg-gray-800 border border-gray-700 text-white rounded-xl px-4 py-3 outline-none focus:border-yellow-500 transition-colors placeholder-gray-600" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-400 text-sm mb-2">Telefon raqam <span className="text-yellow-500">*</span></label>
            <div className="flex gap-2">
              <div className="bg-gray-800 border border-gray-700 text-gray-400 rounded-xl px-4 py-3 flex-shrink-0">+998</div>
              <input type="tel" placeholder="90 123 45 67" value={form.phone.replace("+998","")} onChange={(e) => setForm({ ...form, phone: "+998" + e.target.value.replace(/\D/g,"") })} className="flex-1 bg-gray-800 border border-gray-700 text-white rounded-xl px-4 py-3 outline-none focus:border-yellow-500 transition-colors placeholder-gray-600" />
            </div>
          </div>
          <div className="mb-6">
            <label className="block text-gray-400 text-sm mb-2">Maqsadingiz <span className="text-yellow-500">*</span></label>
            <div className="grid grid-cols-1 gap-2">
              {[
                { value: "study_germany", label: "🎓 Germaniyada o'qish" },
                { value: "work_germany", label: "💼 Germaniyada ishlash" },
                { value: "certificate", label: "📜 Nemis tili sertifikati olish" },
                { value: "general", label: "📚 Umumiy o'rganish / boshqa" },
              ].map((o) => (
                <button key={o.value} onClick={() => setForm({ ...form, goal: o.value })}
                  className={`py-3 px-4 rounded-xl border text-sm font-medium transition-all text-left ${form.goal===o.value ? "bg-yellow-500 border-yellow-500 text-black" : "bg-gray-800 border-gray-700 text-gray-300 hover:border-yellow-500/50"}`}>
                  {o.label}
                </button>
              ))}
            </div>
          </div>
          {errorMsg && <div className="mb-4 bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-xl px-4 py-3">{errorMsg}</div>}
          <button onClick={handleSubmit} disabled={status==="loading"} className="w-full bg-yellow-500 hover:bg-yellow-400 disabled:opacity-60 text-black font-bold py-4 rounded-xl transition-colors text-base">
            {status==="loading" ? "Yuborilmoqda..." : "Ariza qoldirish →"}
          </button>
          <p className="text-center text-gray-600 text-xs mt-4">Ma'lumotlaringiz faqat siz bilan bog'lanish uchun ishlatiladi</p>
        </div>
        <div className="text-center mt-6">
          <Link href="/" className="text-gray-600 hover:text-gray-400 text-sm transition-colors">← Bosh sahifaga qaytish</Link>
        </div>
      </div>
    </div>
  );
}
