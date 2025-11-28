"use client";

import React, { useState } from "react";

const API_URL = "/api/waitlist";

type Status = "idle" | "loading" | "success" | "error";

export default function HomePage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  // --- mouse-follow gradient state ---
  const [cursorPos, setCursorPos] = useState({ x: 50, y: 50 }); // % of container

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
          // CSS custom props for the gradient center
          "--cursor-x": `${cursorPos.x}%`,
          "--cursor-y": `${cursorPos.y}%`,
        } as React.CSSProperties
      }
    >
      {/* gradient lives on .page; card stays on top */}
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
      </div>

      <style jsx>{`
        :global(body) {
          margin: 0;
          font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
            sans-serif;
          background-color: #f7f7f7;
        }
        .page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          position: relative;
          overflow: hidden;

          /* base background + spotlight following cursor */
          background: radial-gradient(
              circle at var(--cursor-x, 50%) var(--cursor-y, 50%),
              rgba(12, 12, 79, 0.5),
              transparent 60%
            ),
            #f7f7f7;
        }

        /* In case user prefers reduced motion, disable the effect */
        @media (prefers-reduced-motion: reduce) {
          .page {
            background: #f7f7f7;
          }
        }

        .card {
          max-width: 420px;
          width: 100%;
          background: #ffffff;
          border-radius: 16px;
          padding: 32px 28px;
          text-align: center;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.06);
          position: relative;
          z-index: 1; /* sits above the gradient */
        }
        .title {
          font-size: 28px;
          font-weight: 800;
          color: #0c0c4f;
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
      `}</style>
    </div>
  );
}
