import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/User";
import { getTopics, postArticle } from "../utils/api";

export default function AddArticle() {
  const { loggedInUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [newArticle, setNewArticle] = useState({
    author: loggedInUser.username,
    title: "",
    body: "",
    topic: "",
  });
  const [isError, setIsError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [topics, setTopics] = useState({});

  useEffect(() => {
    setIsLoading(true);
    getTopics().then(({ topics }) => {
      setTopics(topics);
      setIsLoading(false);
    });
  }, []);

  if (!loggedInUser.username) {
    return <p>You must be logged in to add a new article</p>;
  }

  const handleOnSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    postArticle(newArticle)
      .then(({ article }) => {
        console.log(article);
        setNewArticle({
          author: loggedInUser.username,
          title: "",
          body: "",
          topic: "",
        });
        setIsLoading(false);
        navigate(`/articles/${article.article_id}`);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
        setIsError(err.response.data.msg);
        setTimeout(() => {
          setIsError("");
          setNewArticle({
            author: loggedInUser.username,
            title: "",
            body: "",
            topic: "",
          });
        }, 1000);
      });
  };

  console.log(newArticle);
  if (isLoading) {
    return <p>Loading</p>;
  }

  const handleOnChange = (e) => {
    setNewArticle((previousObject) => {
      const newObject = { ...previousObject };
      newObject[e.target.id] = e.target.value;
      return newObject;
    });
  };

  return isError ? (
    <h1>{isError}</h1>
  ) : (
    <section>
      <form onSubmit={(e) => handleOnSubmit(e)}>
        <br />
        <label htmlFor="topic">Topic: </label>
        <select
          id="topic"
          type="text"
          name="topic"
          value={AddArticle.topic}
          onChange={(e) => {
            handleOnChange(e);
          }}
          required
        >
          <option selected disabled>
            choose a topic
          </option>
          {topics.map((topic) => {
            return (
              <option key={topic.slug} value={topic.slug}>
                {topic.slug}
              </option>
            );
          })}
        </select>
        <Link to="/topics/add">
          <p>Add New Topic</p>
        </Link>
        <br />
        <br />
        <label htmlFor="title">Title: </label>
        <input
          type="text"
          id="title"
          placeholder="title..."
          value={newArticle.title}
          onChange={(e) => {
            handleOnChange(e);
          }}
          required
        />{" "}
        <br />
        <br />
        <label htmlFor="body"></label>
        <textarea
          id="body"
          cols="40"
          rows="10"
          placeholder="Write your article here"
          value={newArticle.body}
          onChange={(e) => {
            handleOnChange(e);
          }}
          required
        ></textarea>
        <br />
        <button type="submit">Submit</button>
      </form>
    </section>
  );
}
