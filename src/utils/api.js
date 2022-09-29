import axios from "axios";

const newsApi = axios.create({
  baseURL: `https://back-end-portfolio-project.herokuapp.com/api`,
});

export const getArticles = async (topic, sort_by, order_by, limit, page) => {
  try {
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
  } catch (err) {
    next(err);
  }
};

export const getArticleById = async (article_id) => {
  try {
    const { data } = await newsApi.get(`/articles/${article_id}`);
    return data;
  } catch (err) {
    next(err);
  }
};

export const patchArticleVotes = async (article_id, reqBody) => {
  try {
    const { data } = await newsApi.patch(`/articles/${article_id}`, reqBody);
    return data;
  } catch (err) {
    next(err);
  }
};

export const getTopics = async () => {
  try {
    const { data } = await newsApi.get("/topics");
    return data;
  } catch (err) {
    next(err);
  }
};
