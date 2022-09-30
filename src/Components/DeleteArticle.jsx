import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/User";
import { removeArticle } from "../utils/api";

export default function DeleteArticle({ article }) {
  const navigate = useNavigate();
  const { loggedInUser } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);

  const handleDeleteOnClick = () => {
    setIsLoading(true);
    removeArticle(article.article_id)
      .then((data) => {
        setIsLoading(false);
        setIsDeleted(true);
        setTimeout(() => {
          navigate("/");
        }, 1000);
      })
      .catch((err) => {
        setIsLoading(false);
        setIsDeleted(false);
      });
  };

  if (isDeleted) {
    return <p>Deleted</p>;
  }

  if (isLoading) {
    return <p>Loading</p>;
  }

  return loggedInUser.username === article.author ? (
    <button
      onClick={() => {
        handleDeleteOnClick();
      }}
    >
      Delete
    </button>
  ) : null;
}
