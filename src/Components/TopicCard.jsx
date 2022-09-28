import { Link } from "react-router-dom";
import "./TopicCard.css";

export default function TopicCard({ topic }) {
  return (
    <Link to={`/home/${topic.slug}`} className="single__topics">
      <li>
        <h2>{topic.slug}</h2>
        <p>{topic.description}</p>
      </li>
    </Link>
  );
}
