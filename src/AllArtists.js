import React, { Component } from 'react';
import Artist from './Artist';
import NewArtist from './NewArtist';
import axios from 'axios'



class AllArtists extends Component{

constructor(props) {
    super(props);
    this.state = {
      artists:this.props.artists,
      authToken:[]
    }
    this.handleNewArtistSubmit = this.handleNewArtistSubmit.bind(this)
    this.addNewArtist = this.addNewArtist.bind(this)
  }

  componentWillReceiveProps(props) {
    axios.get('https://rails-api-ipo.herokuapp.com/api/v1/artists.json',{ 'headers': { 'Authorization': props.authToken }})
    .then(response => {
      this.setState({artists: response.data,authToken:props.authToken})
    })
    .catch(error => console.log(error))
  }

    handleNewArtistSubmit(name,bio,hometown){
      // TODO:CHANGE ARTIST TO BELONG TO USER BY EMAILS or USER GROUPS
      var artistObj = {name: name, bio: bio, hometown:hometown}
      axios.post(`https://rails-api-ipo.herokuapp.com/api/v1/artists`,{artist:artistObj},{ 'headers': { 'Authorization': this.props.authToken}})
      .then((response) => {
          this.addNewArtist(artistObj)
        })
    }
    addNewArtist(artist){
      axios.get('https://rails-api-ipo.herokuapp.com/api/v1/artists.json',{ 'headers': { 'Authorization': this.state.authToken }})
      .then(response => {
        this.setState({artists: response.data})
      })
      .catch(error => console.log(error))
    }


  render(){
    var artists = this.state.artists.map((artist) => {
        return(
          <div key={artist.id}>
            <Artist artist ={artist} selectArtist ={this.props.selectArtist} toggleAllArtists={this.toggleAllArtists} />
        </div>
        )
      })
    return(
      <div>
          {artists}
        <NewArtist handleNewArtistSubmit={this.handleNewArtistSubmit}/>
      </div>
    )
  }

}

export default AllArtists;
