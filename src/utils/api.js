import axios from "axios";

const newsApi = axios.create({
  baseURL: `https://back-end-portfolio-project.herokuapp.com/api`,
});

export const getArticles = async (topic, sort_by, order_by, limit, page) => {
  const { data } = await newsApi.get(`/articles`, {
    params: {
      topic,
      sort_by,
      order_by,
      limit,
      page,
    },
  });
  return data;
};

export const getArticleById = async (article_id) => {
  const { data } = await newsApi.get(`/articles/${article_id}`);
  return data;
};

export const getTopics = async () => {
  const { data } = await newsApi.get("/topics");
  return data;
};
