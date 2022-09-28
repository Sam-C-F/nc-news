import { Link } from "react-router-dom";
import "./TopicCard.css";

export default function TopicCard({ topics }) {
  return (
    <section>
      <ul className="all__topics">
        {topics.map((topic) => {
          return (
            <Link
              to={`/home/${topic.slug}`}
              key={topic.slug}
              className="single__topics"
            >
              <li>
                <h2>{topic.slug}</h2>
                <p>{topic.description}</p>
              </li>
            </Link>
          );
        })}
      </ul>
    </section>
  );
}
