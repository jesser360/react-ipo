import React, { Component } from 'react';

class SingleEvent extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      editable: false
    }
    this.handleEditEvent = this.handleEditEvent.bind(this)
  }

  handleEditEvent(){
    if(this.state.editable){
     let title = this.title.value
     let start = this.start.value
     let genre = this.genre.value
     let note = this.note.value
     let id = this.props.event.id
     let event = {id: id, title: title, start: start, genre:genre, note:note}
     this.props.handleUpdateEvent(event)
   }
    this.setState({
      editable: !this.state.editable
    })
  }

  render(){
    let title = this.state.editable ?<input type='text' ref={input => this.title = input} defaultValue={this.props.event.title}/>:<span>{this.props.event.title}</span>
  let start = this.state.editable ?<input type='text' ref={input => this.start = input} defaultValue={new Date(this.props.event.start).toISOString().substr(0,10)} type="date" />:<span>{new Date(this.props.event.start).toLocaleDateString('en-US',{weekday: 'short', year: 'numeric', month: 'short', day: 'numeric',timeZone: 'UTC'})}</span>
    let genre = this.state.editable ?<input type='text' ref={input => this.genre = input} defaultValue={this.props.event.genre}/>:<span>{this.props.event.genre}</span>
    let note = this.state.editable ?<input type='text' ref={input => this.note = input} defaultValue={this.props.event.note}/>:<span>{this.props.event.note}</span>

  if(!this.state.editable){
      return(
          <div>
            <div className ='row'>
              <div className='col-md-2 text-center'>
                <button className='black-btn' onClick={() => this.handleEditEvent()}>Edit</button>
                <button className='black-btn' onClick={() => this.props.handleDeleteEvent(this.props.event.id)}>Delete</button>
              </div>
              <div className='col-md-3 text-center'>
                {genre}
              </div>
              <div className='col-md-4 text-center'>
                <h5><b>{title}</b></h5>
                {note}
              </div>
              <div className='col-md-3 text-center'>
                {start}
              </div>
          </div>
        <hr></hr>
        </div>
        )
    }else{
      return (
        <div>
          <div className ='row'>
            <div className='col-md-2 text-center'>
              <button className='black-btn' onClick={() => this.handleEditEvent()}>Submit</button>
            </div>
            <div className='col-md-8'>
              Genre: {genre}<br></br>
              Title: {title}<br></br>
              Notes : {note}<br></br>
              Date: {start}
            </div>
          </div>
        <hr></hr>
        </div>
      )
    }
  }
}

export default SingleEvent
