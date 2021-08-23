import React, { Component } from "react";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import s from "./SearchBar.module.css";

class SearchBar extends Component {
  static defaultProps = {
    initialValue: "",
  };

  static propTypes = { onSubmit: PropTypes.func.isRequired };

  state = {
    value: this.props.initialValue,
  };

  handleOnChange = (e) => {
    this.setState({ value: e.currentTarget.value });
  };

  handleOnSubmit = (e) => {
    e.preventDefault();
    if (this.state.value === "") {
      return toast.info("Enter query");
    }
    this.props.onSubmit(this.state.value);
    this.reset();
  };

  reset = () => {
    this.setState({ value: "" });
  };

  render() {
    return (
      <header className={s.Searchbar}>
        <form className={s.SearchForm} onSubmit={this.handleOnSubmit}>
          <button type="submit" className={s.SearchForm__button}>
            <span className={s.SearchForm__buttonLabel}>Search</span>
          </button>

          <input
            value={this.state.value}
            className={s.SearchForm__input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleOnChange}
          />
        </form>
      </header>
    );
  }
}

export default SearchBar;
