import React from "react";
var hostname = "http://localhost:5000/public"
const Details = ({songs}) => {
  return <div className="details">
    <div className="details-image">
        <img src={`${hostname}/images/`+ songs?._id+".jpg"} alt="" />
    </div>
    <h3 className="details_title">
     <span>Title:</span> {songs?.title}
      </h3>
    <h3 className="details_artist">
     <span>Artist:</span> {songs?.artist}</h3>
  </div>;
};

export default Details;
