import { Link } from "react-router-dom";
import "./ArticleCard.css";

export default function ArticleCard({ article }) {
  return (
    <Link to={`/articles/${article.article_id}`} className="single__article">
      <li>
        <h2>{article.title}</h2>
        <br />
        <p>
          {article.author} -- {article.topic} -- {article.votes} votes --{" "}
          {article.comment_count} comments
        </p>
      </li>
    </Link>
  );
}
