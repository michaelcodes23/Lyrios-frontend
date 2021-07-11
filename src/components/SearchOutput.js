import React from 'react';
import YouTube from 'react-youtube'



const SearchOutput = (data) => {
    console.log(data.youtubeData)
    console.log(data.youtubeData.items[0].snippet.title)
    console.log(data.lyricsData)
    // console.log(lyricsData)
    let addtofav = () => {
        
        fetch(' https://lyrios21.herokuapp.com/favsong', {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        //make sure to serialize your JSON body
        body: JSON.stringify({
          email: localStorage.getItem('SessionEmail'),
          name: localStorage.getItem('SessionName'),
          favsong: data.lyricsData.result.track + ' ' + data.lyricsData.result.artist
        }),
      });
    }

    let addtofavVideo = () => {
        
      fetch(' https://lyrios21.herokuapp.com/favsong', {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      //make sure to serialize your JSON body
      body: JSON.stringify({
        email: localStorage.getItem('SessionEmail'),
        name: localStorage.getItem('SessionName'),
        favsong: data.youtubeData.items[0].snippet.title
      }),
    });
  }



    return(
       <div>
            
            {/* <YouTube videoId= {youtubeData.results.items[0].id.videoId} /> */}
            <div className = 'videoItem'>
            <div>{data.youtubeData ? <><h4 className ="videoTitle">{data.youtubeData.items[0].snippet.title}</h4>  <YouTube videoId= {data.youtubeData.items[0].id.videoId}/> </> :
            'No YouTube data was gathered'}
           
            </div>
            <br/>
            
            {data.lyricsData ?  <button onClick={addtofav} className = "button is-info" >Save to My Playlist</button> : ''}    
            <div>{data.lyricsData ? <> 
            <p className = "lyrics">{data.lyricsData.result.lyrics}</p>
            </>: 
            <>
             <button onClick={addtofavVideo} className = "button is-info" >Save to My Playlist</button> 
            <p>No Lyrics Data Was Found</p>
            </>}</div>
            {/* {youtubeData ?   <>     
            {youtubeData.results.item.map((value, index)=>{
                console.log(value)
                return(
                    <div className = 'videoItem'>
                       <h4 className = 'videoTitle'>{value.snippet.title}</h4>  <YouTube videoId= {value.id.videoId} className = 'videoIndex'/>
            
                    </div>
                )

            })}</> : <p>Please submit a search request.</p>
            }   */}
                
            </div> 
        </div>
      
    )

}


export default SearchOutput