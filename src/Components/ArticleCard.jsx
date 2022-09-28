import "./ArticleCard.css";

export default function ArticleCard({ articles }) {
  return (
    <section>
      <ul className="all__articles">
        {articles.map((article) => {
          return (
            <li key={article.article_id} className="single__article">
              <h2>{article.title}</h2>
              <br />
              <p>
                {article.author} -- {article.topic} -- {article.votes} votes --{" "}
                {article.comment_count} comments
              </p>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
