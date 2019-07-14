import React from 'react'

class Medium extends React.Component {
	state = {
		hovering: false
	}

	componentDidMount() {
		const { medium } = this.props
		let likedLocalStorage = JSON.parse(localStorage.getItem('liked'))

		if (!likedLocalStorage) return

		const isLiked = likedLocalStorage.findIndex(item => item.id === medium.id)
		if (isLiked === -1) {
			this.setState({ isLiked: false })
		} else {
			this.setState({ isLiked: true })
		}
	}

	handleLike = () => {
		const { medium } = this.props

		let likedLocalStorage = JSON.parse(localStorage.getItem('liked'))

		if (this.state.isLiked) {
			const filteredLikedLocalStorage = likedLocalStorage.filter(
				item => item.id !== medium.id
			)
			this.setState({ isLiked: false })
			return localStorage.setItem(
				'liked',
				JSON.stringify(filteredLikedLocalStorage)
			)
		}

		if (!likedLocalStorage) {
			likedLocalStorage = [medium]
		} else {
			likedLocalStorage = [...likedLocalStorage, medium]
		}
		this.setState({ isLiked: true })
		localStorage.setItem('liked', JSON.stringify(likedLocalStorage))
	}

	renderLike = () => {
		if (this.state.isLiked) {
			return (
				<img
					src={require('../assets/heart-filled.png')}
					className="heart liked"
					onClick={this.handleLike}
					alt="heart-filled"
				/>
			)
		} else if (this.state.hovering) {
			return (
				<img
					src={require('../assets/heart-outline.png')}
					className="heart like"
					onClick={this.handleLike}
					alt="heart-outline"
				/>
			)
		}
	}

	render() {
		const { name, artwork, genre, url } = this.props.medium

		return (
			<div
				className="medium"
				onMouseEnter={() => this.setState({ hovering: true })}
				onMouseLeave={() => this.setState({ hovering: false })}
			>
				{this.renderLike()}
				<a target="_blank" rel="noopener noreferrer" href={url}>
					<img src={artwork} alt={name} className="artwork" />
					<div className="name">{name}</div>
					<div className="genre">{genre}</div>
				</a>
			</div>
		)
	}
}

export default Medium
