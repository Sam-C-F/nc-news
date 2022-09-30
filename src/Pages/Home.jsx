import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../App.css";
import ArticleCard from "../Components/ArticleCard";
import { getArticles } from "../utils/api";

export default function Home() {
  const [articles, setArticles] = useState([]);
  const [isloading, setIsLoading] = useState(true);
  const [sortBy, setSortBy] = useState("created_at");
  const [orderBy, setOrderBy] = useState("DESC");
  const [totalArticles, setTotalArticles] = useState(0);
  const [limit, setLimit] = useState(10);
  const [p, setP] = useState(1);
  const [isError, setIsError] = useState("");

  useEffect(() => {
    setIsLoading(true);
    getArticles(undefined, sortBy, orderBy, limit, p)
      .then((data) => {
        setTotalArticles(data.total_count);
        setArticles(data.articles);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsError(<p>This page does not exist, please try again!</p>);
        setIsLoading(false);
      });
  }, [sortBy, orderBy, limit, p]);

  if (isloading) {
    return <p>Loading</p>;
  }

  const handleSortOnChange = (e) => {
    setSortBy(e.target.value);
  };

  const handleOrderOnChange = (e) => {
    setOrderBy(e.target.value);
  };

  const handleLimitOnChange = (e) => {
    setLimit(e.target.value);
  };

  const handlePageOnChange = (e) => {
    setP(e.target.value);
  };

  const pageArray = [];
  const numberOfPages = Math.ceil(totalArticles / limit);
  for (let i = 0; i < numberOfPages; i++) {
    pageArray.push(i);
  }

  return isError ? (
    isError
  ) : (
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
        <Link to="/articles/add" className="link_class">
          <p className="add__article">Add New article</p>
        </Link>
        {articles.map((article) => {
          return <ArticleCard article={article} key={article.article_id} />;
        })}
      </ul>
      <hr />
      <p>
        Total Articles: {totalArticles}
        &nbsp; &nbsp; &nbsp;
        <label htmlFor="limit">Limit: </label>
        <select
          name="limit"
          id="limit"
          value={limit}
          onChange={(e) => {
            handleLimitOnChange(e);
          }}
        >
          <option value="10">10</option>
          <option value="25">25</option>
          <option value="50">50</option>
        </select>
        &nbsp;
        <label htmlFor="p">Page: </label>
        <select
          name="p"
          id="p"
          value={p}
          onChange={(e) => {
            handlePageOnChange(e);
          }}
        >
          {pageArray.map((p) => {
            return (
              <option key={p + 1} value={p + 1}>
                {p + 1}
              </option>
            );
          })}
        </select>
      </p>
    </section>
  );
}
