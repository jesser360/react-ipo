import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Dashboard.css';
// import auth0 from 'auth0-js';

import ArtistsBody from './ArtistsBody';
import EventsBody from './EventsBody';
import CalendarBody from './CalendarBody';
import AuthService from './AuthService';
// const Auth = new AuthService();

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
        console.log(localStorage.getItem('email'))
          if (this.Auth.isAuth0Authenticated()) {
            this.setState({authToken:localStorage.getItem('access_token')})
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
        <div className='container'>
          <div className='row'>
            <button type="button" className="form-submit" onClick={this.handleLogout.bind(this)}>Logout</button>
            <h3> Welcome {user_email}</h3>
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
