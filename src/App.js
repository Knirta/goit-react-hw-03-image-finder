import React, { Component } from "react";
import { ToastContainer, toast } from "react-toastify";
import SearchBar from "./components/SearchBar";
import Loader from "react-loader-spinner";
import ImageGallery from "./components/ImageGallery";
import Button from "./components/Button";
import LoaderContainer from "./components/LoaderContainer";
import Modal from "./components/Modal";
import imagesAPI from "./services/images-api";
import "react-toastify/dist/ReactToastify.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

class App extends Component {
  state = {
    searchQuery: "",
    firtsLoading: false,
    loading: false,
    images: [],
    page: 1,
    showButton: false,
    error: null,
    openModal: false,
    modalData: {
      url: "",
      desc: "",
    },
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchQuery !== this.state.searchQuery) {
      this.setState({ firstLoading: true, showButton: false });
      imagesAPI
        .fetchImages(this.state.searchQuery, this.state.page)
        .then((response) => response.json())
        .then(({ hits }) => {
          if (hits.length === 0) {
            return toast.info("Enter another query");
          }
          if (hits.length === 12) {
            this.setState({ showButton: true });
          }
          this.setState({ images: [...hits] });
        })
        .catch((error) => this.setState({ error }))
        .finally(() => this.setState({ firstLoading: false }));
    }

    if (prevState.page !== this.state.page && this.state.page !== 1) {
      this.setState({ loading: true });
      imagesAPI
        .fetchImages(this.state.searchQuery, this.state.page)
        .then((response) => response.json())
        .then(({ hits }) => {
          if (hits.length === 0) {
            return toast.info("There ara no more images, enter new query");
          }
          if (hits.length === 12) {
            this.setState({ showButton: true });
          } else {
            this.setState({ showButton: false });
          }
          this.setState(({ images }) => {
            return { images: [...images, ...hits] };
          });
          this.smoothScroll();
        })
        .catch((error) => {
          this.setState({ error });
        })
        .finally(() => this.setState({ loading: false }));
    }
  }

  smoothScroll = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  handleFormSubmit = (query) => {
    this.setState({ searchQuery: query, page: 1, images: [] });
  };

  handleLoadMoreButton = (e) => {
    this.setState(({ page }) => ({ page: page + 1 }));
  };

  openModal = (e) => {
    const { url, desc } = e.currentTarget.dataset;
    this.setState({ openModal: true, modalData: { url, desc } });
  };

  closeModal = () => {
    this.setState({ openModal: false });
  };

  render() {
    return (
      <>
        <SearchBar onSubmit={this.handleFormSubmit} />
        {this.state.error && <p>{this.state.error.message}</p>}
        <ImageGallery images={this.state.images} openModal={this.openModal} />
        {this.state.firstLoading && (
          <LoaderContainer>
            <Loader type="ThreeDots" color="#00BFFF" height={80} width={80} />
          </LoaderContainer>
        )}

        {this.state.loading && (
          <LoaderContainer>
            <Loader type="ThreeDots" color="#00BFFF" height={80} width={80} />
          </LoaderContainer>
        )}
        {this.state.showButton && !this.state.loading && (
          <Button text="Load more" onClick={this.handleLoadMoreButton} />
        )}
        {this.state.openModal && (
          <Modal
            url={this.state.modalData.url}
            desc={this.state.modalData.desc}
            closeModal={this.closeModal}
          />
        )}

        <ToastContainer autoClose={3000} />
      </>
    );
  }
}

export default App;
