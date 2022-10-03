import { useContext } from "react";
import { UserContext } from "../contexts/User";

export default function UserCard({ user }) {
  const { setLoggedInUser } = useContext(UserContext);
  return (
    <li className="user__card">
      <img src={user.avatar_url} alt={`the avatar for ${user.username}`} />
      <p>{user.username}</p>
      <button
        onClick={() => {
          setLoggedInUser(user);
        }}
      >
        Log In
      </button>
    </li>
  );
}
