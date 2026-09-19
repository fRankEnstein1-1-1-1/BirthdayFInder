import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

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
      // axios sends the object as JSON and parses the response for you
      const res = await api.post("/api/day", { day, month, year });

      navigate("/results", { state: { result: res.data } });
    } catch (err) {
      if (err.response) {
        // Server replied with an error (e.g. 400 invalid date)
        setError(err.response.data.error || "Something went wrong.");
      } else {
        // No response at all: server down, waking up, or network issue
        setError("Could not reach the server. It may be waking up, try again in a moment.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h1>Which day were you born?</h1>
      <p className="subtitle">Enter your birthday to find out.</p>

      <form onSubmit={handleSubmit}>
        <div className="row">
          <input
            type="number"
            placeholder="Day"
            min="1"
            max="31"
            value={day}
            onChange={(e) => setDay(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Month"
            min="1"
            max="12"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Year"
            min="1"
            max="9999"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            required
          />
        </div>

        {error && <p className="error">{error}</p>}

        <button type="submit" disabled={loading}>
          {loading ? "Calculating..." : "Find my day"}
        </button>
      </form>
    </div>
  );
}