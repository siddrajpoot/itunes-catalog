import React from 'react'
import Search from './Search'
import Header from './Header'

const Home = props => {
	return (
		<div className="home">
			<Header history={props.history} />
			<div className="sub-header">Search for any kind of iTunes media!</div>
			<Search history={props.history} />
		</div>
	)
}

export default Home
