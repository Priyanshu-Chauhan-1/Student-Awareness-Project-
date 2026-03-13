import { NavLink } from "react-router-dom";

const linkStyle = ({ isActive }) => ({
  textDecoration: "none",
  padding: "8px 10px",
  borderRadius: 8,
  color: isActive ? "white" : "#222",
  background: isActive ? "#2563eb" : "transparent",
});

export default function Navbar() {
  return (
    <div style={{ borderBottom: "1px solid #e5e7eb", padding: 12 }}>
      <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
        <div style={{ fontWeight: 700 }}>Student Awareness Portal</div>

        <nav style={{ display: "flex", gap: 8, marginLeft: 16 }}>
          <NavLink to="/" style={linkStyle} end>
            Dashboard
          </NavLink>
          <NavLink to="/students" style={linkStyle}>
            Students
          </NavLink>
          <NavLink to="/resources" style={linkStyle}>
            Resources
          </NavLink>
          <NavLink to="/health" style={linkStyle}>
            Health
          </NavLink>
        </nav>
      </div>
    </div>
  );
}