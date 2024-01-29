import React from "react";
import "./movieListing.scss";
import { useSelector } from "react-redux";
import { getAllMovies, getAllTvShows } from "../../features/movies/movieSlice";
import MovieCard from "../MovieCard/MovieCard";

const MovieListing = () => {
  const movies = useSelector(getAllMovies);
  const tvShows = useSelector(getAllTvShows);

  let renderMovies;
  let renderTvShows;

  // render movies
  if (movies && movies.results) {
    renderMovies = movies.results.map((movie, index) => (
      <MovieCard key={index} data={movie} />
    ));
  } else {
    renderMovies = (
      <div className="movies-error">
        <h3>{movies.error}</h3>
      </div>
    );
  }
  // console.log(movies);

  // render tv shows
  if (tvShows && tvShows.results) {
    renderTvShows = tvShows.results.map((movie, index) => (
      <MovieCard key={index} data={movie} />
    ));
  } else {
    renderTvShows = (
      <div className="movies-error">
        <h3>{tvShows.error}</h3>
      </div>
    );
  }

  // console.log(tvShows);

  return (
    <div className="movie-wrapper">
      <div className="movie-list">
        <h2>Movies</h2>
        <div className="movie-container">{renderMovies}</div>
      </div>
      <div className="show-list">
        <h2>TV Shows</h2>
        <div className="movie-container">{renderTvShows}</div>
      </div>
    </div>
  );
};

export default MovieListing;
