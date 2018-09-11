import React, { Component } from 'react';
import FullCalendar from 'fullcalendar-reactwrapper';
import './fullcalendar.min.css';
import axios from 'axios'


class CalendarBody extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentArtist:this.props.currentArtist,
      events:[]
    }
  }

  componentWillReceiveProps(props){
    this.setState({currentArtist: props.id})
      axios.get('http://localhost:3001/api/v1/events/artist/'+props.currentArtist.id+'.json')
      .then(response => {
        this.setState({events: response.data})
      })
      .catch(error => console.log(error))
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
      />
        </div>
      );
    }
  }

export default CalendarBody
