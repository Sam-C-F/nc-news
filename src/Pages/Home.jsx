import { useEffect, useState } from "react";
import ArticleCard from "../Components/ArticleCard";
import { getArticles } from "../utils/api";

export default function Home() {
  const [articles, setArticles] = useState([]);
  const [isloading, setIsLoading] = useState(true);

  useEffect(() => {
    getArticles().then(({ articles }) => {
      setArticles(articles);
      setIsLoading(false);
    });
  });

  if (isloading) {
    return <p>Loading</p>;
  }

  return (
    <section>
      <ArticleCard articles={articles} />
    </section>
  );
}
