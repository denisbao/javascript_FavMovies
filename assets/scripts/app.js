const addMovieModal = document.getElementById('add-modal')
const startAddMovieButton = document.querySelector('header button')
const modalBackdrop = document.getElementById('backdrop')
const cancelAddMovieButton = addMovieModal.querySelector('.btn--passive')
const confirmAddMovieButton = addMovieModal.querySelector('.btn--success')
const userInputs = addMovieModal.querySelectorAll('input')
const entryTextSection = document.getElementById('entry-text')
const deleteMovieModal = document.getElementById('delete-modal')

const movies = []

const toogleBackdrop = () => {
  modalBackdrop.classList.toggle('visible')
}

const updateUI = () => {
  if (movies.length === 0) {
    entryTextSection.style.display = 'block'
  } else {
    entryTextSection.style.display = 'none'
  }
}

const closeMovieDeletionModal = () => {
  toogleBackdrop()
  deleteMovieModal.classList.remove('visible')
}

const deleteMovieHandler = movieId => {
  let movieIndex = 0
  for (const movie of movies) {
    if (movie.id === movieId) {
      break
    }
    movieIndex++
  }
  movies.splice(movieIndex, 1)
  const listRoot = document.getElementById('movie-list')
  listRoot.children[movieIndex].remove('visible')
  closeMovieDeletionModal()
  updateUI()
}

const startDeleteMovieHandler = movieId => {
  deleteMovieModal.classList.add('visible')
  toogleBackdrop()
  const cancelDeletionButton = deleteMovieModal.querySelector('.btn--passive')
  let confirmDeletionButton = deleteMovieModal.querySelector('.btn--danger')

  //Substitui o elemento por um clone, removendo junto o EventListener (meh)
  confirmDeletionButton.replaceWith(confirmDeletionButton.cloneNode(true))
  confirmDeletionButton = deleteMovieModal.querySelector('.btn--danger')
  cancelDeletionButton.removeEventListener('click', closeMovieDeletionModal)

  cancelDeletionButton.addEventListener('click', closeMovieDeletionModal)
  confirmDeletionButton.addEventListener(
    'click',
    deleteMovieHandler.bind(null, movieId)
  )
}

const renderNewMovieElement = (id, title, img, rating) => {
  const newMovieElement = document.createElement('li')
  newMovieElement.className = 'movie-element'
  newMovieElement.innerHTML = `
    <div class="movie-element__image">
      <img src="${img}" alt="${title}">
    </div>
    <div class="movie-element__info">
      <h2>${title}</h2>
      <p>${rating} / 5 starts</p>
    </div>
  `
  newMovieElement.addEventListener(
    'click',
    startDeleteMovieHandler.bind(null, id)
  )
  const listRoot = document.getElementById('movie-list')
  listRoot.append(newMovieElement)
}

const closeMovieModal = () => {
  addMovieModal.classList.remove('visible')
}

const showMovieModal = () => {
  addMovieModal.classList.add('visible')
  toogleBackdrop()
}

const clearMovieInputs = () => {
  for (const input of userInputs) {
    input.value = ''
  }
}

const cancelAddMovieHandler = () => {
  closeMovieModal()
  toogleBackdrop()
  clearMovieInputs()
}

const backdropClickHandler = () => {
  closeMovieModal()
  closeMovieDeletionModal()
  clearMovieInputs()
}

const addMovieHandler = () => {
  const titleValue = userInputs[0].value
  const imageValue = userInputs[1].value
  const ratingValue = userInputs[2].value

  console.log(imageValue)

  if (
    titleValue.trim() === '' ||
    imageValue.trim() === '' ||
    ratingValue.trim() === '' ||
    +ratingValue < 1 ||
    +ratingValue > 5
  ) {
    alert('Please enter valid values (rating between 1 and 5)')
    return
  }

  const newMovie = {
    id: Math.random().toString(),
    title: titleValue,
    image: imageValue,
    rating: ratingValue,
  }

  movies.push(newMovie)
  console.log(movies)
  closeMovieModal()
  toogleBackdrop()
  clearMovieInputs()
  renderNewMovieElement(
    newMovie.id,
    newMovie.title,
    newMovie.image,
    newMovie.rating
  )
  updateUI()
}

startAddMovieButton.addEventListener('click', showMovieModal)
modalBackdrop.addEventListener('click', backdropClickHandler)
cancelAddMovieButton.addEventListener('click', cancelAddMovieHandler)
confirmAddMovieButton.addEventListener('click', addMovieHandler)
