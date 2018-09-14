import React, { Component } from 'react';
import AuthService from './AuthService';
import 'bootstrap/dist/css/bootstrap.min.css';


class Signup extends Component {
    constructor(){
        super();
        this.handleChange = this.handleChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.Auth = new AuthService();
    }

    componentWillMount(){
    if(this.Auth.loggedIn())
        this.props.history.replace('/');
    }
    handleLogin(){
        this.props.history.replace('/login');
     }
    render() {
        return (
            <div className="center">
                <div className="card">
                    <h1>Signup</h1>
                    <form>
                        <input
                            className="form-item"
                            placeholder="Email goes here..."
                            name="email"
                            type="text"
                            onChange={this.handleChange}
                        />
                        <input
                            className="form-item"
                            placeholder="Password goes here..."
                            name="password"
                            type="password"
                            onChange={this.handleChange}
                        />
                        <input
                            className="form-submit"
                            value="SUBMIT"
                            type="submit"
                            onClick={this.handleFormSubmit}

                        />
                    </form>
                    <h1></h1>
                    <div className='row'>
                      <div className='col-md-3'>
                        <button type="button" className="form-submit" onClick={this.handleLogin.bind(this)}>Login</button>
                      </div>
                    </div>
                </div>
            </div>
        );
    }

    handleChange(e){
        this.setState(
            {
                [e.target.name]: e.target.value
            }
        )
    }

    handleFormSubmit(e){
           e.preventDefault();
           this.Auth.signup(this.state.email,this.state.password)
               .then(res =>{
                  this.props.history.replace('/');
               })
               .catch(err =>{
                 console.log('err')
                   alert(err);
               })
       }
}

export default Signup;
