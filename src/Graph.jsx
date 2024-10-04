const Graph = ({ title, imageSrc }) => (
    <div className="graph-cont">
      <h3 className="graph-title">{title}</h3>
      <img src={imageSrc} className={`graph`} alt={`Image for ${title}`} />
    </div>
  );


  export default Graph;