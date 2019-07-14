import React from 'react'
import '../styles/App.scss'

import { Switch, Route } from 'react-router-dom'
import Home from './Home'
import Results from './Results'

const App = () => {
	return (
		<div className="app">
			<Switch>
				<Route path="/" exact component={Home} />
				<Route path="/results/:term" component={Results} />
				<Route component={Home} />
			</Switch>
		</div>
	)
}

export default App
