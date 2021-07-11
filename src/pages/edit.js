import React, {useState, useEffect} from 'react';
import Axios from 'axios'
import '../index.css';  
import { NavLink as Link }from 'react-router-dom';

function Edit () {

    const [infoArray, setInfoArray] = React.useState(null)
    let getinfo = async() => {
        console.log(localStorage.getItem('SessionEmail'))

        let response =  await fetch (' https://lyrios21.herokuapp.com/favsong')


        let data = await response.json();
        const sessionData = []
        data.forEach((value)=>{
            if(value.email === localStorage.getItem('SessionEmail')){
                sessionData.push(value)
            }
        })

        setInfoArray(sessionData)
        
        return console.log(sessionData)
    }
    const editFavorite = async (searchQuery) => {
    // console.log(data[0]._id)
    console.log(infoArray[0]._id)
    // await Axios.put(`http://localhost:4000/favsong/edit/${infoArray[0]._id}`, {whyFavorite: 'No Reason'})
    fetch(` https://lyrios21.herokuapp.com/favsong/edit/${infoArray[0]._id}`, {
        method: 'PUT',
        body: JSON.stringify({
            whyFavorite: searchQuery
  
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        },
    })
    return console.log('Updating Why I Love This Song')

    }
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
        editFavorite(searchQuery)

    }
    React.useEffect(()=>{
        getinfo()
        console.log('running use effect')
    },[])
    return(
        <div>
        <br/>

        <h1>Let Us Know Why You Love The Song Below :)</h1>
        <br/>
        {/* onSubmit={handleSubmit} */}
         <form className = "field" onSubmit={handleSubmit} action='/show' >
                <input className = "input"
                    type = "text"
                    name = "searchterm"
                    onChange={handleChange}
                    value = {searchQuery}
                />
                   
                {/* <NavLink to='/show'>
                    <input className = "button is-info" type = "submit" value = "submit" /> 
                </NavLink> */}
            <input className = "button is-info" type = "submit" value = "submit" /> 
   
                {/* </Link> */}
            </form>
         <a href = '/show'><button className = "button is-link is-hovered" >Navigate Back to Your Favorite Song!</button></a>

        </div>
    )
}

export default Edit