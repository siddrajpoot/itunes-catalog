import React from 'react'
import axios from 'axios'
import LoadingBar from 'react-top-loading-bar'

import Header from './Header'
import Search from './Search'
import Genres from './Genres'
import Media from './Media'

class Results extends React.Component {
	state = {
		results: null
	}

	componentDidMount() {
		this.fetchResults(this.props.match.params.term)
	}

	componentDidUpdate(prevProps) {
		if (prevProps.match.params.term !== this.props.match.params.term) {
			this.fetchResults(this.props.match.params.term)
		}
	}

	fetchResults = term => {
		this.LoadingBar.continousStart()
		axios.get(`/api/?term=${term}`).then(data => {
			this.handleResults(data)
			this.LoadingBar.complete()
		})
	}

	handleResults = ({ data, status }) => {
		if (status === 200) {
			this.setState({ results: data, selectedGenre: Object.keys(data)[0] })
		}
	}

	handleGenreChange = genre => {
		this.setState({ selectedGenre: genre })
	}

	render() {
		const { results, selectedGenre } = this.state
		return (
			<div className="results">
				<LoadingBar onRef={ref => (this.LoadingBar = ref)} color="#f86972" />
				<div className="nav">
					<Header history={this.props.history} />
					<Search
						history={this.props.history}
						inputValue={this.props.match.params.term}
					/>
				</div>
				<div className="content">
					{!!results && (
						<React.Fragment>
							<Genres
								results={results}
								selectedGenre={selectedGenre}
								onGenreChange={this.handleGenreChange}
							/>
							<Media results={results} selectedGenre={selectedGenre} />
						</React.Fragment>
					)}
				</div>
			</div>
		)
	}
}

export default Results
