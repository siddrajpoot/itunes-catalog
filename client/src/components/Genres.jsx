import React from 'react'

export default function Genres(props) {
	const { results, selectedGenre, onGenreChange } = props

	const genres = Object.keys(results)
	genres.push('liked')

	return (
		<div className="genres">
			{genres.map(genre => (
				<p
					className={`genre ${selectedGenre === genre ? 'active' : ''}`}
					key={genre}
					onClick={() => onGenreChange(genre)}
				>
					{genre}
				</p>
			))}
		</div>
	)
}
