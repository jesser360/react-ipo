import React from 'react';
import SingleEvent from './SingleEvent';

const AllEvents = (props) => {
var events = props.events.map((event) => {
    return(
      <div key={event.id ||  Math.floor(Math.random()*101)}>
        <SingleEvent event ={event} handleDeleteEvent ={props.handleDeleteEvent} handleUpdateEvent={props.handleUpdateEvent}/>
      </div>
    )
  })
return(
      <div>
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
        {events}
      </div>
    )
}

export default AllEvents;
