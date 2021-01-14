import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./input";
import SelectGroup from "./selectGroup";

class Form extends Component {
  state = {
    data: {},
    errors: {},
  };

  createErrObjectFromJoi = (joiObject) => {
    const errorsInArray = joiObject.error.details.map((error) => {
      return [error.path[0], error.message];
    });
    const errors = Object.fromEntries(errorsInArray);
    return errors;
  };

  validate = () => {
    const { data } = this.state;
    const options = { abortEarly: false };
    const result = Joi.validate(data, this.schema, options);

    if (!result.error) return null;

    const errors = this.createErrObjectFromJoi(result);
    this.setState({ errors: errors || {} });
  };

  validateProperty = (input) => {
    const errors = { ...this.state.errors };
    const validationResult = Joi.validate(input.value, this.schema[input.name]);

    if (validationResult.error) {
      errors[input.name] = validationResult.error.message;
    } else {
      delete errors[input.name];
    }
    this.setState({ errors });
  };

  handleChange = ({ currentTarget: input }) => {
    this.validateProperty(input);
    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data });
  };

  handleSubmit = (e) => {
    this.validate();
    e.preventDefault();

    this.doSubmit();
  };

  isDisabled = () => {
    const { data } = this.state;
    const res = Joi.validate(data, this.schema, { abortEarly: false });
    return !!res.error;
  };
  renderButton = (label) => {
    return (
      <button disabled={this.isDisabled()} className="btn btn-primary">
        {label}
      </button>
    );
  };
  renderInput = (name, label, type = "text") => {
    const { data, errors } = this.state;
    return (
      <Input
        value={data[name]}
        label={label}
        name={name}
        onChange={this.handleChange}
        type={type}
        error={errors[name]}
      />
    );
  };
  renderSelectGroup = (name, label, list) => {
    const { data } = this.state;
    return (
      <SelectGroup
        value={data[name]}
        onChange={this.handleChange}
        name={name}
        label={label}
        data={list}
      />
    );
  };
}

export default Form;
