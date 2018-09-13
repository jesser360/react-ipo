import React from 'react';
import Artist from './Artist';


const AllArtists = (props) => {
var artists = props.artists.map((artist) => {
    return(
      <div key={artist.id}>
        <Artist artist ={artist} selectArtist ={props.selectArtist} toggleAllArtists={this.toggleAllArtists}/>
      </div>
    )
  })
return(
      <div>
        {artists}
      </div>
    )
}
export default AllArtists;
