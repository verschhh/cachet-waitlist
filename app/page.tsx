"use client";

import React, { useState } from "react";

const API_URL = "/api/waitlist";

type Status = "idle" | "loading" | "success" | "error";

export default function HomePage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  // mouse-follow gradient
  const [cursorPos, setCursorPos] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setCursorPos({ x, y });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    try {
      setStatus("loading");

      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) throw new Error("Request failed");

      setStatus("success");
      setEmail("");
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  return (
    <div
      className="page"
      onMouseMove={handleMouseMove}
      style={
        {
          "--cursor-x": `${cursorPos.x}%`,
          "--cursor-y": `${cursorPos.y}%`,
        } as React.CSSProperties
      }
    >
      <section className="hero">
        <div className="card">
          <h1 className="title">Cachet Waitlist</h1>
          <p className="subtitle">
            Join the waitlist to be the first to access Cachet.
          </p>

          <form onSubmit={handleSubmit} className="form">
            <input
              type="email"
              placeholder="Enter your email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input input-blue-placeholder"
            />
            <button
              type="submit"
              className="button"
              disabled={status === "loading"}
            >
              {status === "loading" ? "Submitting…" : "Join the waitlist"}
            </button>
          </form>

          {status === "success" && (
            <p className="msg success">You&apos;re on the list 🎉</p>
          )}
          {status === "error" && (
            <p className="msg error">Something went wrong. Please try again.</p>
          )}

          <div className="scroll-indicator">
            <span>Scroll to learn more</span>
            <span className="scroll-arrow">↓</span>
          </div>
        </div>
      </section>

      <section className="info-section">
        <div className="info-layout">
          <div className="info-copy">
            <p className="eyebrow">What is Cachet?</p>
            <h2>
              We&apos;re building the first map dedicated to Paris&apos;{" "}
              <span className="accent">independent fashion scene.</span>
            </h2>
            <p className="info-text">
              Discover boutiques, studios and pop-ups you won&apos;t find on
              mainstream maps. Cachet curates the most exciting independent
              fashion places in Paris and puts them in your pocket.
            </p>
            <ul className="info-list">
              <li>Curated independent boutiques and designers</li>
              <li>Always-on map for pop-ups and limited drops</li>
              <li>Neighbourhood guides to explore the city with style</li>
            </ul>
          </div>

          <div className="info-phone-wrapper">
            <img
              src="/assets/mobile-bg.png"
              alt="Cachet app showing a map of Paris' fashion spots"
              className="info-phone"
            />
          </div>
        </div>
      </section>

      <section className="why-section">
        <h2 className="why-title">Why stores love Cachet</h2>

        <div className="why-grid">
          <div className="why-item">
            <div className="why-icon">
              {/* Discoverability Icon */}
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#f4f4f8"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="7" />
                <line x1="16.65" y1="16.65" x2="21" y2="21" />
              </svg>
            </div>
            <h3>More discoverability</h3>
            <p>
              Independent fashion spots finally get visibility in a place
              designed for them — not lost in generic maps.
            </p>
          </div>

          <div className="why-item">
            <div className="why-icon">
              {/* Location pin Icon */}
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#f4f4f8"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 21s7-6.18 7-11.5a7 7 0 1 0-14 0C5 14.82 12 21 12 21z" />
                <circle cx="12" cy="9.5" r="2.5" />
              </svg>
            </div>
            <h3>Real local audiences</h3>
            <p>
              Cachet brings you people who actively search for emerging
              designers and curated boutiques.
            </p>
          </div>

          <div className="why-item">
            <div className="why-icon">
              {/* Lightning bolt Icon */}
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#f4f4f8"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M13 3L4 14h7l-1 7 9-11h-7l1-7z" />
              </svg>
            </div>
            <h3>Effortless presence</h3>
            <p>
              No dashboard, no setup — we onboard stores manually to ensure
              accuracy and quality.
            </p>
          </div>

          <div className="why-item">
            <div className="why-icon">
              {/* Target Icon */}
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#f4f4f8"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="8" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="12" cy="12" r="1" fill="#f4f4f8" stroke="none" />
              </svg>
            </div>
            <h3>Better customers</h3>
            <p>
              People using Cachet want to discover, explore and buy — not just
              scroll.
            </p>
          </div>
        </div>
      </section>

      <style jsx>{`
        :global(body) {
          margin: 0;
          font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
            sans-serif;
          background-color: #050528;
        }

        .page {
          min-height: 100vh;
          background: radial-gradient(
              circle at var(--cursor-x, 50%) var(--cursor-y, 50%),
              rgba(12, 12, 79, 0.32),
              transparent 60%
            ),
            #050528;
          color: #fff;
        }

        @media (prefers-reduced-motion: reduce) {
          .page {
            background: #050528;
          }
        }

        /* HERO */

        .hero {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
        }

        .card {
          max-width: 420px;
          width: 100%;
          background: #ffffff;
          border-radius: 16px;
          padding: 32px 28px 24px;
          text-align: center;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          position: relative;
          z-index: 1;
          color: #0c0c4f;
        }

        .title {
          font-size: 28px;
          font-weight: 800;
          margin-bottom: 8px;
        }

        .subtitle {
          font-size: 15px;
          color: #555;
          margin-bottom: 24px;
        }

        .form {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .input {
          padding: 12px 14px;
          border-radius: 10px;
          border: 1px solid #ddd;
          font-size: 14px;
          outline: none;
        }

        .input-blue-placeholder::placeholder {
          color: #0c0c4f;
          opacity: 1;
          text-align: center;
        }

        .input:focus {
          border-color: #0c0c4f;
          box-shadow: 0 0 0 2px rgba(12, 12, 79, 0.09);
          color: #0c0c4f;
          text-align: center;
        }

        .button {
          padding: 12px 14px;
          border-radius: 10px;
          border: none;
          background-color: #0c0c4f;
          color: #ffffff;
          font-weight: 600;
          font-size: 15px;
          cursor: pointer;
          transition: transform 0.05s ease, box-shadow 0.1s ease,
            opacity 0.2s ease;
        }

        .button:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 8px 20px rgba(12, 12, 79, 0.2);
        }

        .button:disabled {
          opacity: 0.7;
          cursor: default;
        }

        .msg {
          margin-top: 16px;
          font-size: 14px;
        }

        .success {
          color: #15803d;
        }

        .error {
          color: #b91c1c;
        }

        .scroll-indicator {
          margin-top: 20px;
          font-size: 12px;
          color: #888;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
        }

        .scroll-arrow {
          animation: bounce 1.4s infinite;
        }

        @keyframes bounce {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(4px);
          }
        }

        /* SECTION 2 */

        .info-section {
          padding: 72px 24px 96px;
          background: #0c0c4f;
        }

        .info-layout {
          max-width: 1040px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.9fr);
          gap: 48px;
          align-items: center;
        }

        .info-copy {
          color: #f4f4f8;
        }

        .eyebrow {
          text-transform: uppercase;
          letter-spacing: 0.18em;
          font-size: 11px;
          margin-bottom: 12px;
          opacity: 0.8;
        }

        .info-copy h2 {
          font-size: 28px;
          line-height: 1.4;
          margin: 0 0 16px;
        }

        .accent {
          color: #f9d26f;
        }

        .info-text {
          margin: 0 0 16px;
          font-size: 15px;
          line-height: 1.6;
          opacity: 0.9;
        }

        .info-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: grid;
          gap: 8px;
          font-size: 14px;
          opacity: 0.95;
        }

        .info-list li::before {
          content: "•";
          margin-right: 8px;
          color: #f9d26f;
        }

        .info-phone-wrapper {
          display: flex;
          justify-content: center;
        }

        .info-phone {
          width: 100%;
          max-width: 320px;
          border-radius: 32px;
          box-shadow: 0 18px 45px rgba(0, 0, 0, 0.6);
          display: block;
        }

        @media (max-width: 800px) {
          .info-layout {
            grid-template-columns: 1fr;
            text-align: center;
          }

          .info-copy {
            order: 1;
          }

          .info-phone-wrapper {
            order: 0;
          }

          .info-list {
            text-align: left;
            margin: 0 auto;
            max-width: 320px;
          }
        }
        .why-section {
          background: #050528;
          padding: 96px 24px;
          color: #fff;
          text-align: center;
        }

        .why-title {
          font-size: 32px;
          font-weight: 700;
          margin-bottom: 48px;
        }

        .why-grid {
          max-width: 1100px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 48px;
        }

        .why-item {
          background: rgba(255, 255, 255, 0.04);
          padding: 32px 24px;
          border-radius: 16px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(4px);
        }

        .why-icon {
          height: 42px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 16px;
          opacity: 0.9;
        }

        .why-item h3 {
          font-size: 18px;
          margin: 0 0 12px;
          font-weight: 600;
        }

        .why-item p {
          font-size: 14px;
          line-height: 1.6;
          opacity: 0.9;
        }

        @media (max-width: 900px) {
          .why-grid {
            grid-template-columns: 1fr 1fr;
          }
        }

        @media (max-width: 600px) {
          .why-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
