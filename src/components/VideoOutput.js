import React, {useState, useEffect} from 'react';
import Axios from 'axios'
import YouTube from 'react-youtube'
// import { containeranalysis } from 'googleapis/build/src/apis/containeranalysis';
const baseURL = 'https://www.googleapis.com/youtube/v3';
const search = '/search?part=snippet';
const maxResult = '&maxResults=12';
const keyWord = '&q=rihanna';
const type = '&type=video';
//API Key 1
const key = '&key=AIzaSyD5inzevVk7CDg0ipn9yBTXWP_TtekfF0A'; 
//API Key 2
// const key = '&key=AIzaSyD5inzevVk7CDg0ipn9yBTXWP_TtekfF0A';
const topicId = '&topicId=04rlf'
const URL = `${baseURL}${search}${maxResult}${type}${key}${topicId}${keyWord}`;
const artist = ['beyonce','sza','ariana grande','jay-z','rihanna','cold play','snoop dogg','bruno mars','marc anthony','bad bunny','incubus',
        'a boggie wit da hoodie','tiesto','billy joel','john mayer','el alfa','omega','celia cruz','cardi b','miguel','leon bridges'];
const random = Math.round(Math.random()*artist.length)
const randomArtist = artist[random]


function VideoOutput (props) {
    const [youtubeData, setYoutubeData] = React.useState(null)
    const [lyricsData, setLyricsData] = React.useState(null)
    const getYoutube = async () => {
        const response = await Axios.get(
            URL
        )
        setYoutubeData(response.data)
        // const youtubeFetch = await response.json();
        console.log(response.data)
       return 'response'
    }

    const randomVideo = async (searchTerm) => {
        console.log(randomArtist)
        const response = await Axios.get(
            `${baseURL}${search}${maxResult}${type}${key}${topicId}&q=${randomArtist}`
        )

        console.log(response.data.items)
        setYoutubeData(response.data.items)
        // const title = response.data.items[randomNumber].snippet.title;
        // const stripped = title.replace(/ *\([^)]*\) */g, "");
        // console.log(stripped)
    
        }

        const baseLyricsURL = "https://api.happi.dev/v1/music?";
        
        const hasLyrics = "&lyrics=1";
        const limit = "&limit=";
        const lyricsType = "&type=";
        const apiKey = "&apikey=6d400baq5E0tR7e8ItaBRyijAyJVpD9qLDYxcli0AwBHLoMayAPtZaNr";
        // const newQ = lyricsQ.split(' ').join('%20');
        // console.log(newQ)
        let title = "";
        let lyricsURL = `${baseLyricsURL}${title}${limit}${apiKey}${lyricsType}${hasLyrics}`;
        const lyricsQ = (searchTerm) => {
            const newQ = "q=" + searchTerm.replace(/ *\([^)]*\) */g, "").split(' ').join('%20');
            console.log(newQ)
            title = newQ;
            console.log(title)
            lyricsURL = `${baseLyricsURL}${title}${limit}${apiKey}${lyricsType}${hasLyrics}`;
            console.log(lyricsURL)
        }
        
            //function to make api call
            const getData = async (searchTerm) => {
                // console.log(URL)
                //make the call to get a response
                try {
                const response = await Axios.get(
                    lyricsURL
                )
                console.log(response.data)
                //set lyrics state to response
                // console.log(response.data.result[0].api_lyrics)
                
                getLyricsData(response.data.result[0].api_lyrics)
            } catch (error) {
                console.log('no lyrics found')
            }
                return 'response'
                }
                // getData()
            
            const getLyricsData = async (data) => {
                const response = await Axios.get(
                    data +'?'+apiKey
                )
                console.log(response.data.result.lyrics)
                setLyricsData(response.data.result.lyrics)
                return 'response'
            
        }
        // randomVideo
      React.useEffect(()=>{
        // getYoutube()
        randomVideo();
    },[])
     
    //to simply use youtubeData.items
    //1. Need form to get the YouTube Data
    //2. Display Youtube Data
    const randomNumber = Math.floor(Math.random()*10)
    
    // const songIndex = artist[randomNumber]
    // console.log(songIndex)
    // console.log(youtubeData[randomNumber].snippet.title)
    const newPost = (test) => {
        return (
        console.log(test)
        )
    }
   
    
    return(
        <div>
            {/* <h2>{youtubeData ? <>  {youtubeData.items[0].snippet.title}  <YouTube videoId= {youtubeData.items[0].id.videoId} /> </> : 'No YouTube data was gathered'}</h2> */}
            <div>{youtubeData ? <><h4 className ="videoTitle">{youtubeData[randomNumber].snippet.title}</h4>  <YouTube videoId= {youtubeData[randomNumber].id.videoId}/> </> :
            'No YouTube data was gathered'}
            <p className = 'lyrics'>{lyricsData ? <> {lyricsData} </> : 'No lyrics data was gathered'} </p>
            </div>
            {/* <h2>{youtubeData[0].snippet.title} </h2> */}
            <div className = 'videoMap'>
            {youtubeData ?   <>     
            {youtubeData.map((value, index)=>{
                newPost(value.snippet.title)
                getData(lyricsQ(value.snippet.title))
                return(
                    <div className = 'videoItem'>
                       <h4 className = 'videoTitle'>{value.snippet.title}</h4>  <YouTube videoId= {value.id.videoId} className = 'videoIndex'/>
                       <p className = 'lyrics'>{lyricsData ? <> {lyricsData} </> : 'No lyrics data was gathered'} </p>
                    </div>
                )

            })}</> : <p>No YouTube data was gathered</p>
            }  
            </div>
        </div>
    )
}

export default VideoOutput

//need to grab the randomNumber index from the array or use the 'value' inside of the return statement
//to use in my URL for the lyrics, right now it's just grabbing the artist and not the title, 
//can my api call go after the return? or can I put my call inside of a return statement?
//or move the youtubedata.map outside of the return?
//started getting 403 error on googleapi