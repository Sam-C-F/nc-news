import { useEffect, useState } from "react";
import "../App.css";

import ArticleCard from "../Components/ArticleCard";
import { getArticles } from "../utils/api";

export default function Home() {
  const [articles, setArticles] = useState([]);
  const [isloading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    getArticles().then(({ articles }) => {
      setArticles(articles);
      setIsLoading(false);
    });
  }, []);

  if (isloading) {
    return <p>Loading</p>;
  }

  return (
    <section>
      <ul className="all__articles">
        {articles.map((article) => {
          return <ArticleCard article={article} key={article.article_id} />;
        })}
      </ul>
    </section>
  );
}
