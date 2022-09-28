import "./Navbar.css";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <section className="navbar">
      <Link to="/">Home</Link>
    </section>
  );
}
