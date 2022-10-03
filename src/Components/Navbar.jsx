import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <section className="navbar">
      <Link to="/home" className="link_class">
        Home
      </Link>
      &nbsp; &nbsp; &nbsp;
      <Link to="/topics" className="link_class">
        Topics
      </Link>
      &nbsp; &nbsp; &nbsp;
      <Link to="/users" className="link_class">
        Users
      </Link>
    </section>
  );
}
