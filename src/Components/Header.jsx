import { useContext } from "react";
import { UserContext } from "../contexts/User";
import "./Header.css";

export default function Header() {
  const { loggedInUser } = useContext(UserContext);
  const { setLoggedInUser } = useContext(UserContext);

  return loggedInUser.username ? (
    <section className="header">
      <h1>NC News</h1>
      <img
        className="profile__image"
        src={loggedInUser.avatar_url}
        alt={`the avatar for ${loggedInUser.username}`}
      />
      <p>{loggedInUser.username}</p>
      <button
        onClick={() => {
          setLoggedInUser({
            username: "",
            name: "",
            avatar_url: "",
          });
        }}
      >
        Log Out
      </button>
    </section>
  ) : (
    <section className="header">
      <h1>NC News</h1>
      <p>Logged Out</p>
    </section>
  );
}
