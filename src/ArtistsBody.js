import React, { Component } from 'react';
import AllArtists from './AllArtists';
import Artist from './Artist';
import axios from 'axios'


class ArtistsBody extends Component {

  constructor(props) {
      super(props);
      this.state = {
        artists:this.props.artists,
        currentArtist:this.props.currentArtist,
        showAllArtists:this.props.showAllArtists,
        auth_token:this.props.auth_token
      };
      this.toggleAllArtists = this.toggleAllArtists.bind(this)
      this.selectArtist = this.selectArtist.bind(this)
      this.handleDeleteArtist = this.handleDeleteArtist.bind(this)
    }

    selectArtist(id){
      axios.get('https://rails-api-ipo.herokuapp.com/api/v1/artists/'+id+'.json',{ 'headers': { 'Authorization': this.state.authToken }})
      .then(response => {
        this.setState({currentArtist:response.data,showAllArtists:false})
        this.props.currentArtistToMain(response.data,false)
      })
    }

    componentWillReceiveProps(props) {
      axios.get('https://rails-api-ipo.herokuapp.com/api/v1/artists.json',{ 'headers': { 'Authorization': props.authToken }})
      .then(response => {
        this.setState({artists: response.data,authToken:props.authToken})
      })
      .catch(error => console.log(error))
    }

    toggleAllArtists(){
      this.setState({
        showAllArtists: true
      })
    }
    handleDeleteArtist(id){
      console.log("deleting")
      axios.delete(`https://rails-api-ipo.herokuapp.com/api/v1/artists/`+id,{ 'headers': { 'Authorization': this.props.authToken}})
      .then((response) => {
          this.deleteArtist(id)
          console.log(response)
        })
    }
    deleteArtist(id){
      let newArtistState = this.state.artists.filter((artist) => artist.id !== id)
      this.setState({
        artists: newArtistState,showAllArtists: true
      })
    }

  render(){
      return(
        <div >
          <div >
            {(this.state.showAllArtists===true)?
              <AllArtists artists={this.state.artists} showAllArtists ={this.state.showAllArtists} selectArtist={this.selectArtist} />
              :
              <Artist handleDeleteArtist={this.handleDeleteArtist} currentArtist={this.state.currentArtist} toggleAllArtists={this.toggleAllArtists}/>}
          </div>
      </div>
      )
    }
}

export default ArtistsBody;
