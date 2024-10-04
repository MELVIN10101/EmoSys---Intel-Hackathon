import React from 'react';

const Home = ({ graphs, activeGraph, showAllGraphs }) => {
  return (
    <div>


      {/* <div className="toggle-cont">
        {graphs.map((graph, index) => (
          <button key={index} onClick={() => {}}>
            {graph.title}
          </button>
        ))}
        <button onClick={() => {}}>
          Show All Graphs
        </button>
      </div> */}


      <div className="graph">
        {showAllGraphs ? (
          graphs.map((graph, index) => (
            <Graph key={index} title={graph.title} imageSrc={graph.imageSrc} />
          ))
        ) : (
          activeGraph !== null && (
            <Graph title={graphs[activeGraph].title} imageSrc={graphs[activeGraph].imageSrc} />
          )
        )}
      </div>
    </div>
  );
};

const Graph = ({ title, imageSrc }) => (
  <div className="graph">
    <h3 className="graph-title">{title}</h3>
    <img src={imageSrc} className={`graph`} alt={`Image for ${title}`} />
  </div>
);

export default Home;
