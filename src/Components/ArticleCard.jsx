import "./ArticleCard.css";

export default function ArticleCard({ article }) {
  return (
    <li className="single__article">
      <h2>{article.title}</h2>
      <br />
      <p>
        {article.author} -- {article.topic} -- {article.votes} votes --{" "}
        {article.comment_count} comments
      </p>
    </li>
  );
}
