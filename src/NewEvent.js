import React from 'react';

const NewEvent = (props) => {
  let formFields = {}

  return(
    <div className='section_event'>
      <div className='row'>
        <div className='col-md-6'>
          <h6>Create a new event from: </h6>
          <input className ='event_date' defaultValue={props.clickedDate} ref={input => formFields.start = input} placeholder='Start date' type='date'/>
          <h6>Untill: </h6>
          <input className ='event_date' ref={input => formFields.end = input} placeholder='End date' type='date'/>
          All Day? <input className ='all_day' ref={input => formFields.allDay = input} type='checkbox'/>
        </div>
        <div className='col-md-6'>
          Title: <input className ='event_title' ref={input => formFields.title = input} placeholder='ex: Interview'/><br></br>
          Genre: <input className ='event_genre' ref={input => formFields.genre = input} placeholder='ex: Press' /><br></br>
          Notes: <input className ='event_notes' ref={input => formFields.note = input} placeholder='ex: Fader Magazine' />
          <button onClick={() => props.currentEventsToMain(null,false)} className='black-btn'>Close</button>
          <button id='event_submit' className='black-btn' onClick={ () => props.handleNewEventSubmit(formFields.start.value, formFields.end.value, formFields.allDay.checked, formFields.title.value,formFields.genre.value,formFields.note.value)}>Submit</button>
        </div>
      </div>
    <hr></hr>
  </div>
    )
}

export default NewEvent
