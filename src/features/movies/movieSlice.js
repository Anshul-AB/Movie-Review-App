import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import movieApi from "../../common/apis/movieApi";
import { APIKey } from "../../common/apis/MovieApiKey";

const initialState = {
  moviesList: {},
  tvList: {},
  moviesDetails: {},
  tvDetails: {},
  selectMovieOrShow: {},
};

// Fetch Movies
export const fetchAsyncMovies = createAsyncThunk(
  "movies/fetchAsyncMovies",
  async (searchText) => {
    const response = await movieApi
      .get(`/search/movie?query=${searchText}&${APIKey}`)
      .catch((err) => {
        console.log("error :", err);
      });
    return response.data;
    // console.log( response);
  }
);

// Fetch TV shows
export const fetchAsyncTV = createAsyncThunk(
  "movies/fetchAsyncTV",
  async (searchText) => {
    const response = await movieApi
      .get(`/search/tv?query=${searchText}&${APIKey}`)
      .catch((err) => {
        console.log("error :", err);
      });
    return response.data;
  }
);

// Details of Movies
export const fetchAsyncMovieDetails = createAsyncThunk(
  "movies/fetchAsyncMovieDetails",
  async (id) => {
    const response = await movieApi
      .get(`/movie/${id}?${APIKey}`)
      .catch((err) => {
        console.log("error :", err);
      });
    return response.data;
  }
);

// Details of TV shows
export const fetchAsyncTvDetails = createAsyncThunk(
  "movies/fetchAsyncTvDetails",
  async (id, text) => {
    // const formattedTitle = text.replace(/\s+/g, "-").toLowerCase();

    const response = await movieApi
      .get(`/tv/${id}?${APIKey}`)
      .catch((err) => {
        console.log("error :", err);
      });
    return response.data;
  }
);

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    removeSelectedMovieOrShow: (state) => {
      state.selectMovieOrShow = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAsyncMovies.pending, () => {
        console.log("Pending...");
      })
      .addCase(fetchAsyncMovies.fulfilled, (state, action) => {
        state.moviesList = action.payload;
        console.log("Fetching Successful");
      })
      .addCase(fetchAsyncMovies.rejected, () => {
        console.log("Rejected!");
      })

      // fetch tv shows
      .addCase(fetchAsyncTV.fulfilled, (state, action) => {
        state.tvList = action.payload;
        console.log("Fetching Successful");
      })

      // Movie Details
      .addCase(fetchAsyncMovieDetails.fulfilled, (state, action) => {
        state.moviesDetails = action.payload;
        console.log("Fetching Successful");
      })

      // Tv shows details
      .addCase(fetchAsyncTvDetails.fulfilled, (state, action) => {
        state.tvDetails = action.payload;
        console.log("Fetching Successful");
      });
  },
});

//export each reducer manually
export const { removeSelectedMovieOrShow } = movieSlice.actions;

//export all movies/TV -- state.(name of slice).(property which we want to get)
export const getAllMovies = (state) => state.movies.moviesList;
export const getAllTvShows = (state) => state.movies.tvList;
export const getAllMovieDetails = (state) => state.movies.moviesDetails;
export const getAllTvDetails = (state) => state.movies.tvDetails;

// export slice
export default movieSlice.reducer;
