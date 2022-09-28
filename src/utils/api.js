import axios from "axios";

const newsApi = axios.create({
  baseURL: `https://back-end-portfolio-project.herokuapp.com/api`,
});

export const getArticles = (topic, sort_by, order_by, limit, page) => {
  return newsApi
    .get(`/articles`, {
      params: {
        topic,
        sort_by,
        order_by,
        limit,
        page,
      },
    })
    .then(({ data }) => {
      return data;
    });
};

export const getTopics = () => {
  return newsApi.get("/topics").then(({ data }) => {
    return data;
  });
};
