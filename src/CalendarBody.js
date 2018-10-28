import React, { Component } from 'react';
import FullCalendar from 'fullcalendar-reactwrapper';
import './fullcalendar.min.css';
import axios from 'axios'


class CalendarBody extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentArtist:this.props.currentArtist,
      events:this.props.events,
      authToken:this.props.authToken
    }
  }

  componentWillReceiveProps(newProps){
    if(newProps.currentArtist.id){
      axios.get('https://rails-api-ipo.herokuapp.com/api/v1/tasks/artist/'+newProps.currentArtist.id+'.json',{ 'headers': { 'Authorization': this.props.authToken }})
      .then(response => {
      this.setState({ events: response.data });
      })
    }
  }

    render() {
      return (
        <div id="example-component">
          <FullCalendar
               id = "your-custom-ID"
           header = {{
              left: 'prev,next today myCustomButton',
              center: 'title',
              right: 'month,basicWeek,basicDay'
          }}
           defaultDate={'2018-09-12'}
          navLinks= {true} // can click day/week names to navigate views
          editable= {true}
          eventLimit= {true} // allow "more" link when too many events
          events = {this.state.events}
          eventClick = {
            function(calEvent, jsEvent, view, resourceObj) {
              console.log(calEvent.title)
            }
          }
          dayClick= {(date, jsEvent, view) =>this.props.addNewEvent( date.format() )}

      />
        </div>
      );
    }
  }

export default CalendarBody
