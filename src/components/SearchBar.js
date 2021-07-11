import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';

const SearchForm = (props) => {
    //State to hold the search query
    // const [searchQuery, setSearchQuery] = React.useState({searchterm: "",});
    const [searchQuery, setSearchQuery] = React.useState(null);
    //Updates searchQuery when we type into the form
    const handleChange = (event) => {
        setSearchQuery(event.target.value)
        // console.log(setSearchQuery)
        console.log(searchQuery)
    }
    const handleSubmit = (event) => {
        //use the event object to detect key and value to update
        event.preventDefault();
        //use the search query to pass query to songSearch prop, in new page output
        props.songSearch(searchQuery)

    }


    return (

        <div>
            <form className = "field" onSubmit={handleSubmit}>
                <input className = "input"
                    type = "text"
                    name = "searchterm"
                    onChange={handleChange}
                    value = {searchQuery}
                    />
                {/* <Link to = '/search'> */}
                <input className = "button is-info" type = "submit" value = "submit" />
                {/* </Link> */}
            </form>
        </div>

    )
}

export default SearchForm;