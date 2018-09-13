import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'
import './Dashboard.css';

import ArtistsBody from './ArtistsBody';
import EventsBody from './EventsBody';
import CalendarBody from './CalendarBody';
import AuthService from './AuthService';
import withAuth from './withAuth';
const Auth = new AuthService();



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
        this.Auth = new AuthService();
      }

      componentWillMount() {
        if (!Auth.loggedIn()) {
            this.props.history.replace('/login')
        }
      }
      componentDidMount(){
          if (Auth.loggedIn()) {
            this.setState({authToken:Auth.getToken()})
          }
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

       handleLogout(){
           Auth.logout()
           this.props.history.replace('/login');
        }
    render(){
      return(
        <div className='container'>
          <div className='row'>
            <button type="button" className="form-submit" onClick={this.handleLogout.bind(this)}>Logout</button>
            <h5>Welcome User #{Auth.getProfile().user_id}</h5>
          </div>
          <div className='row'>
            <div className ='col-md-3'>
              <div>
                <div className ='text-center'>
                  <h4><b>Artists</b></h4>
                </div>
                <ArtistsBody authToken={this.state.authToken} currentArtistToMain = {this.getCurrentArtistFromBody} showAllArtists={this.state.showAllArtists} currentArtist={this.state.currentArtist} selectArtist={this.props.selectArtist} artists = {this.state.artists}/>
              </div>
          </div>
            <div className ='col-md-5'>
              <EventsBody authToken={this.state.authToken} currentEventsToMain={this.getCurrentEventsFromBody} clickedDate={this.state.clickedDate} showNewEventForm={this.state.showNewEventForm} currentArtist={this.state.currentArtist}/>
            </div>
            <div className ='col-md-4'>
              <CalendarBody authToken={this.state.authToken} addNewEvent={this.addNewEvent} currentArtist={this.state.currentArtist} events={this.state.currentEvents}/>
            </div>
          </div>
        </div>
      )
    }
  }


export default Dashboard;
// export default withAuth(Dashboard);
