import "./Navbar.css";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <section className="navbar">
      <Link to="/home">Home</Link>
      &nbsp; &nbsp; &nbsp;
      <Link to="/topics">Topics</Link>
      &nbsp; &nbsp; &nbsp;
      <Link to="/users">Users</Link>
    </section>
  );
}
