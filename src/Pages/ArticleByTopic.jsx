import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ArticleCard from "../Components/ArticleCard";
import { getArticles } from "../utils/api";

export default function ArticleByTopic() {
  const [articles, setArticles] = useState([]);
  const [isloading, setIsLoading] = useState(true);
  const [sortBy, setSortBy] = useState("created_at");
  const [orderBy, setOrderBy] = useState("DESC");

  const { topic } = useParams();

  useEffect(() => {
    setIsLoading(true);
    getArticles(topic, sortBy, orderBy).then(({ articles }) => {
      setArticles(articles);
      setIsLoading(false);
    });
  }, [topic, sortBy, orderBy]);

  if (isloading) {
    return <p>Loading</p>;
  }

  const handleSortOnChange = (e) => {
    setSortBy(e.target.value);
  };

  const handleOrderOnChange = (e) => {
    setOrderBy(e.target.value);
  };

  return (
    <section>
      <label htmlFor="sort_by">Sort By: </label>
      <select
        name="sort_by"
        id="sort_by"
        value={sortBy}
        onChange={(e) => {
          handleSortOnChange(e);
        }}
      >
        <option value="created_at">Date</option>
        <option value="comment_count">Comments</option>
        <option value="votes">Votes</option>
      </select>
      &nbsp; &nbsp; &nbsp;
      <label htmlFor="order_by">Order: </label>
      <select
        name="order_by"
        id="order_by"
        value={orderBy}
        onChange={(e) => {
          handleOrderOnChange(e);
        }}
      >
        <option value="DESC">Descending</option>
        <option value="ASC">Ascending</option>
      </select>
      <ul className="all__articles">
        {articles.map((article) => {
          return <ArticleCard article={article} key={article.article_id} />;
        })}
      </ul>
    </section>
  );
}
