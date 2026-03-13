import { useEffect, useState } from "react";
import { getText } from "../api/http";

export default function HealthPage() {
  const [health, setHealth] = useState("Loading...");
  const [error, setError] = useState("");

  useEffect(() => {
    getText("/health")
      .then(setHealth)
      .catch((e) => setError(e.message));
  }, []);

  return (
    <div style={{ padding: 16 }}>
      <h2>Backend Health</h2>
      {error ? (
        <p style={{ color: "crimson" }}>{error}</p>
      ) : (
        <p>
          Backend health: <b>{health}</b>
        </p>
      )}
    </div>
  );
}