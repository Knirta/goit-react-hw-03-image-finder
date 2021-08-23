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
    const isSearchQueryChanged =
      prevState.searchQuery !== this.state.searchQuery;
    const isPageChanged = prevState.page !== this.state.page;

    if (isSearchQueryChanged || isPageChanged) {
      this.setState({ loading: true, showButton: false });

      imagesAPI
        .fetchImages(this.state.searchQuery, this.state.page)
        .then((response) => response.json())
        .then(({ hits }) => {
          if (hits.length === 0) {
            if (isSearchQueryChanged) {
              return toast.info("Enter another query");
            } else {
              return toast.info("There ara no more images, enter new query");
            }
          }

          if (hits.length === 12) {
            this.setState({ showButton: true });
          } else {
            this.setState({ showButton: false });
          }

          this.setState(({ images }) => {
            return { images: [...images, ...hits] };
          });

          if (isPageChanged) {
            this.smoothScroll();
          }
        })
        .catch((error) => this.setState({ error }))
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
    const { error, images, loading, showButton, openModal, modalData } =
      this.state;

    return (
      <>
        <SearchBar onSubmit={this.handleFormSubmit} />

        {error && <p>{error.message}</p>}

        <ImageGallery images={images} openModal={this.openModal} />

        {loading && (
          <LoaderContainer>
            <Loader type="ThreeDots" color="#00BFFF" height={80} width={80} />
          </LoaderContainer>
        )}

        {showButton && !loading && (
          <Button text="Load more" onClick={this.handleLoadMoreButton} />
        )}

        {openModal && (
          <Modal
            url={modalData.url}
            desc={modalData.desc}
            closeModal={this.closeModal}
          />
        )}

        <ToastContainer autoClose={3000} />
      </>
    );
  }
}

export default App;
