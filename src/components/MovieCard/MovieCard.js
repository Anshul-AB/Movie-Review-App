import React from "react";
import "./movieCard.scss";
import { Link } from "react-router-dom";

const MovieCard = ({ data }) => {
  const base_url = "https://image.tmdb.org/t/p/w500";
  return (
    <div className="card-item">
      <Link to={`/movie/${data.id}`}>
        <div className="card-inner">
          <div className="card-top">
            <img
              src={base_url + data.poster_path}
              alt={data.title}
            />
          </div>
          <div className="card-bottom">
            <div className="card-info">
              <h4>{data.title}</h4>
              <p>{data.release_date}</p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default MovieCard;
