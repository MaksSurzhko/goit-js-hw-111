/*import axios from 'axios';
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const searchForm = document.querySelector('.search-form');
const galleryList = document.querySelector('.gallery')

async function searchImg(searchTime) {
    try {
        const response = await axios.get('https://pixabay.com/api/', {
            params: {
                key: '35788801-dce36e820ecbf028522772f28',
                q: searchTime,
                image_type: 'photo',
                orientation: 'horizontal',
                safesearch: true,
            }
        })
        const images = response.data.hits.map(image => ({
            webformatURL: image.webformatURL,
            largeImageURL: image.largeImageURL,
            tags: image.tags,
            likes: image.likes,
            views: image.views,
            comments: image.comments,
            downloads: image.downloads,
        }));

        if (images.length === []) {
            Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.'); 
        } return images;
    } catch (error) {
        console.log(error);
    }
};


function photoInfo(image) {
    return `
        <div class="photo-card">
            <img src="${image.largeImageURL}" alt="${image.tags}" loading="lazy" />
            <div class="info">
                <p class="info-item">
                    <b>Likes:${image.likes}</b>
                </p>
                <p class="info-item">
                    <b>Views:${image.views}</b>
                </p>
                <p class="info-item">
                    <b>Comments:${image.comments}</b>
                </p>
                <p class="info-item">
                    <b>Downloads:${image.downloads}</b>
                </p>
            </div>
        </div>
    `;
} 

searchForm.addEventListener('submit', searchImages);

async function searchImages(event) {
    event.preventDefault();
    const searchQuery = event.target.elements.searchQuery.value.trim();
    if()
}*/



/*import axios from 'axios';
import Notiflix from 'notiflix';

const form = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');

form.addEventListener('submit', searchImages);

async function searchImages(event) {
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
      },
    });

    const images = response.data.hits;

    if (!images.length) {
      Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
      return;
    }

    gallery.innerHTML = '';

    images.forEach((image) => {
      const { webformatURL, largeImageURL, tags, likes, views, comments, downloads } = image;

      const card = `
        <div class="photo-card">
          <img src="${webformatURL}" alt="${tags}" loading="lazy" data-source="${largeImageURL}" />
          <div class="info">
            <p class="info-item">
              <b>Likes:</b> ${likes}
            </p>
            <p class="info-item">
              <b>Views:</b> ${views}
            </p>
            <p class="info-item">
              <b>Comments:</b> ${comments}
            </p>
            <p class="info-item">
              <b>Downloads:</b> ${downloads}
            </p>
          </div>
        </div>
      `;

      gallery.insertAdjacentHTML('beforeend', card);
    });
  } catch (error) {
    console.log(error);
  }
}

gallery.addEventListener('click', onImageClick);

function onImageClick(event) {
    if (event.target.nodeName !== 'IMG') {
        return;
    }

    const largeImageUrl = event.target.dataset.source;

    Notiflix.Modal.image(largeImageUrl);
}*/


/*import axios from 'axios';
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const lightbox = new SimpleLightbox('.gallery a', {
  captions: true,
    captionDelay: 250,
  captionsData: 'alt',
});

const form = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');

form.addEventListener('submit', async (event) => {
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
      },
    });

    const images = response.data.hits;

    if (!images.length) {
      Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
      return;
    }

    gallery.innerHTML = images.map((image) => {
      const { webformatURL, largeImageURL, tags, likes, views, comments, downloads } = image;

      return `
        <div class="photo-card">
          <img src="${webformatURL}" alt="${tags}" loading="lazy" data-source="${largeImageURL}" />
          <div class="info">
            <p class="info-item">
              <b>Likes:</b> ${likes}
            </p>
            <p class="info-item">
              <b>Views:</b> ${views}
            </p>
            <p class="info-item">
              <b>Comments:</b> ${comments}
            </p>
            <p class="info-item">
              <b>Downloads:</b> ${downloads}
            </p>
          </div>
        </div>
      `;
    }).join('');

  } catch (error) {
    console.log(error);
  }
});

gallery.addEventListener('click', (event) => {
  if (event.target.nodeName !== 'IMG') {
    return;
  }

});*/



import axios from 'axios';
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const lightbox = new SimpleLightbox('.gallery a', {
  captions: true,
  captionDelay: 250,
  captionsData: 'alt',
});

const form = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');

let currentPage = 1;
let searchQuery = '';

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  searchQuery = event.target.elements.searchQuery.value.trim();
  currentPage = 1;

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
        per_page: 40,
        page: currentPage,
      },
    });

    const images = response.data.hits;

    if (!images.length) {
      Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
      return;
    }

    gallery.innerHTML = images.map((image) => {
      const { webformatURL, largeImageURL, tags, likes, views, comments, downloads } = image;

      return `
        <div class="photo-card">
          <img src="${webformatURL}" alt="${tags}" loading="lazy" data-source="${largeImageURL}" />
          <div class="info">
            <p class="info-item">
              <b>Likes:</b> ${likes}
            </p>
            <p class="info-item">
              <b>Views:</b> ${views}
            </p>
            <p class="info-item">
              <b>Comments:</b> ${comments}
            </p>
            <p class="info-item">
              <b>Downloads:</b> ${downloads}
            </p>
          </div>
        </div>
      `;
    }).join('');

    if (response.data.totalHits > 40) {
      loadMoreBtn.style.display = 'block';
    } else {
      loadMoreBtn.style.display = 'none';
    }

  } catch (error) {
    console.log(error);
  }
});

gallery.addEventListener('click', (event) => {
  if (event.target.nodeName !== 'IMG') {
    return;
  }

});

loadMoreBtn.addEventListener('click', async () => {
  try {
    currentPage++;

    const response = await axios.get('https://pixabay.com/api/', {
      params: {
        key: '35788801-dce36e820ecbf028522772f28',
        q: searchQuery,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        per_page: 40,
        page: currentPage,
      },
    });

    const images = response.data.hits;

    if (!images.length) {
      Notiflix.Notify.warning("We're sorry, but you've reached the end of search results.");
      loadMoreBtn.style.display = 'none';
      return;
    }

    const newImages = images.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
      return `
        <div class="photo-card">
          <img src="${webformatURL}" alt="${tags}" loading="lazy" data-source="${largeImageURL}" />
          <div class="info">
            <p class="info-item">
              <b>Likes:</b> ${likes}
            </p>
            <p class="info-item">
              <b>Views:</b> ${views}
            </p>
            <p class="info-item">
              <b>Comments:</b> ${comments}
            </p>
            <p class="info-item">
              <b>Downloads:</b> ${downloads}
            </p>
          </div>
        </div>
      `;
    }).join('');

      gallery.insertAdjacentHTML('beforeend', newImages);
      
      new SimpleLightbox('.gallery a', {
      captions: true,
      captionDelay: 250,
      captionsData: 'alt',
    });

    if (response.data.totalHits <= currentPage * 40) {
      loadMoreBtn.style.display = 'none';
    }
  } catch (error) {
    console.log(error);
  }
});

