import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div style={{ padding: 16 }}>
      <h2>404 - Page Not Found</h2>
      <Link to="/">Go to Dashboard</Link>
    </div>
  );
}