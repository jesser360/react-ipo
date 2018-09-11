import React, { Component } from 'react';

class Artist extends Component{

  constructor(props) {
      super(props);
      this.state = {
          showAllArtists: this.props.showAllArtists,
      };
  }

  render(){
    let name = this.props.currentArtist ? <span>{this.props.currentArtist.name}</span>: <span>{this.props.artist.name}</span>
    let bio = this.props.currentArtist ? <span>{this.props.currentArtist.bio}</span>: <span>{this.props.artist.bio}</span>
    let hometown = this.props.currentArtist ? <span>{this.props.currentArtist.hometown}</span>: <span>{this.props.artist.hometown}</span>
      return(
          <div>
            {!this.props.currentArtist ?
              <div className ='row'>
                <div className='col-md-4 text-center'>
                  <button className='black-btn' onClick={() => this.props.selectArtist(this.props.artist.id)}>Select</button>
                </div>
                <div className='col-md-6 text-center'>
                  <h5><b>{name}</b></h5>
                </div>
              </div>
            :
              <div >
                <div className ='row'>
                  <div className='text-center'>
                    <h4><b>{name}</b></h4>
                  </div>
                </div>
                <div className ='row'>
                  <h5>BIO: {bio}</h5>
                  <h5>HOMETOWN: {hometown}</h5>
                  <button className='black-btn' onClick={() =>this.props.toggleAllArtists()}>All Artists</button>
                </div>
              </div>
            }
            <hr></hr>
        </div>
        )
      }
    }

export default Artist
