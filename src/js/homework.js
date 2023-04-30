import axios from 'axios';
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const lightbox = new SimpleLightbox('.gallery a', { 
  captions: true,
  captionDelay: 250,
})

const searchForm = document.querySelector('.search-form');
const photo = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');
let page = 1;
let currentSearchQuery = '';

searchForm.addEventListener('submit', searchImg);
loadMoreBtn.addEventListener('click', loadMoreImages);

async function searchImg(event) {
  event.preventDefault();
  const searchQuery = event.target.elements.searchQuery.value.trim();
  if (!searchQuery) {
    return;
  }
  try {
    const response = await axios.get('https://pixabay.com/api/', {
      params: {
        key: '35788801-dce36e820ecbf028522772f28',
        q: searchQuery,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        per_page: 20,
        page: 1,
      },
    });
    const images = response.data.hits;
    const totalHits = response.data.totalHits;
    if (images.length === 0) {
      Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
      return;
    }
    currentSearchQuery = searchQuery;
    page = 1;
    const photoHTML = images.map(image => {
      const { webformatURL, largeImageURL, tags, likes, views, comments, downloads } = image;
      return `
        <div class="photo-card">
          <img src="${webformatURL}" alt="${tags}" data-source="${largeImageURL}" loading="lazy" />
          <div class="info">
            <p class="info-item"><b>Likes: ${likes}</b></p>
            <p class="info-item"><b>Views: ${views}</b></p>
            <p class="info-item"><b>Comments: ${comments}</b></p>
            <p class="info-item"><b>Downloads: ${downloads}</b></p>
          </div>
        </div>`;
    }).join('');
    photo.innerHTML = photoHTML;
    if (totalHits > 40) {
      loadMoreBtn.style.display = 'block';
    }
  } catch (error) {
    console.log(error);
  }
}

async function loadMoreImages() {
  try {
    const response = await axios.get('https://pixabay.com/api/', {
      params: {
        key: '35788801-dce36e820ecbf028522772f28',
        q: currentSearchQuery,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        per_page: 40,
        page: page + 1,
      },
    });
    const images = response.data.hits;
    const totalHits = response.data.totalHits;
    const photoHTML = images.map(image => {
      const { webformatURL, largeImageURL, tags, likes, views, comments, downloads } = image;
      return `
        <div class="photo-card">
          <img src="${webformatURL}" alt="${tags}" data-source="${largeImageURL}" loading="lazy" />
          <div class="info">
            <p class="info-item"><b>Likes: ${likes}</b></p>
            <p class="info-item"><b>Views: ${views}</b></p>
            <p class="info-item"><b>Comments: ${comments}</b></p>
            <p class="info-item"><b>Downloads: ${downloads}</b></p>
          </div>
        </div>`;
    }).join('');
    photo.insertAdjacentHTML('beforeend', photoHTML);
    if ((page * 40) >= totalHits) {
      loadMoreBtn.style.display = 'none';
      Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
    }
    page += 1;
  } catch (error) {
    console.log(error);
  }
}


