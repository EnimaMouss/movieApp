import React from "react";
import { BASE_URL } from "../constantes";

const Video = ({ videoId, title }) => {
  return (
    <div className="embed-responsive embed-responsive-16by9">
      <iframe
        className="embed-responsive-item"
        title={title}
        src={`${BASE_URL}${videoId}`}
      />
    </div>
  );
};

export default Video;
