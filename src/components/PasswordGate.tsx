"use client";

import { useState, useEffect } from "react";

const PASS_KEY = "fuwo-access";
const CORRECT_HASH = "fuwo2026!";

export default function PasswordGate({ children }: { children: React.ReactNode }) {
  const [unlocked, setUnlocked] = useState(false);
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    if (localStorage.getItem(PASS_KEY) === CORRECT_HASH) {
      setUnlocked(true);
    }
  }, []);

  if (unlocked) return <>{children}</>;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input === CORRECT_HASH) {
      localStorage.setItem(PASS_KEY, CORRECT_HASH);
      setUnlocked(true);
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "#111111",
      fontFamily: "'Manrope', -apple-system, sans-serif",
    }}>
      <form onSubmit={handleSubmit} style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "1.5rem",
        padding: "3rem",
        maxWidth: "360px",
        width: "100%",
      }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/icons/fuwo_white.svg"
          alt="FUWO"
          style={{ width: "120px", height: "auto" }}
        />
        <p style={{
          color: "#D0D0D0",
          fontSize: "0.95rem",
          textAlign: "center",
          lineHeight: 1.5,
        }}>
          Hier entsteht die neue Fußball-Woche.<br />
          <span style={{ fontSize: "0.85rem", color: "#999" }}>Trainingslager — nur für das Team.</span>
        </p>
        <input
          type="password"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Passwort"
          autoFocus
          style={{
            width: "100%",
            padding: "0.85rem 1rem",
            background: "#1E1E1E",
            border: `1px solid ${error ? "#FC401D" : "#444"}`,
            borderRadius: "12px",
            color: "#F5F5F5",
            fontSize: "1rem",
            fontFamily: "inherit",
            outline: "none",
            transition: "border-color 0.3s",
          }}
        />
        {error && (
          <p style={{ color: "#FC401D", fontSize: "0.85rem", margin: "-0.5rem 0" }}>
            Falsches Passwort
          </p>
        )}
        <button type="submit" style={{
          width: "100%",
          padding: "0.85rem",
          background: "#0a6b1d",
          color: "#F5F5F5",
          border: "none",
          borderRadius: "12px",
          fontSize: "1rem",
          fontWeight: 700,
          fontFamily: "inherit",
          cursor: "pointer",
          transition: "background 0.2s",
        }}>
          Zugang
        </button>
      </form>
    </div>
  );
}
