import React, { Component } from 'react';
import SingleEvent from './SingleEvent';

const AllEvents = (props) => {
var events = props.events.map((event) => {
    return(
      <div key={event.id}>
        <SingleEvent event ={event} handleDeleteEvent ={props.handleDeleteEvent} handleUpdateEvent={props.handleUpdateEvent}/>
      </div>
    )
  })
return(
      <div>
        {events}
      </div>
    )
}

export default AllEvents;
