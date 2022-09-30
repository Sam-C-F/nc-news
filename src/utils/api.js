import axios from "axios";

const newsApi = axios.create({
  baseURL: `https://back-end-portfolio-project.herokuapp.com/api`,
});

export const getArticles = async (topic, sort_by, order_by, limit, p) => {
  const { data } = await newsApi.get(`/articles`, {
    params: {
      topic,
      sort_by,
      order_by,
      limit,
      p,
    },
  });
  return data;
};

export const getArticleById = async (article_id) => {
  const { data } = await newsApi.get(`/articles/${article_id}`);
  return data;
};

export const getCommentsForArticle = async (article_id) => {
  const { data } = await newsApi.get(`/articles/${article_id}/comments`);
  return data;
};

export const postCommentsForArticle = async (article_id, reqBody) => {
  const { data } = await newsApi.post(
    `/articles/${article_id}/comments`,
    reqBody
  );
  return data;
};

export const patchArticleVotes = async (article_id, reqBody) => {
  const { data } = await newsApi.patch(`/articles/${article_id}`, reqBody);
  return data;
};

export const getTopics = async () => {
  const { data } = await newsApi.get("/topics");
  return data;
};

export const getUsers = async () => {
  const { data } = await newsApi.get(`/users`);
  return data;
};
