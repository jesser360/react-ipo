import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Dashboard.css';
import axios from 'axios'
// import auth0 from 'auth0-js';

import ArtistsBody from './ArtistsBody';
import EventsBody from './EventsBody';
import CalendarBody from './CalendarBody';
import AuthService from './AuthService';
// const Auth = new AuthService();

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const auth = new AuthService();
auth.login();
auth.handleAuthentication();

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
        if (!this.Auth.isAuth0Authenticated()) {
            this.props.history.replace('/auth0-login')
        }
      }
      componentDidMount(){
          if (this.Auth.isAuth0Authenticated()) {
            this.setState({authToken:localStorage.getItem('access_token')},function(){
              axios.get('https://rails-api-ipo.herokuapp.com/api/v1/artists.json',{ 'headers': { 'Authorization': this.state.authToken }})
              .then(response => {
                this.setState({artists: response.data})
              })
              .catch(error => console.log(error))
            })
          }
      }

      getCurrentArtistFromBody(data){
          this.setState({currentArtist:data})
       }

      getCurrentEventsFromBody(events,showNewEventForm){
          this.setState({events:events,showNewEventForm:showNewEventForm})
       }

       addNewEvent(date){
         this.setState({
           clickedDate:date,
           showNewEventForm:true
         })
       }

       handleLogout(){
           this.Auth.auth0Logout()
           this.props.history.replace('/auth0-login');
        }

    render(){
      const user_email = localStorage.getItem('name')
      return(
        <div className='container' id='main'>
          <div className='row'>
          <div className='col-md-1 account-bar'>
            <h2> Welcome {user_email}</h2>
            <div>
              <h3>My Tasks</h3>
              <i class="fas fa-bell"></i>
            </div>
            <div>
              <h3>My Projects</h3>
            </div>
            <div>
              <h3>My Chats</h3>
            </div>
            <div>
              <h3>My Artists</h3>
            </div>
            <button type="button" className="form-submit" onClick={this.handleLogout.bind(this)}>Logout</button>
          </div>
            <div className='col-md-11 main-content'>
              <div className ='col-md-3 artists-section'>
                <div>
                  <div className ='text-center'>
                    <h2>Artists</h2>
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
        </div>  
      )
    }
  }


export default Dashboard;
// export default withAuth(Dashboard);
