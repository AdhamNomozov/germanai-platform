/* eslint-disable react/no-unescaped-entities */
"use client";
import { useState } from "react";

export default function RegisterPage() {
  const [form, setForm] = useState({ name: "", phone: "", goal: "" });
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit() {
    if (!form.name || !form.phone || !form.goal) {
      setError("Barcha maydonlarni to'ldiring");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: form.name, phone: form.phone, goal: form.goal, source: "register-page" }),
      });
      if (res.ok) setDone(true);
      else setError("Xatolik yuz berdi, qayta urinib ko'ring");
    } catch {
      setError("Xatolik yuz berdi");
    } finally {
      setLoading(false);
    }
  }

  if (done) return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
      <div className="text-center max-w-sm w-full">
        <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">✓</div>
        <h2 className="text-white text-2xl font-bold mb-2">Arizangiz qabul qilindi!</h2>
        <p className="text-gray-400 mb-6">24 soat ichida siz bilan bog'lanamiz</p>
        <a href="/" className="text-yellow-500 text-sm">← Bosh sahifaga qaytish</a>
      </div>
    </div>
  );

  const goals = [
    { value: "study_germany", label: "🎓 Germaniyada o'qish" },
    { value: "work_germany",  label: "💼 Germaniyada ishlash" },
    { value: "certificate",   label: "📋 Nemis tili sertifikati olish" },
    { value: "general",       label: "📚 Umumiy o'rganish / boshqa" },
  ];

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center px-4 py-8">
      {/* Logo */}
      <a href="/" className="flex items-center gap-2 mb-6">
        <div className="w-10 h-10 bg-yellow-500 rounded-xl flex items-center justify-center">
          <span className="text-black font-black text-lg">G</span>
        </div>
        <span className="text-white font-bold text-xl">German<span className="text-yellow-500">Go</span></span>
      </a>

      <div className="w-full max-w-sm bg-gray-900 rounded-2xl p-6 shadow-xl">
        <h1 className="text-white text-xl font-bold mb-1">Ariza qoldiring</h1>
        <p className="text-gray-400 text-sm mb-6">Ro'yxatga yoziling — bepul</p>

        {/* Ism */}
        <div className="mb-4">
          <label className="text-gray-300 text-sm mb-1.5 block">Ism Familiya <span className="text-yellow-500">*</span></label>
          <input
            type="text"
            placeholder="Abdullayev Jasur"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full bg-gray-800 border border-gray-700 text-white rounded-xl px-4 py-3 text-sm outline-none focus:border-yellow-500 transition-colors placeholder-gray-600"
          />
        </div>

        {/* Telefon */}
        <div className="mb-4">
          <label className="text-gray-300 text-sm mb-1.5 block">Telefon raqam <span className="text-yellow-500">*</span></label>
          <div className="flex gap-2">
            <div className="bg-gray-800 border border-gray-700 text-gray-300 rounded-xl px-3 py-3 text-sm font-medium whitespace-nowrap flex-shrink-0">
              +998
            </div>
            <input
              type="tel"
              inputMode="numeric"
              placeholder="90 123 45 67"
              value={form.phone.replace("+998", "")}
              onChange={(e) => setForm({ ...form, phone: "+998" + e.target.value.replace(/\D/g, "") })}
              className="flex-1 min-w-0 bg-gray-800 border border-gray-700 text-white rounded-xl px-3 py-3 text-sm outline-none focus:border-yellow-500 transition-colors placeholder-gray-600"
            />
          </div>
        </div>

        {/* Maqsad */}
        <div className="mb-6">
          <label className="text-gray-300 text-sm mb-1.5 block">Maqsadingiz <span className="text-yellow-500">*</span></label>
          <div className="flex flex-col gap-2">
            {goals.map((g) => (
              <button
                key={g.value}
                onClick={() => setForm({ ...form, goal: g.value })}
                className={`w-full text-left px-4 py-3 rounded-xl text-sm border transition-colors ${
                  form.goal === g.value
                    ? "bg-yellow-500/10 border-yellow-500 text-yellow-400"
                    : "bg-gray-800 border-gray-700 text-gray-300 hover:border-gray-500"
                }`}
              >
                {g.label}
              </button>
            ))}
          </div>
        </div>

        {error && <p className="text-red-400 text-sm mb-4">{error}</p>}

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-3.5 rounded-xl text-sm transition-colors disabled:opacity-60"
        >
          {loading ? "Yuborilmoqda..." : "Ariza qoldirish →"}
        </button>

        <p className="text-gray-600 text-xs text-center mt-3">
          Ma'lumotlaringiz faqat siz bilan bog'lanish uchun ishlatiladi
        </p>
      </div>

      <a href="/" className="text-gray-600 text-sm mt-4 hover:text-gray-400 transition-colors">
        ← Bosh sahifaga qaytish
      </a>
    </div>
  );
}
