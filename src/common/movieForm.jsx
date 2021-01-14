import React, { Fragment } from "react";
import Form from "./form";
import Joi from "joi-browser";

import { getMovie, saveMovie } from "./../services/fakeMovieService";
import { genres } from "./../services/fakeGenreService";
import { Redirect } from "react-router-dom";

// title
//genre
//numberInStock
//dailyRentalRate

class MovieForm extends Form {
  state = {
    data: {
      title: "",
      genre: "",
      numberInStock: "",
      dailyRentalRate: "",
      liked: false,
    },
    errors: {},
    invalidId: false,
  };
  componentWillMount() {
    const {
      match: { path, params },
    } = this.props;
    if (path === "/movies/:id") {
      if (!getMovie(params.id)) {
        this.setState({ invalidId: true });
      } else {
        const {
          title,
          genre: { name: genre },
          numberInStock,
          dailyRentalRate,
        } = getMovie(params.id);

        const data = {
          _id: params.id,
          title,
          genre,
          numberInStock,
          dailyRentalRate,
        };
        this.setState({ data });
      }
    }
  }

  schema = {
    liked: Joi.boolean(),
    _id: Joi.string(),
    title: Joi.string().required().label("Movie Name"),
    genre: Joi.string().required(),
    numberInStock: Joi.number()
      .required()
      .min(0)
      .max(100)
      .label("Number In Stock"),
    dailyRentalRate: Joi.number().min(0).max(10).required().label("Rate"),
  };

  handleSave = () => {
    // Navigate to Movies
    saveMovie(this.state.data);
  };

  doSubmit = () => {
    this.handleSave();
    this.props.history.replace("/movies");
  };
  render() {
    const { invalidId } = this.state;
    return (
      <Fragment>
        {invalidId && <Redirect to="/not-found" />}
        <div className="jumbroton">
          <h5>Movie Form : {this.props.match.params.id}</h5>
          <form onSubmit={this.handleSubmit}>
            {this.renderInput("title", "Movie Name")}
            {this.renderSelectGroup("genre", "Genre", genres)}
            {this.renderInput("numberInStock", "Number In Stock", "number")}
            {this.renderInput("dailyRentalRate", "Rate")}
            {/* <button onClick={this.handleSave} className="btn btn-primary">
            Save
          </button> */}
            {this.renderButton("Save")}
          </form>
        </div>
      </Fragment>
    );
  }
}

export default MovieForm;
