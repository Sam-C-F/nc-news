import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ArticleCard from "../Components/ArticleCard";
import { getArticles } from "../utils/api";

export default function ArticleByTopic() {
  const [articles, setArticles] = useState([]);
  const [isloading, setIsLoading] = useState(true);

  const { topic } = useParams();

  useEffect(() => {
    getArticles(topic).then(({ articles }) => {
      setArticles(articles);
      setIsLoading(false);
    });
  }, [topic]);

  if (isloading) {
    return <p>Loading</p>;
  }

  return (
    <section>
      <ArticleCard articles={articles} />
    </section>
  );
}
