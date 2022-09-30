import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TopicCard from "../Components/TopicCard";
import { getTopics } from "../utils/api";
import "./AllTopics.css";

export default function AllTopics() {
  const [topics, setTopics] = useState({});
  const [isloading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    getTopics().then(({ topics }) => {
      setTopics(topics);
      setIsLoading(false);
    });
  }, []);

  if (isloading) {
    return <p>Loading</p>;
  }

  return (
    <section>
      <ul className="all__topics">
        <Link to="/topics/add" className="link_class">
          <p className="add__topic">Add New Topic</p>
        </Link>
        {topics.map((topic) => {
          return <TopicCard topic={topic} key={topic.slug} />;
        })}
      </ul>
    </section>
  );
}
