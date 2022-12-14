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

export const postArticle = async (reqBody) => {
  const { data } = await newsApi.post("/articles", reqBody);
  return data;
};

export const getArticleById = async (article_id) => {
  const { data } = await newsApi.get(`/articles/${article_id}`);
  return data;
};

export const getCommentsForArticle = async (article_id, limit, p) => {
  const { data } = await newsApi.get(`/articles/${article_id}/comments`, {
    params: { limit, p },
  });
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

export const removeArticle = async (article_id) => {
  const { data } = await newsApi.delete(`/articles/${article_id}`);
  return data;
};

export const getTopics = async () => {
  const { data } = await newsApi.get("/topics");
  return data;
};

export const postTopic = async (reqBody) => {
  const { data } = await newsApi.post("/topics", reqBody);
  return data;
};

export const getUsers = async () => {
  const { data } = await newsApi.get(`/users`);
  return data;
};

export const deleteComment = async (comment_id) => {
  const { data } = await newsApi.delete(`/comments/${comment_id}`);
  return data;
};

export const patchCommentVotes = async (comment_id, reqBody) => {
  const { data } = await newsApi.patch(`/comments/${comment_id}`, reqBody);
  return data;
};
