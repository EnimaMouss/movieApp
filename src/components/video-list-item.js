import React from "react";
import { IMAGE_BASE_URL } from "../constantes";

const VideoListItem = props => {
  const { movie } = props;
  return (
    <li className="list-group-item" onClick={handleOnClick}>
      <div className="media">
        <div className="media-left">
          <img
            className="media-object img-rounded"
            width="100px"
            height="100px"
            src={`${IMAGE_BASE_URL}${movie.poster_path}`}
            alt="..."
          />
        </div>
        <div className="media-body">
          <h5 className="title_list_item">{movie.title}</h5>
        </div>
      </div>
    </li>
  );
  function handleOnClick() {
    props.callback(movie);
  }
};

export default VideoListItem;
