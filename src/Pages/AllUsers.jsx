import { useEffect, useState } from "react";
import UserCard from "../Components/UserCard";
import { getUsers } from "../utils/api";
import "./AllUsers.css";

export default function AllUsers() {
  const [users, setUsers] = useState([]);
  const [isloading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    getUsers().then(({ users }) => {
      setUsers(users);
      setIsLoading(false);
    });
  }, []);

  if (isloading) {
    return <p>Loading</p>;
  }

  return (
    <section>
      <ul className="all__users">
        {users.map((user) => {
          return <UserCard user={user} key={user.name} />;
        })}
      </ul>
    </section>
  );
}
