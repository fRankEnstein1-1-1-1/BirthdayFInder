import { useMemo } from "react";
import { Link, Navigate, useLocation } from "react-router-dom";

const TRAITS = {
  Monday: "🌸 Fair of face",
  Tuesday: "💃 Full of grace",
  Wednesday: "🌧️ Full of woe",
  Thursday: "🧭 Far to go",
  Friday: "💖 Loving and giving",
  Saturday: "🔨 Works hard for a living",
  Sunday: "☀️ Bonny and blithe",
};

const COLORS = ["#ff6ec4", "#7873f5", "#38bdf8", "#facc15", "#4ade80"];

export default function Results() {
  const location = useLocation();
  const result = location.state?.result;

  // Hooks must run before any early return
  const pieces = useMemo(
    () =>
      Array.from({ length: 45 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 4,
        duration: 3 + Math.random() * 3,
        size: 6 + Math.random() * 8,
        color: COLORS[i % COLORS.length],
      })),
    []
  );

  // If someone opens /results directly (or refreshes), send them home
  if (!result) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <div className="confetti">
        {pieces.map((p) => (
          <span
            key={p.id}
            style={{
              left: `${p.left}%`,
              width: p.size,
              height: p.size * 1.6,
              background: p.color,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
            }}
          />
        ))}
      </div>

      <div className="card">
        <span className="emoji">🎉</span>
        <p className="result-label">You were born on a</p>
        <h1 className="weekday">{result.weekday}</h1>
        <p className="date">{result.formatted}</p>

        <div className="trait">{TRAITS[result.weekday]}</div>
        <br />

        <Link to="/" className="btn-link">
          ← Try another date
        </Link>
      </div>
    </>
  );
}