import { ImageResponse } from "next/og"

export const runtime = "edge"
export const alt = "GermanGo — Nemis tili kurslari"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default async function Image() {
  return new ImageResponse(
    (
      <div style={{ background: "#0F1117", width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", fontFamily: "Arial" }}>
        <div style={{ background: "#F59E0B", borderRadius: 24, padding: "20px 40px", marginBottom: 32, display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ background: "#000", borderRadius: 12, width: 60, height: 60, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32, fontWeight: 900, color: "#F59E0B" }}>G</div>
          <span style={{ fontSize: 48, fontWeight: 900, color: "#000" }}>GermanGo</span>
        </div>
        <div style={{ fontSize: 40, fontWeight: 800, color: "#fff", textAlign: "center", marginBottom: 16 }}>Nemis tili kurslari</div>
        <div style={{ fontSize: 24, color: "#9CA3AF", textAlign: "center" }}>Onlayn o&apos;rganish · Goethe · telc · TestDaF</div>
        <div style={{ marginTop: 32, fontSize: 20, color: "#F59E0B" }}>germango.uz</div>
      </div>
    ),
    size
  )
}
