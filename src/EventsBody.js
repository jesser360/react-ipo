import React, { Component } from 'react';
import AllEvents from './AllEvents';
import NewEvent from './NewEvent';
import axios from 'axios'


class EventsBody extends Component {

  constructor(props) {
      super(props);
      this.state = {
        events: [],
        showNewEventForm:this.props.showNewEventForm,
        currentArtist:this.props.currentArtist,
        authToken:this.props.authToken
      };
      this.handleNewEventSubmit = this.handleNewEventSubmit.bind(this)
      this.addNewEvent = this.addNewEvent.bind(this)
      this.handleDeleteEvent = this.handleDeleteEvent.bind(this)
      this.deleteEvent = this.deleteEvent.bind(this)
      this.handleUpdateEvent = this.handleUpdate.bind(this);
      this.updateEvent = this.updateEvent.bind(this)
    }


    // componentWillReceiveProps(nextProps){
      // if(nextProps.currentArtist.length>0){
      //   console.log(nextProps)
      //   this.setState({currentArtist: nextProps.currentArtist}, () => {
      //     // this.updateCalender()
      //   });
      //   this.setState({showNewEventForm: nextProps.showNewEventForm});
      // }
    // }

    handleNewEventSubmit(start,end,allDay,title,genre,note){
      var taskObj = {start: start, end: end, allDay:true, title:title, genre:genre, note:note,artist_id:this.props.currentArtist.id}
      axios.post(`https://rails-api-ipo.herokuapp.com/api/v1/tasks`,{task:taskObj},{ 'headers': { 'Authorization': this.props.authToken}})
      .then((response) => {
          this.addNewEvent(taskObj)
        })
      // let body = JSON.stringify({
      //   event: {start: start, end: end, allDay:allDay, title:title, genre:genre, note:note,artist_id:this.state.currentArtist.id}
      // })
      // fetch('https://rails-api-ipo.herokuapp.com/api/v1/events', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json'
      //   },
      //   body: body,
      // }).then((response) => {return response.json()})
      //   .then((event) => {
      //     this.addNewEvent(event)
      //   })
    }
    addNewEvent(event){
      this.setState({
        events: this.state.events.concat(event),
        showNewEventForm:false,
      })
      this.props.currentEventsToMain(this.state.event,false)
    }

    handleDeleteEvent(id){
      axios.delete(`https://rails-api-ipo.herokuapp.com/api/v1/tasks/${id}`,{ 'headers': { 'Authorization': this.props.authToken}})
      .then((reponse) => {
        this.deleteEvent(id)
      })
    }
    deleteEvent(id){
      var newEvents = this.state.events.filter((event) => event.id !== id)
          this.setState({
            events: newEvents
          })
        this.props.currentEventsToMain(this.state.events,false)
    }

    updateCalender(){
      let artist_id = this.state.currentArtist.id;
      fetch('https://rails-api-ipo.herokuapp.com/api/v1/tasks/artist/'+artist_id+'.json')
      .then((response) => {return response.json()})
      .then((data) => {this.setState({ events: data }) });
    }

    componentWillReceiveProps(newProps){
      // console.log(newProps)
      // GETS ALL EVENTS FOR SELECTED ARTIST
      if(newProps.currentArtist.id){
        axios.get('https://rails-api-ipo.herokuapp.com/api/v1/tasks/artist/'+newProps.currentArtist.id+'.json',{ 'headers': { 'Authorization': this.props.authToken }})
        .then(response => {
        this.setState({ events: response.data ,showNewEventForm:newProps.showNewEventForm});
        })
      }
    }

  handleUpdate(taskObj){
    axios.put(`https://rails-api-ipo.herokuapp.com/api/v1/tasks/${taskObj.id}`,{task:taskObj},{ 'headers': { 'Authorization': this.props.authToken}})
    .then((response) => {
        this.updateEvent(taskObj)
      })
  }

  updateEvent(event){
    let eventIndex = this.state.events.findIndex((f) => f.id === event.id);
    let newEvents = this.state.events.filter((f) => f.id !== event.id);
    newEvents.splice(eventIndex,0,event);
    this.setState({
      events: newEvents
    })
    this.props.currentEventsToMain(this.state.events,false)

  }

  render(){
      return(
        <div>
          {this.state.currentArtist.name? <h4> {this.state.currentArtist.name} s calender </h4>:<h4>Calender</h4>}
          {this.state.showNewEventForm === true ?
            <NewEvent clickedDate = {this.props.clickedDate} currentEventsToMain={this.props.currentEventsToMain} handleNewEventSubmit={this.handleNewEventSubmit} />
            :
            <div className='event_list'>
              <AllEvents events={this.state.events} handleDeleteEvent={this.handleDeleteEvent} handleUpdateEvent = {this.handleUpdateEvent}/>
            </div>
        }
      </div>
      )
    }
}

export default EventsBody
