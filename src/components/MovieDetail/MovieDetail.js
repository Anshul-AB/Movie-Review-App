import React, { useEffect } from "react";
import "./movieDetail.scss";

import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  fetchAsyncMovieDetails,
  fetchAsyncTvDetails,
  getAllMovieDetails,
  getAllTvDetails,
  removeSelectedMovieOrShow,
} from "../../features/movies/movieSlice";

const MovieDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const movieData = useSelector(getAllMovieDetails);
  const tvData = useSelector(getAllTvDetails);
  // console.log(movieData);
  console.log(tvData);

  useEffect(() => {
    dispatch(fetchAsyncMovieDetails(id)) ||
      dispatch(fetchAsyncTvDetails({ id }));
    // cleanup function
    return () => {
      dispatch(removeSelectedMovieOrShow());
      console.log("removed");
    };
  }, [dispatch, id]);

  return (
    <div className="movie-section">
      {Object.keys(movieData).length === 0 ? (
        <div>...Loading</div>
      ) : (
        <>
          <div className="section-left">
            <div className="movie-title">{movieData.title || tvData.title}</div>

            {/* movie rating */}
            <div className="movie-rating">
              {/* <span>
            IMDB Rating <i className="fa fa-star"></i> :{" "}
            {movieData.imdb_id || tvData.imdb_id}
          </span> */}
              <span>
                IMDB Votes <i className="fa fa-thumbs-up"></i> :{" "}
                {movieData.vote_count} || {tvData.vote_count}
              </span>
              <span>
                Runtime <i className="fa fa-film"></i> :{" "}
                {movieData.runtime || tvData.runtime}
              </span>
              <span>
                Year <i className="fa fa-calendar"></i> :{" "}
                {movieData.release_date} || {tvData.release_date}
              </span>
            </div>

            {/* overview */}
            <div className="movie-plot">
              {movieData.overview || tvData.overview}
            </div>

            {/* Info */}
            <div className="movie-info">
              {/* Production Company */}
              <div>
                <span>Production Companies</span>
                <span>
                  {(movieData.production_companies &&
                    movieData.production_companies.length > 0 &&
                    movieData.production_companies
                      .map((company) => company.name)
                      .join(", ")) ||
                    (tvData.production_companies &&
                      tvData.production_companies.length > 0 &&
                      tvData.production_companies
                        .map((company) => company.name)
                        .join(", ")) ||
                    "N/A"}
                </span>
              </div>

              {/* genre */}
              <div>
                <span>Generes</span>
                <span>
                  {movieData.genres && movieData.genres.length > 0
                    ? movieData.genres.map((genre) => genre.name).join(", ")
                    : null}
                  {tvData.genres && tvData.genres.length > 0
                    ? tvData.genres.map((genre) => genre.name).join(", ")
                    : null}
                </span>
              </div>

              {/* status */}
              <div>
                <span>Status</span>
                <span>{movieData.status || tvData.status}</span>
              </div>

              {/* languages */}
              <div>
                <span>Languages</span>
                <span>
                  {movieData.spoken_languages &&
                  movieData.spoken_languages.length > 0
                    ? movieData.spoken_languages
                        .map((language) => language.english_name)
                        .join(", ")
                    : null}
                  {tvData.spoken_languages && tvData.spoken_languages.length > 0
                    ? tvData.spoken_languages
                        .map((language) => language.english_name)
                        .join(", ")
                    : null}
                </span>
              </div>

              {/* popularity */}
              <div>
                <span>Popularity</span>
                <span>{movieData.popularity || tvData.popularity}</span>
              </div>
            </div>
          </div>

          {/* Poster */}
          <div className="section-right">
            {(
              <img
                src={"https://image.tmdb.org/t/p/w500" + movieData.poster_path}
                alt={movieData.Title}
              />
            ) || (
              <img
                src={"https://image.tmdb.org/t/p/w500" + tvData.poster_path}
                alt={tvData.Title}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default MovieDetail;
