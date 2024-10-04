import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import Home from './Home';
import Performance from './Performance';
import CPU from './CPU';
import Thermals from './Thermals';
import AI from './AI';
import Help from './Help';

const graphs = [
  { title: "Graph 1", imageSrc: "../emojis/graph1.png" },
  { title: "Graph 2", imageSrc: "../emojis/graph2.png" },
  { title: "Graph 3", imageSrc: "../emojis/graph3.png" }
];

const App = () => {
  const [activeGraph, setActiveGraph] = useState(null);
  const [showAllGraphs, setShowAllGraphs] = useState(false);

  const handleGraphSelect = (index) => {
    setActiveGraph(index);
    setShowAllGraphs(false);
  };

  const handleShowAllGraphs = () => {
    setShowAllGraphs(true);
  };

  return (
    <Router>
      <div className="parent-cont">
        <span className="title-cont">
          <img src="" alt="logo" />
          <h1>EmoSys</h1>
        </span>
        <div className="main-cont">
          <div className="cont-1">
            <Link to="/home"><Tag icon="./emojis/home.svg" text="Home" /></Link>
            <Link to="/performance"><Tag icon="./emojis/performance.svg" text="Performance" /></Link>
            <Link to="/cpu"><Tag icon="./emojis/CPU.svg" text="CPU" /></Link>
            <Link to="/thermals"><Tag icon="./emojis/thermals.svg" text="Thermals" /></Link>
            <Link to="/ai"><Tag icon="./emojis/AI.svg" text="AI" /></Link>
            <Link to="/help"><Tag icon="./emojis/help.svg" text="Help" /></Link>
          </div>

          <div className="cont-2">
            <div className="toggle-cont">
              {graphs.map((graph, index) => (
                <button  className='toggle-btn' key={index} onClick={() => handleGraphSelect(index)}>
                  {graph.title}
                </button>
              ))}
              <button className='toggle-btn' onClick={handleShowAllGraphs}>Show All Graphs</button>
            </div>
            <div className="graph-cont">
              <Routes>
                <Route path="/home" element={<Home graphs={graphs} activeGraph={activeGraph} showAllGraphs={showAllGraphs} />} />
                <Route path="/performance" element={<Performance />} />
                <Route path="/cpu" element={<CPU />} />
                <Route path="/thermals" element={<Thermals />} />
                <Route path="/ai" element={<AI />} />
                <Route path="/help" element={<Help />} />
                <Route path="/" element={<Home graphs={graphs} activeGraph={activeGraph} showAllGraphs={showAllGraphs} />} />
              </Routes>
            </div>
          </div>
        </div>

        <div className="cont-3">
          <SearchForm />
          <EmojiMessage />
        </div>
      </div>
    </Router>
  );
};

const Tag = ({ icon, text }) => (
  <span className="tag">
    <img src={icon} alt={text} className="icon" />
    <h3 className={`${text.toLowerCase()}-text`}>{text}</h3>
  </span>
);

const Graph = ({ title, imageSrc }) => (
  <div className="graph">
    <h3 className="graph-title">{title}</h3>
    <img src={imageSrc} className={`graph-img`} alt={`Image for ${title}`} />
  </div>
);

const SearchForm = () => (
  <form className="search-form">
    <input className="search" placeholder="Type here..." />
    <button type="submit" className="search-btn">
      <img src="./emojis/search.svg" alt="Search" />
    </button>
  </form>
);

const EmojiMessage = () => (
  <div className="emoji-cont">
    <img className="emoji" src="./emojis/good.gif" alt="Emoji" />
    <h4 className="emoji-text">Melvin, You're good to go!</h4>
  </div>
);

export default App;
