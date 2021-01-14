import React, { Component } from "react";

import MoviesTable from "./moviesTable";
import ListGroup from "../common/listGroup";
import Pagination from "../common/pagination";

import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/genreService";
import { paginate } from "../utils/paginate";

import _ from "lodash";
import { Link } from "react-router-dom";
import SearchBox from "./../common/searchBox";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    currentPage: 1,
    pageSize: 4,
    sortColumn: { path: "title", order: "asc" },
    query: "",
  };

  getPagedData = () => {
    const {
      movies: allMovies,
      query: searchQuery,
      pageSize,
      currentPage,
      selectedGenre,
      sortColumn,
    } = this.state;
    let filtered =
      selectedGenre && selectedGenre._id
        ? allMovies.filter((m) => m.genre._id === selectedGenre._id)
        : allMovies;

    if (searchQuery) {
      filtered = allMovies.filter((movie) =>
        movie.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    }

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const movies = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, movies };
  };

  componentDidMount() {
    const genres = [{ _id: "", name: "All Genres" }, ...getGenres()];
    this.setState({ movies: getMovies(), genres });
  }

  handleDelete = (movie) => {
    const movies = this.state.movies.filter((m) => m !== movie);
    this.setState({ movies });
  };
  handleSearch = (query) => {
    this.setState({ query, currentPage: 1, selectedGenre: null });
  };

  handleLike = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleGenreSelect = (genre) => {
    const selectedGenre = genre;
    this.setState({ selectedGenre, currentPage: 1, query: "" });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  render() {
    const {
      genres,
      pageSize,
      currentPage,
      selectedGenre,
      sortColumn,
      query,
    } = this.state;
    const { totalCount, movies } = this.getPagedData();
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-2">
            <ListGroup
              items={genres}
              selectedItem={selectedGenre}
              onItemSelect={this.handleGenreSelect}
            />
          </div>
          <div className="col">
            <div className="container mt-2">
              <Link className="btn btn-primary" to="/movies/new">
                New Movie
              </Link>
              <SearchBox
                value={query}
                onChange={(e) => this.handleSearch(e.currentTarget.value)}
              />
              <p className="m-2">
                {totalCount
                  ? `Showing ${totalCount} movies in the database`
                  : `There are no movies in the database`}
              </p>
            </div>

            <MoviesTable
              movies={movies}
              sortColumn={sortColumn}
              onLike={this.handleLike}
              onDelete={this.handleDelete}
              onSort={this.handleSort}
            />
            <Pagination
              itemsCount={totalCount}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={this.handlePageChange}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Movies;
