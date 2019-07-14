import React from 'react'

const Header = props => {
	const handleHeaderClick = () => {
		props.history.push('/')
	}
	return (
		<div className="header">
			<h1 onClick={handleHeaderClick}>Catalog</h1>
		</div>
	)
}

export default Header
