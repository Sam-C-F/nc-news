import { useEffect, useState } from "react";
import TopicCard from "../Components/TopicCard";
import { getTopics } from "../utils/api";

export default function AllTopics() {
  const [topics, setTopics] = useState({});
  const [isloading, setIsLoading] = useState(true);

  useEffect(() => {
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
      <TopicCard topics={topics} />
    </section>
  );
}
