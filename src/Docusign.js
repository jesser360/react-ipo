import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'

// const auth = new AuthService();
// auth.login();
// auth.handleAuthentication();

  class Docusign extends Component {

    constructor(props) {
        super(props);
        this.state = {
          document:[],
        };
        this.sendDocument = this.sendDocument.bind(this)
      }

      componentDidMount(){
        // console.log(localStorage.getItem('email'))
        //   if (this.Auth.isAuth0Authenticated()) {
        //     this.setState({authToken:localStorage.getItem('access_token')})
        //   }
      }

      sendDocument(){
        axios.post(`http://localhost:3001/api/v1/docusign/`,{ 'headers': { 'Authorization': this.props.authToken}})
        .then((response) => {
            console.log(response)
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

    render(){
      const user_email = localStorage.getItem('name')
      return(
        <div className='container'>
          <div className='row'>
            <div className ='col-md-3'>
              <div>
                <div className ='text-center'>
                  <h4><b>Docusign HomePage</b></h4>
                </div>
                <div className="row">
                  <div className='col-md-6'>
                    <button id='docu_submit' className='black-btn' onClick={ () => this.sendDocument()}>Submit</button>
                  </div>
                </div>
              </div>
          </div>
          </div>
        </div>
      )
    }
  }


export default Docusign;
// export default withAuth(Dashboard);
