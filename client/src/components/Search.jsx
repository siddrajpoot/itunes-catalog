import React, { useState } from 'react'

const Search = props => {
	const [searchTerm, setSearchTerm] = useState(props.inputValue || '')

	const onSearchInput = e => {
		const { value } = e.target
		setSearchTerm(value)
	}

	const onSearchSubmit = e => {
		e.preventDefault()

		if (!!searchTerm) props.history.push(`/results/${searchTerm}`)
	}
	return (
		<div className="search">
			<form onSubmit={onSearchSubmit}>
				<input
					onChange={onSearchInput}
					defaultValue={props.inputValue}
					placeholder="Search..."
				/>
				<img src={require('../assets/search.png')} alt="search" />
			</form>
		</div>
	)
}

export default Search
