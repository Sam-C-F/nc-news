import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./Components/Header";
import Navbar from "./Components/Navbar";
import AllTopics from "./Pages/AllTopics";
import ArticleByTopic from "./Pages/ArticleByTopic";
import Home from "./Pages/Home";

function App() {
  return (
    <div className="App">
      <Header />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/home/:topic" element={<ArticleByTopic />} />
        <Route path="/topics" element={<AllTopics />} />
      </Routes>
    </div>
  );
}

export default App;
