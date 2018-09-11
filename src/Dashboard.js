import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'

import './Dashboard.css';
import ArtistsBody from './ArtistsBody';
import EventsBody from './EventsBody';
import CalendarBody from './CalendarBody';

  class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
          currentArtist:[],
          showAllArtists:true,
          artists:[]
        };
        this.getCurrentArtistFromBody = this.getCurrentArtistFromBody.bind(this)
      }

      getCurrentArtistFromBody(data){
          this.setState({currentArtist:data})
       }
    render(){
      return(
        <div className='container'>
          <div className='row'>
            <div className ='col-md-3'>
              <div>
                <div className ='text-center'>
                  <h4><b>Artists</b></h4>
                </div>
                <ArtistsBody currentArtistToMain = {this.getCurrentArtistFromBody} showAllArtists={this.state.showAllArtists} currentArtist={this.state.currentArtist} selectArtist={this.props.selectArtist} artists = {this.state.artists}/>
              </div>
          </div>
            <div className ='col-md-4'>
              <EventsBody currentArtist = {this.state.currentArtist}/>
            </div>
            <div className ='col-md-5'>
              <CalendarBody currentArtist = {this.state.currentArtist}/>
            </div>
          </div>
        </div>
      )
    }
  }


export default Dashboard;
