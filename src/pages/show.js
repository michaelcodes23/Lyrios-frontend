import React, {useState, useEffect} from 'react';
import Axios from 'axios'
import YouTube from 'react-youtube'
import UserOutput from '../components/UserOutput';
import '../index.css';  

function ShowFavVideo () {
    const [infoArray, setInfoArray] = React.useState(null)
    let getinfo = async() => {


        let response =  await fetch(' https://lyrios21.herokuapp.com/favsong')


        let data = await response.json();
        const sessionData = []
        data.forEach((value)=>{
            if(value.email === localStorage.getItem('SessionEmail')){
                sessionData.push(value)
            }
        })
        console.log(sessionData)
        if (sessionData.length >= 1){
            setInfoArray(sessionData)
            getLyricsArray(sessionData)
        }
        else console.log('Users data is empty')
        return console.log(data)


    }


    
    // const lyricsArray = [
    //     "https://api.happi.dev/v1/music/artists/4862/albums/153808/tracks/13227248/lyrics",
    //     "https://api.happi.dev/v1/music/artists/5130/albums/57340/tracks/13202642/lyrics",
    //     "https://api.happi.dev/v1/music/artists/917/albums/68395/tracks/1117145/lyrics",
    //     "https://api.happi.dev/v1/music/artists/2807/albums/219362/tracks/3452831/lyrics",
    //     "https://api.happi.dev/v1/music/artists/5472/albums/32903/tracks/546400/lyrics"
    // ]

const songtest = 'Tu Amor Me Hace Bien Marc Anthony'
//YouTube API
const baseURL = 'https://www.googleapis.com/youtube/v3';
const search = '/search?part=snippet';
const maxResult = '&maxResults=1';
const keyWord = '&q=rihanna';
const type = '&type=video';
// API Key 1
const key = '&key=AIzaSyD5inzevVk7CDg0ipn9yBTXWP_TtekfF0A'; 
// // API Key 2
// const key = '&key=AIzaSyAjtiGq13vuyxMjQfPS7Ngj0Mny-7ol3GM'
//API Key 3
// const key = '&key=AIzaSyAlEKircfin7Ratd0qMcJT50yknQLgk67c';
const topicId = '&topicId=04rlf';
const [showYoutubeData, setShowYoutubeData] = React.useState(null)
const getYoutubeData = async (searchTerm) => {
    if(searchTerm !== undefined){
        const response = await Axios.get(
            `${baseURL}${search}${maxResult}${type}${key}${topicId}&q=${searchTerm}`
        )
        setShowYoutubeData(response.data)
        // setSearchData(response.data)
        // const youtubeFetch = await response.json();
        console.log(searchTerm)
        console.log(response.data)
        // SearchOutput(response.data)
        return 'response'
    } else {
        console.log('There is no data in search term')
    }


}
//Lyrics API
const songArray = []
//Lyrics API Call - Happi.dev/docs/music
const [showlyricsData, setShowLyricsData] = React.useState([null])
const baseLyricsURL = "https://api.happi.dev/v1/music?";
const hasLyrics = "&lyrics=1";
const limit = "&limit=";
const lyricsType = "&type=";
//api key 1
// const apiLyricsKey = "&apikey=6d400baq5E0tR7e8ItaBRyijAyJVpD9qLDYxcli0AwBHLoMayAPtZaNr";   
//api key 2
// const apiLyricsKey = "&apikey=78e089Xdo4n4bW6uzrz5HaYLJ3E801KK7uQ0LQlJFsZ7ROy1mr0ZDyjR";   
//api Key 3
const apiLyricsKey = "&apikey=8dcb582VuyRPwwIk4wEDUbJ5xTmiQvRE7QUfgBFrTJGVIkcmYqH4r9Nh"; 


const lyricsArrayNew = ['That La, La, La Rihanna','Across The Room ODESZA']

    const getLyricsArray = async (searchTerm) => {
        if(searchTerm !== undefined){
        try{
        const response = await Axios.get(
        `${baseLyricsURL}${limit}${apiLyricsKey}${lyricsType}${hasLyrics}&q=${searchTerm[0].favoriteSong}`
        )
        console.log(searchTerm)
        console.log(response.data)
        console.log(response.data.result[0].api_lyrics)
        // getLyricsData(response.data.result[0].api_lyrics)
        const responseLyrics = await Axios.get(
            response.data.result[0].api_lyrics + '?' + apiLyricsKey
        )
        console.log(responseLyrics)
        setShowLyricsData(responseLyrics.data)
        console.log(responseLyrics.data)
        console.log(responseLyrics.data.result.lyrics)
        getYoutubeData(responseLyrics.data.result.track + ' ' + responseLyrics.data.result.artist)
        } catch (error) {
            if(searchTerm){
                console.log('no lyrics found')
                getYoutubeData(searchTerm[0].favoriteSong)
                setShowLyricsData(null)
            } else console.log('No search term in database, please save a new favorite video')
        }
        } else {
            setShowLyricsData(null)
            getYoutubeData(searchTerm[0].favoriteSong)
        }
    }

    React.useEffect(()=>{

        getinfo()
        // getLyricsArray(getInfoArray[0].favoriteSong)

        // randomVideo(randomArtist)
        console.log('running use effect')
    },[])
// Post MVP - Be able to push a playlist as opposed to only one video (hungry for more)
    // const getLyricsData = async (data) => {
    //     // console.log(data)

    //     const response = await Axios.get(
    //         data + '?' + apiLyricsKey
    //     )
    //     const responses = await Promise.all(lyricsArray.map( async (value,index)=>{
    //         return await Axios.get(
    //             value + '?' + apiLyricsKey
    //         )
    //     }))
    //     const responseElements = responses.map((value, index)=>{
    //         return (
    //             <>
    //             <p className = "lyrics">{value.data.result.lyrics}</p>
    //             <hr></hr>
    //             </>
    //         )
    //     })

    //     console.log(responses)
    //         // getYoutubeData(response.data.result.track + ' ' + response.data.result.artist)
    //     const YouTuberesponses = await Promise.all(responses.map( async (value,index)=>{
    //         const searchTerm = value.data.result.track + ' ' + value.data.result.artist
    //         return await Axios.get(
    //         `${baseURL}${search}${maxResult}${type}${key}${topicId}&q=${searchTerm}`
    //         )
    //     }))
    //     console.log(YouTuberesponses)
    //     const YouTubeElements = YouTuberesponses.map((value, index)=> {
    //         return (
    //             <>
    //             <h4 className ="videoTitle">{value.data.items[0].snippet.title}</h4>  
    //             <YouTube videoId= {value.data.items[0].id.videoId}/> 
    //             </>
    //         )
    //     })
    //     const dataArray = []
    //     YouTubeElements.forEach((element,index) => {
    //         dataArray.push(YouTubeElements[index])
    //         dataArray.push(responseElements[index])
    //     });
    //     console.log(dataArray)
    //     setShowLyricsData(dataArray)
        // setShowYoutubeData(YouTubeElements)
        // console.log(showlyricsData)

        // return console.log(response.data)
    // console.log(response.data)
    //    if(!lyricsArrayNew.includes(response.data)) await lyricsArrayNew.push(response.data)
       
        // console.log(response.data.result.lyrics)
        // console.log(response.data.result.track + ' ' + response.data.result.artist )
        // setShowLyricsData(response.data) //
        // getYoutubeData(response.data.result.track + ' ' + response.data.result.artist)
    // }
    //     React.useEffect(()=>{
    //     getLyricsData()

    //     // randomVideo(randomArtist)
    //     console.log('running use effect')
    // },[])




    // lyricsArray.map((value,index)=>{
    //     console.log(value)
    //     getLyricsData(value)
    // })
    // const getArray = (data) => {

    //     for (let i = 0; i < data.length; i++){
    //         console.log(data[i])
    //         // getLyricsData(data[i])
    //     }
    //     // setLyricsData(lyricsArrayNew)
    //     console.log(lyricsArrayNew)
    //     return(
    //         <div>
    //         {/* {console.log(lyricsArrayNew[0].)}
    //         <h2>{lyricsArrayNew[0].result.album}</h2> */}
    //         <h1>Hello</h1>
    //         {/* {lyricsArrayNew.map((value,index)=>{
    //         return(
    //         <p>test</p>
    //         )
    //         })} */}
    //     </div>
    //     )
    // }
    
return (
	<div>
        <br/>
        <h1>Your Favorite Song Below (Press the delete button, to delete this song, and chekout our other favorites!)</h1>
        <br/>
{/* Hungry for more output */}
        {/* <div className = 'videoMap'>
            <div className = 'videoItem'>
            {/* {showYoutubeData} */}
            {/* {showlyricsData}
            </div>
            </div>
            <div>  
        </div> */} 
{/* // Hungry for more above */}
            {showYoutubeData ?
            <>{ showYoutubeData  && <UserOutput youtubeData={showYoutubeData} lyricsData={showlyricsData} userData={infoArray} />} </>:
            <h3 className = 'boldUser'>Whoops, it appears you haven't signed in and picked a new favorite song (or deleted all your previously saved tracks)! Please navigate to the home page and click add to favorites once signed in!</h3>
            }
    </div>
)
};

export default ShowFavVideo ;
