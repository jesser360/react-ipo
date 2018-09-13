import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import './Dashboard.css';
import ArtistsBody from './ArtistsBody';
import EventsBody from './EventsBody';
import CalendarBody from './CalendarBody';
import axios from 'axios'


  class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
          currentArtist:[],
          showAllArtists:true,
          artists:[],
          events:[],
          clickedDate:[],
          authToken:[],
          showNewEventForm:[]
        };
        this.getCurrentArtistFromBody = this.getCurrentArtistFromBody.bind(this)
        this.getCurrentEventsFromBody = this.getCurrentEventsFromBody.bind(this)
        this.addNewEvent = this.addNewEvent.bind(this)
      }

      componentDidMount(){
        axios.post(' http://localhost:3001/api/v1/authenticate', {
          email: 'example@mail.com',
          password: '123123123'
        }).then((response) => {this.setState({ authToken: response.data.auth_token }) })
        .catch(function (error) {
          console.log(error);
        });
      }


      getCurrentArtistFromBody(data){
          this.setState({currentArtist:data})
       }

      getCurrentEventsFromBody(events,showNewEventForm){
          this.setState({events:events,showNewEventForm:showNewEventForm})
       }

       addNewEvent(date){
         console.log('helo from add new event',date)
         this.setState({
           clickedDate:date,
           showNewEventForm:true
         })
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
                <ArtistsBody authToken={this.state.authToken} currentArtistToMain = {this.getCurrentArtistFromBody} showAllArtists={this.state.showAllArtists} currentArtist={this.state.currentArtist} selectArtist={this.props.selectArtist} artists = {this.state.artists}/>
              </div>
          </div>
            <div className ='col-md-4'>
              <EventsBody authToken={this.state.authToken} currentEventsToMain={this.getCurrentEventsFromBody} clickedDate={this.state.clickedDate} showNewEventForm={this.state.showNewEventForm} currentArtist={this.state.currentArtist}/>
            </div>
            <div className ='col-md-5'>
              <CalendarBody authToken={this.state.authToken} addNewEvent={this.addNewEvent} currentArtist={this.state.currentArtist} events={this.state.currentEvents}/>
            </div>
          </div>
        </div>
      )
    }
  }


export default Dashboard;
