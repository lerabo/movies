const addMovieModal = document.getElementById('add-modal');
const startAddMovieButton = document.querySelector('header button');
const backdrop = document.getElementById('backdrop');
const cancelBtn = addMovieModal.querySelector('.btn--passive');
const addBtn = cancelBtn.nextElementSibling;
const userInputs = addMovieModal.querySelectorAll('input');
const entryTextSection = document.getElementById('entry-text');
const deleteMovieModal = document.getElementById('delete-modal');
const movies = [];

const toggleBackdrop = () => {
    backdrop.classList.toggle('visible');
  };

const updateUI = () => {
    if (movies.length === 0){
        entryTextSection.style.display = 'block';
    } else {
        entryTextSection.style.display = 'none';
    }
};

const closeMovieDeletionModal = () => {
    toggleBackdrop();
    deleteMovieModal.classList.remove('visible');
  };

const deleteMovie = (movieId) => {
    let movieIndex=0;
    for(const movie of movies){
        if(movie.id === movieId){
            break;
        }
        movieIndex++;
    }
    movies.splice(movieIndex, 1);
    const listRoot = document.getElementById('movie-list');
    listRoot.children[movieIndex].remove();
    deleteMovieModal.classList.remove('visible');
    closeMovieDeletionModal();
    updateUI();
};
  
  const deleteMovieHandler = movieId => {
    deleteMovieModal.classList.add('visible');
    toggleBackdrop();
    const cancelConfirmBtn = deleteMovieModal.querySelector('.btn--passive');
    let confirmBtn = deleteMovieModal.querySelector('.btn--danger');

    confirmBtn.replaceWith(confirmBtn.cloneNode(true));

    confirmBtn = deleteMovieModal.querySelector('.btn--danger');

    cancelConfirmBtn.removeEventListener('click',closeMovieDeletionModal);
    cancelConfirmBtn.addEventListener('click',closeMovieDeletionModal);
    confirmBtn.addEventListener('click', deleteMovie.bind(null, movieId));
    // deleteMovie(movieId);
  };

const renderNewMovie = (id, title, image, rating) => {
    const newMovieElement = document.createElement('li');
    newMovieElement.className = 'movie-element';
    newMovieElement.innerHTML = `
    <div class = "movie-element__image">
        <img src ="${image}" alt = "${title}">
    </div>
    <div class = "movie-element__info">
        <h2>${title}</h2>
        <p>${rating}/5</p>
    </div>
    `;
    newMovieElement.addEventListener('click', deleteMovieHandler.bind(null, id));
    const listRoot = document.getElementById('movie-list');
    listRoot.append(newMovieElement);
};
  
  const closeMovieModal = () => {
    addMovieModal.classList.remove('visible');
    toggleBackdrop();
  };
  
  const showMovieModal = () => {
    addMovieModal.classList.add('visible');
    toggleBackdrop();
  };

  const clearInput = () => {
      for(const usrInput of userInputs){
          usrInput.value = '';
      }
  };

  const cancelClick = () => {
      closeMovieModal();
      clearInput();
  };
  
  const addMovie = () => {
      const titleValue = userInputs[0].value;
      const imageUrlValue = userInputs[1].value;
    const ratingValue = userInputs[2].value;

    if(
        titleValue.trim() === '' ||
        imageUrlValue === '' || 
        ratingValue === ''||
        +ratingValue < 1 ||
        +ratingValue > 5) 
        {
            alert('Please enter valid values (rating between 1 and 5).');
            return;
        }
        
        const newMovie = {
            id: Math.random().toString(),
            title: titleValue,
            image: imageUrlValue,
            rating: ratingValue
        };
        
        movies.push(newMovie);
        console.log(movies);
        closeMovieModal();
        clearInput();
        renderNewMovie(
          newMovie.id,
          newMovie.title,
          newMovie.image,
          newMovie.rating
        );
        updateUI();
      };
      
      const backdropClick = () => {
        closeMovieModal();
        closeMovieDeletionModal();
        toggleBackdrop();
        clearInput();
      };

startAddMovieButton.addEventListener('click', showMovieModal);
backdrop.addEventListener('click', backdropClick);
cancelBtn.addEventListener('click', cancelClick);
addBtn.addEventListener('click', addMovie);
