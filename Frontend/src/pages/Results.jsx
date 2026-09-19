import { Link, Navigate, useLocation } from "react-router-dom";

export default function Results() {
  const location = useLocation();
  const result = location.state?.result;

  // If someone opens /results directly (or refreshes), send them home
  if (!result) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="card">
      <p className="subtitle">You were born on a</p>
      <h1 className="weekday">{result.weekday}</h1>
      <p className="date">{result.formatted}</p>

      <Link to="/" className="btn-link">
        ← Try another date
      </Link>
    </div>
  );
}