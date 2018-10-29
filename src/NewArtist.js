import React from 'react';

const NewArtist = (props) => {
  let formFields = {}

  return(
    <div className='section_event text-center'>
      <div className='row'>
        <h3>Create new artist</h3>
      </div>
      <div className='row'>
        Name: <input className ='name' ref={input => formFields.name = input} placeholder='Artist name'/>
      </div>
      <div className='row'>
        Bio: <input className ='bio' ref={input => formFields.bio = input} placeholder='Artist Bio' />
      <div className='row'>
        Hometown: <input className ='hometown' ref={input => formFields.hometown = input} placeholder='Hometown' />
      </div>
      <button id='event_submit' className='black-btn' onClick={ () => props.handleNewArtistSubmit(formFields.name.value, formFields.bio.value, formFields.hometown.value)}>Submit</button>
    </div>
    <hr></hr>
  </div>
    )
}

export default NewArtist
