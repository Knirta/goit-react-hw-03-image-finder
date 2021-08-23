const BASE_URL = "https://pixabay.com/api/";
const API_KEY = "21680685-e17dbc926fcd99c5b67998b00";

const fetchImages = (searchQuery, page = 1) => {
  return fetch(
    `${BASE_URL}?q=${searchQuery}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );
};

const api = { fetchImages };

export default api;
