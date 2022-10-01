import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/User";
import { postTopic } from "../utils/api";

export default function AddTopic() {
  const { loggedInUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [newTopic, setNewTopic] = useState({
    slug: "",
    description: "",
  });
  const [isError, setIsError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  if (!loggedInUser.username) {
    return <p>You must be logged in to add a new article</p>;
  }

  const handleOnSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    postTopic(newTopic)
      .then(({ comment }) => {
        setNewTopic({
          slug: "",
          description: "",
        });
        setIsLoading(false);
        navigate("/articles/add");
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
        setIsError(err.response.data.msg);
        setTimeout(() => {
          setIsError("");
          setNewTopic({
            slug: "",
            description: "",
          });
        }, 1000);
      });
  };

  if (isLoading) {
    return <p>Loading</p>;
  }

  const handleOnChange = (e) => {
    setNewTopic((previousObject) => {
      const newObject = { ...previousObject };
      newObject[e.target.id] = e.target.value;
      return newObject;
    });
  };

  return isError ? (
    <h1>{isError}</h1>
  ) : (
    <section>
      <h2>Add a new topic...</h2>
      <form onSubmit={(e) => handleOnSubmit(e)}>
        <br />
        <label htmlFor="slug">Slug: </label>
        <input
          type="text"
          id="slug"
          placeholder="Slug..."
          value={newTopic.slug}
          onChange={(e) => {
            handleOnChange(e);
          }}
          required
        />{" "}
        <br />
        <br />
        <label htmlFor="description"></label>
        <textarea
          id="description"
          cols="40"
          rows="10"
          placeholder="Enter the description here"
          value={newTopic.description}
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
