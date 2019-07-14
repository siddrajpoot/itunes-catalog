import React from 'react'
import Medium from './Medium'

export default function Media(props) {
	const { results, selectedGenre } = props
	let selectedMedia

	if (selectedGenre === 'liked') {
		selectedMedia = JSON.parse(localStorage.getItem('liked')) || []
	} else {
		selectedMedia = results[selectedGenre]
	}
	return (
		<div className={selectedMedia.length ? 'media' : 'no-results'}>
			{selectedMedia.length ? (
				selectedMedia.map(medium => <Medium key={medium.id} medium={medium} />)
			) : (
				<p>
					No liked media
					<span role="img" aria-label="emoji">
						💔
					</span>
				</p>
			)}
		</div>
	)
}
