import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Aides Connect — Moins de temps perdu à chercher. Plus de clarté pour agir.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #1e3a8a 0%, #1e40af 45%, #3730a3 75%, #312e81 100%)",
          fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Cercles décoratifs */}
        <div
          style={{
            position: "absolute",
            top: "-80px",
            left: "-80px",
            width: "360px",
            height: "360px",
            borderRadius: "50%",
            background: "rgba(255,255,255,0.04)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-100px",
            right: "-60px",
            width: "420px",
            height: "420px",
            borderRadius: "50%",
            background: "rgba(255,255,255,0.04)",
          }}
        />

        {/* Logo */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "18px",
            marginBottom: "40px",
          }}
        >
          <div
            style={{
              width: "72px",
              height: "72px",
              borderRadius: "18px",
              background: "rgba(255,255,255,0.15)",
              border: "2px solid rgba(255,255,255,0.3)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "36px",
              fontWeight: "900",
              color: "white",
            }}
          >
            A
          </div>
          <span
            style={{
              fontSize: "48px",
              fontWeight: "800",
              color: "white",
              letterSpacing: "-1px",
            }}
          >
            Aides
            <span style={{ color: "#93c5fd" }}>Connect</span>
          </span>
        </div>

        {/* Titre principal */}
        <div
          style={{
            fontSize: "42px",
            fontWeight: "800",
            color: "white",
            textAlign: "center",
            lineHeight: "1.2",
            maxWidth: "860px",
            marginBottom: "24px",
            letterSpacing: "-0.5px",
          }}
        >
          Trouvez les aides adaptées à votre situation
        </div>

        {/* Baseline */}
        <div
          style={{
            fontSize: "22px",
            color: "rgba(147,197,253,0.9)",
            textAlign: "center",
            marginBottom: "48px",
            letterSpacing: "0.2px",
          }}
        >
          Moins de temps perdu à chercher. Plus de clarté pour agir.
        </div>

        {/* Badges */}
        <div style={{ display: "flex", gap: "16px" }}>
          {["Gratuit", "Sans inscription", "Sources officielles"].map((label) => (
            <div
              key={label}
              style={{
                padding: "10px 22px",
                borderRadius: "100px",
                background: "rgba(255,255,255,0.12)",
                border: "1px solid rgba(255,255,255,0.2)",
                color: "rgba(255,255,255,0.85)",
                fontSize: "16px",
                fontWeight: "600",
              }}
            >
              {label}
            </div>
          ))}
        </div>

        {/* URL */}
        <div
          style={{
            position: "absolute",
            bottom: "28px",
            color: "rgba(255,255,255,0.35)",
            fontSize: "15px",
            letterSpacing: "0.5px",
          }}
        >
          aides-connect.fr
        </div>
      </div>
    ),
    { ...size }
  );
}
