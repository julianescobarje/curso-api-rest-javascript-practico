const API_URL = 'https://api.themoviedb.org/3'
const IMAGES_W300_URL = 'https://image.tmdb.org/t/p/w300'

async function getTrendingMoviesPreview() {
	const res = await fetch(`${API_URL}/trending/movie/day?api_key=${API_KEY}`)
	const data = await res.json()

	const movies = data.results

	console.log({ data, movies })

	const trendingPreviewMoviesContainer = document.querySelector(
		'#trendingPreview .trendingPreview-movieList'
	)

	movies.forEach(movie => {
		const movieContainer = document.createElement('div')
		movieContainer.classList.add('movie-container')

		const movieImg = document.createElement('img')
		movieImg.classList.add('movie-img')
		movieImg.setAttribute('alt', movie.title)
		movieImg.setAttribute('src', `${IMAGES_W300_URL}${movie.poster_path}`)

		movieContainer.appendChild(movieImg)
		trendingPreviewMoviesContainer.appendChild(movieContainer)
	})
}

getTrendingMoviesPreview()
