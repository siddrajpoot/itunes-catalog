const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const axios = require('axios')

const app = express()

const port = process.env.PORT || 8080

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const fetchItunes = term =>
	new Promise(resolve =>
		resolve(axios.get(`https://itunes.apple.com/search?term=${term}&limit=100`))
	)

const handleMediaData = ({
	trackId,
	trackName,
	artworkUrl100,
	primaryGenreName,
	trackViewUrl
}) => {
	return {
		id: trackId,
		name: trackName,
		artwork: artworkUrl100.replace('100x100', '300x300'),
		genre: primaryGenreName,
		url: trackViewUrl
	}
}

app.get('/api', (req, res) => {
	const { term } = req.query

	if (!term) return res.status(400).send({ error: 'No search term given.' })

	fetchItunes(term)
		.then(data => {
			if (!data && !data.data) {
				return res.status(500).send({ error: 'Unable to fetch data.' })
			}

			const { resultCount, results } = data.data
			if (resultCount === 0) {
				return res.status(204).send({ error: 'No results found.' })
			}

			const mappedResults = {}

			results.forEach(media => {
				if (!media.kind) return

				const parsedMedia = handleMediaData(media)

				if (mappedResults[media.kind]) {
					mappedResults[media.kind] = [
						...mappedResults[media.kind],
						parsedMedia
					]
				} else {
					mappedResults[media.kind] = [parsedMedia]
				}
			})

			res.status(200).send(mappedResults)
		})
		.catch(error => {
			return res.status(500).send({ error })
		})
})

app.use((req, res, next) => {
	const error = new Error('Route not found')
	res.status(404)
	next(error)
})

app.use((error, req, res, next) => {
	res.status(error.status || 500)
	res.json({
		error: {
			message: error.message
		}
	})
})

app.listen(port, () => {
	console.log(`Server running on port: ${port}`)
})

module.exports = app
