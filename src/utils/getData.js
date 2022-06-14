import API_KEY from '../ENV/env.js'
import {
	errorNode,
	trendingMoviesPreviewList,
	categoriesPreviewList,
	genericSection,
	movieDetailTitle,
	movieDetailDescription,
	movieDetailScore,
	movieDetailCategoriesList,
} from './getNode.js'

const URL_IMG_BASE = 'https://image.tmdb.org/t/p/w300'

const api = axios.create({
	baseURL: 'https://api.themoviedb.org/3/',
	headers: {
		'Content-Type': 'application/json;charset=utf-8',
	},
	params: {
		api_key: API_KEY,
	},
})

function requestError(error) {
	const msgError = `Error: ${error.message}`
	const nodeTextError = document.createTextNode(msgError)
	errorNode.appendChild(nodeTextError)
}

function addImageContainer({ nodeContainer, id, posterPath, title }) {
	const movieContainer = document.createElement('div')
	const movieImage = document.createElement('img')
	movieContainer.classList.add('movie-container')
	movieImage.classList.add('movie-img')
	if (posterPath !== null) movieImage.src = `${URL_IMG_BASE}${posterPath}`
	movieImage.alt = title
	movieImage.setAttribute('data-movieid', id)
	movieImage.setAttribute('data-moviename', title)
	movieContainer.appendChild(movieImage)
	nodeContainer.appendChild(movieContainer)
}

function addCategoriesContainer({ nodeContainer, id, title }) {
	const categoryContainer = document.createElement('div')
	const categoryTitle = document.createElement('h3')
	categoryContainer.classList.add('category-container')
	categoryTitle.setAttribute('data-categoryid', id)
	categoryTitle.setAttribute('data-categoryname', title)
	categoryTitle.classList.add('category-title')
	categoryTitle.id = `id${id}`
	const nodeTextCategory = document.createTextNode(title)
	categoryTitle.appendChild(nodeTextCategory)
	categoryContainer.appendChild(categoryTitle)
	nodeContainer.appendChild(categoryContainer)
}

const trendingMoviesPreview = async () => {
	try {
		const { status, data } = await api.get('trending/movie/day')
		if (status !== 200)
			throw new Error(`Error en la petición GET. Código HTTP: ${status}`)
		const movies = data.results
		movies.forEach(movie => {
			addImageContainer({
				nodeContainer: trendingMoviesPreviewList,
				id: movie.id,
				posterPath: movie.poster_path,
				title: movie.title,
			})
		})
	} catch (error) {
		requestError(error)
	}
}

const categoriesPreview = async () => {
	try {
		const { status, data } = await api.get('genre/movie/list')
		if (status !== 200)
			throw new Error(`Error en la petición GET. Código HTTP: ${status}`)
		const categories = data.genres
		categories.forEach(category => {
			addCategoriesContainer({
				nodeContainer: categoriesPreviewList,
				id: category.id,
				title: category.name,
			})
		})
	} catch (error) {
		requestError(error)
	}
}

const moviesByCategory = async id => {
	try {
		const { status, data } = await api.get('discover/movie', {
			params: {
				with_genres: id,
			},
		})
		if (status !== 200)
			throw new Error(`Error en la petición GET. Código HTTP: ${status}`)
		const movies = data.results
		movies.forEach(movie => {
			addImageContainer({
				nodeContainer: genericSection,
				id: movie.id,
				posterPath: movie.poster_path,
				title: movie.title,
			})
		})
	} catch (error) {
		requestError(error)
	}
}

const searchMoviesByText = async query => {
	try {
		const { status, data } = await api.get('search/movie', {
			params: {
				query,
			},
		})
		if (status !== 200)
			throw new Error(`Error en la petición GET. Código HTTP: ${status}`)
		const movies = data.results
		movies.forEach(movie => {
			addImageContainer({
				nodeContainer: genericSection,
				id: movie.id,
				posterPath: movie.poster_path,
				title: movie.title,
			})
		})
	} catch (error) {
		requestError(error)
	}
}

const trendingMovies = async () => {
	try {
		const { status, data } = await api.get('trending/movie/day')
		if (status !== 200)
			throw new Error(`Error en la petición GET. Código HTTP: ${status}`)
		const movies = data.results
		movies.forEach(movie => {
			addImageContainer({
				nodeContainer: genericSection,
				id: movie.id,
				posterPath: movie.poster_path,
				title: movie.title,
			})
		})
	} catch (error) {
		requestError(error)
	}
}

const movieById = async id => {
	try {
		const { status, data: movie } = await api.get(`movie/${id}`)
		if (status !== 200)
			throw new Error(`Error en la petición GET. Código HTTP: ${status}`)

		movieDetailTitle.innerText = movie.title
		movieDetailDescription.innerText = movie.overview
		movieDetailScore.innerText = movie.vote_average

		const categories = movie.genres
		categories.forEach(category => {
			addCategoriesContainer({
				nodeContainer: movieDetailCategoriesList,
				id: category.id,
				title: category.name,
			})
		})
	} catch (error) {
		requestError(error)
	}
}

export default {
	trendingMoviesPreview,
	categoriesPreview,
	moviesByCategory,
	searchMoviesByText,
	trendingMovies,
	movieById,
}
