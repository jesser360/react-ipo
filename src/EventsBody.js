import React, { Component } from 'react';
import AllEvents from './AllEvents';
import NewEvent from './NewEvent';

class EventsBody extends Component {

  constructor(props) {
      super(props);
      this.state = {
        events: [],
        isShowing:true,
        currentArtist:[]
      };
      this.handleNewEventSubmit = this.handleNewEventSubmit.bind(this)
      this.addNewEvent = this.addNewEvent.bind(this)
      this.handleDeleteEvent = this.handleDeleteEvent.bind(this)
      this.deleteEvent = this.deleteEvent.bind(this)
      this.handleUpdateEvent = this.handleUpdate.bind(this);
      this.updateEvent = this.updateEvent.bind(this)
      this.toggleNewEventForm = this.toggleNewEventForm.bind(this)
    }


    componentWillReceiveProps(nextProps){
      this.setState({currentArtist: nextProps.currentArtist}, () => {
          this.updateCalender()
      });
    }

    toggleNewEventForm(){
      // $('.section_event').hide();
      // $('.event_labels').show();
      // $('.event_list').show();
    }

    handleNewEventSubmit(start,end,allDay,title,genre,note){
      // $('.section_event').hide();
      // $('.event_title').val('')
      // $('.event_genre').val('')
      // $('.event_notes').val('')
      let body = JSON.stringify({
        event: {start: start, end: end, allDay:allDay, title:title, genre:genre, note:note,artist_id:this.state.currentArtist.id}
      })
      fetch('http://localhost:3001/api/v1/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: body,
      }).then((response) => {return response.json()})
        .then((event) => {
          this.addNewEvent(event)
        })
    }
    addNewEvent(event){
      this.setState({
        events: this.state.events.concat(event)
      })
      // reRenderCalender(event);
      // $('.section_event').hide();
      // $('.event_labels').show();
      // $('.event_list').show();
    }

    handleDeleteEvent(id){
      fetch(`http://localhost:3001/api/v1/events/${id}`,  {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((reponse) => {
        this.deleteEvent(id)
      })
    }
    deleteEvent(id){
      var newEvents = this.state.events.filter((event) => event.id !== id)
          this.setState({
            events: newEvents
          })
    }

    updateCalender(){
      let artist_id = this.state.currentArtist.id;
      fetch('http://localhost:3001/api/v1/events/artist/'+artist_id+'.json')
      .then((response) => {return response.json()})
      .then((data) => {this.setState({ events: data }) });
    }

  handleUpdate(event){
    fetch(`http://localhost:3001/api/v1/events/${event.id}`,
    {
      method: 'PUT',
      body: JSON.stringify({event: event}),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => {
        this.updateEvent(event)
      })
  }
  updateEvent(event){
    let eventIndex = this.state.events.findIndex((f) => f.id === event.id);
    let newEvents = this.state.events.filter((f) => f.id !== event.id);
    newEvents.splice(eventIndex,0,event);
    this.setState({
      events: newEvents
    })
    // updateCalender(this.state.events);
  }

  render(){
      return(
        <div>
          {this.state.isShowing ? <NewEvent handleNewEventSubmit={this.handleNewEventSubmit} toggleNewEventForm={this.toggleNewEventForm}/> : null}
          {this.state.currentArtist.name? <h4> {this.state.currentArtist.name} s calender </h4>:<h4>Calender</h4>}
          <div className ='event_labels row text-center'>
            <br></br>
            <div className='col-md-2'>
            </div>
            <div className='col-md-3'>
              <h5><b>Genre</b></h5>
            </div>
            <div className='col-md-4'>
              <h5><b>Name</b></h5>
            </div>
            <div className='col-md-3'>
              <h5><b>Date</b></h5>
            </div>
          </div>
          <div className='event_list'>
            <AllEvents events={this.state.events} handleDeleteEvent={this.handleDeleteEvent} handleUpdateEvent = {this.handleUpdateEvent}/>
          </div>
      </div>
      )
    }
}

export default EventsBody
