import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./header.scss";
import user from "../../images/user.png";
import { useDispatch } from "react-redux";
import { fetchAsyncMovies, fetchAsyncTV } from "../../features/movies/movieSlice";

const Header = () => {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch()

  const submit = (e) => {
    e.preventDefault();
    console.log(search);
    dispatch(fetchAsyncMovies(search));
    dispatch(fetchAsyncTV(search))
    setSearch('');
  };

  return (
    <div className="header">
      <Link to="/">
        <div className="logo">Movie App</div>
      </Link>
      <div className="search-bar">
        <form onSubmit={submit}>
          <input
            type="text"
            id="movie"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search Movies or Shows..."
          />
          <button type="submit">
            <i className="fa fa-search"></i>
          </button>
        </form>
      </div>
      <div className="user-image">
        <img src={user} alt="user" />
      </div>
    </div>
  );
};

export default Header;
