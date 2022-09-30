import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./Components/Header";
import Navbar from "./Components/Navbar";
import AddArticle from "./Pages/AddArticle";
import AddTopic from "./Pages/AddTopic";
import AllTopics from "./Pages/AllTopics";
import AllUsers from "./Pages/AllUsers";
import ArticleById from "./Pages/ArticleById";
import ArticleByTopic from "./Pages/ArticleByTopic";
import Display404 from "./Pages/ErrorHandling";
import Home from "./Pages/Home";

function App() {
  return (
    <div className="App">
      <header>
        <Header />
        <Navbar />
      </header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/articles/add" element={<AddArticle />} />
        <Route path="/home" element={<Home />} />
        <Route path="/home/:topic" element={<ArticleByTopic />} />
        <Route path="/articles/:article_id" element={<ArticleById />} />
        <Route path="/topics" element={<AllTopics />} />
        <Route path="/users" element={<AllUsers />} />
        <Route path="/topics/add" element={<AddTopic />} />
        <Route path="/*" element={<Display404 />} />
      </Routes>
    </div>
  );
}

export default App;
