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
      };
      this.toggleAllArtists = this.toggleAllArtists.bind(this)
      this.selectArtist = this.selectArtist.bind(this)

    }

    selectArtist(id){
      fetch('http://localhost:3001/api/v1/artists/'+id+'.json')
        .then((response) => {return response.json()})
        .then((data) => {this.setState({
           currentArtist: data,
           showAllArtists:false
          })
          this.props.currentArtistToMain(data,this.state.showAllArtists)
      });
    }

    toggleAllArtists(){
      this.setState({
        showAllArtists: this.props.showAllArtists
      })
    }

    componentDidMount() {
      axios.get('http://localhost:3001/api/v1/artists.json')
      .then(response => {
        this.setState({artists: response.data})
      })
      .catch(error => console.log(error))
    }

  render(){
      return(
        <div >
          <div >
            {!this.state.showAllArtists ? <Artist currentArtist={this.state.currentArtist} toggleAllArtists={this.toggleAllArtists}/> :
            <AllArtists artists={this.state.artists} selectArtist={this.selectArtist} /> }
          </div>
      </div>
      )
    }
}

export default ArtistsBody;
