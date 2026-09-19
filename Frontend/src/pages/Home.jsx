import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

export default function Home() {
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await api.post("/api/day", { day, month, year });
      navigate("/results", { state: { result: res.data } });
    } catch (err) {
      if (err.response) {
        setError(err.response.data.error || "Something went wrong.");
      } else {
        setError("Could not reach the server. It may be waking up, try again in a moment.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <span className="emoji">🎂</span>
      <h1>Which day were you born?</h1>
      <p className="subtitle">Enter your birthday and discover the weekday you arrived.</p>

      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="field">
            <label htmlFor="day">Day</label>
            <input
              id="day"
              type="number"
              placeholder="DD"
              min="1"
              max="31"
              value={day}
              onChange={(e) => setDay(e.target.value)}
              required
            />
          </div>

          <div className="field">
            <label htmlFor="month">Month</label>
            <select
              id="month"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              required
            >
              <option value="" disabled>
                Select
              </option>
              {MONTHS.map((name, i) => (
                <option key={name} value={i + 1}>
                  {name}
                </option>
              ))}
            </select>
          </div>

          <div className="field">
            <label htmlFor="year">Year</label>
            <input
              id="year"
              type="number"
              placeholder="YYYY"
              min="1"
              max="9999"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              required
            />
          </div>
        </div>

        {error && <p className="error">{error}</p>}

        <button type="submit" disabled={loading}>
          {loading && <span className="spinner" />}
          {loading ? "Calculating..." : "Find my day ✨"}
        </button>
      </form>
    </div>
  );
}