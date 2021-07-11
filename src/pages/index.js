import React, {useState, useEffect} from 'react';
import Axios from 'axios'
import YouTube from 'react-youtube'
import SearchBar from '../components/SearchBar'
import SearchOutput from '../components/SearchOutput'
import '../index.css';  


function GetSearch () {
	console.log(localStorage.getItem('SessionEmail'))
    
//YouTubeAPI Call
    const baseURL = 'https://www.googleapis.com/youtube/v3';
    const search = '/search?part=snippet';
    const maxResult = '&maxResults=1';
    const keyWord = '&q=rihanna';
    const type = '&type=video';
    //API Key 1
    const key = '&key=AIzaSyD5inzevVk7CDg0ipn9yBTXWP_TtekfF0A'; 
    // API Key 2
    // const key = '&key=AIzaSyAjtiGq13vuyxMjQfPS7Ngj0Mny-7ol3GM'
    //API Key 3
    // const key = '&key=AIzaSyAlEKircfin7Ratd0qMcJT50yknQLgk67c';
    const topicId = '&topicId=04rlf';

    
    const [youtubeData, setYoutubeData] = React.useState(null)
    const [searchData, setSearchData] = React.useState(null)
    const getYoutubeData = async (searchTerm) => {
        const response = await Axios.get(
            `${baseURL}${search}${maxResult}${type}${key}${topicId}&q=${searchTerm}`
        )
        setYoutubeData(response.data)
        // setSearchData(response.data)
        // const youtubeFetch = await response.json();
        console.log(response.data)
        // SearchOutput(response.data)
        return 'response'

    }

    const artist = ['beyonce','sza','ariana grande','jay-z','rihanna','cold play','snoop dogg','bruno mars','marc anthony','bad bunny','incubus',
    'tiesto','billy joel','john mayer','el alfa','omega','celia cruz','cardi b','miguel','leon bridges']
    let random = Math.round(Math.random()*artist.length)
    let randomArtist = artist[random]

    const randomVideo = async (searchTerm) => {

        const response = await Axios.get(
            `${baseURL}${search}${maxResult}${type}${key}${topicId}&q=${randomArtist}`
        )
        console.log(response.data)
        setYoutubeData(response.data)
    }
//Lyrics API Call - Happi.dev/docs/music
const [lyricsData, setLyricsData] = React.useState(null)
const baseLyricsURL = "https://api.happi.dev/v1/music?";
// const lyricsQ = "q=" + randomArtist
const hasLyrics = "&lyrics=1";
const limit = "&limit=";
const lyricsType = "&type=";
//api key 1
// const apiLyricsKey = "&apikey=6d400baq5E0tR7e8ItaBRyijAyJVpD9qLDYxcli0AwBHLoMayAPtZaNr";   
//api key 2
// const apiLyricsKey = "&apikey=78e089Xdo4n4bW6uzrz5HaYLJ3E801KK7uQ0LQlJFsZ7ROy1mr0ZDyjR"; 
//api Key 3
const apiLyricsKey = "&apikey=8dcb582VuyRPwwIk4wEDUbJ5xTmiQvRE7QUfgBFrTJGVIkcmYqH4r9Nh"; 


    const getLyricsArray = async (searchTerm) => {
        try{
        const response = await Axios.get(
        `${baseLyricsURL}${limit}${apiLyricsKey}${lyricsType}${hasLyrics}&q=${searchTerm}`
        )
        console.log(searchTerm)
        console.log(response.data)
        console.log(response.data.result[0].api_lyrics)
        getLyricsData(response.data.result[0].api_lyrics)
        } catch (error) {
            console.log('no lyrics found')
            getYoutubeData(searchTerm)
            setLyricsData(null)
        }
    }
    
    const getLyricsData = async (data) => {
        console.log(data)
        const response = await Axios.get(
            data + '?' + apiLyricsKey
        )
        console.log(response.data)
        console.log(response.data.result.lyrics)
        console.log(response.data.result.track + ' ' + response.data.result.artist )
        setLyricsData(response.data)
        getYoutubeData(response.data.result.track + ' ' + response.data.result.artist)
    }

    React.useEffect(()=>{
        getLyricsArray(randomArtist)
        // randomVideo(randomArtist)
        console.log('running use effect')
    },[])


    return(
        <div>
        <br/>
            <div className = "indexTop">
                <h1 className = "heading">Welcome to Lyrios</h1>
                <h3>A True Music Experience. Submit Your Song Search Below</h3>
            </div>
            <SearchBar songSearch={getLyricsArray}/>
            {/* Adding && to the line below checks if there is data in youtubeData */}
                  
            { youtubeData  && <SearchOutput youtubeData={youtubeData} lyricsData={lyricsData} />}
            {/* <div className = "videoItem">
            <div>{youtubeData ? <><h4 className ="videoTitle">{youtubeData.items[0].snippet.title}</h4>  <YouTube videoId= {youtubeData.items[0].id.videoId}/> </> :
            'No YouTube data was gathered'}</div>
            <button className = "button is-info">Save to My Playlist</button>
            <br/>
            <p>{lyricsData ? <p className="lyrics">{lyricsData}</p> : 'No Lyrics Data Was Found'}</p>
            </div> */}
        </div>
    )
}

export default GetSearch
