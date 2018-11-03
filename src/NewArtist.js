import React,{Component} from 'react';

class NewArtist extends Component{

  constructor(props){
    super(props);
    this.state={
      showCreateNewArtist:false,
      artistImage:null
    }
  }

  toggleShowCreateArtist(){
    this.setState({
      showCreateNewArtist:!this.state.showCreateNewArtist
    })
  }

  fileChangedHandler = (event) => {
    const file = event.target.files[0]
    var reader = new FileReader();
    var url = reader.readAsDataURL(file);
    reader.onloadend = function (e) {
       this.setState({
           artistImage: reader.result
       })
     }.bind(this);
  }

  uploadHandler(){
    this.toggleShowCreateArtist();
  }

  submitAndClose(name,bio,home,image){
    this.props.handleNewArtistSubmit(name,bio,home,image);
    this.toggleShowCreateArtist();
  }

  render(){
    let formFields = {}
    return(
      <div className='section_event text-center'>
        <div className='row'>
          <button onClick={() =>this.toggleShowCreateArtist()}>New Artist</button>
        </div>
        {this.state.showCreateNewArtist ?
        <div>
          <div className='row'>
            Name: <input className ='name' ref={input => formFields.name = input} placeholder='Artist name'/>
          </div>
          <div className='row'>
            Bio: <input className ='bio' ref={input => formFields.bio = input} placeholder='Artist Bio' />
          </div>
          <div className='row'>
            Hometown: <input className ='hometown' ref={input => formFields.hometown = input} placeholder='Hometown' />
          </div>
          <div className='row'>
            Image: <input type="file" onChange={this.fileChangedHandler} ref={input => formFields.image = input}/>
          {this.state.artistImage ?
            <img style={{"height" : "100px", "width" : "100px"}} src={this.state.artistImage}/>

          :
          null}
        </div>
          <button id='event_submit' className='black-btn' onClick={ () => this.submitAndClose(formFields.name.value, formFields.bio.value, formFields.hometown.value,this.state.artistImage)}>Submit</button>
        </div>
        :
        <div></div>
        }
      <hr></hr>
    </div>
      )
    }
}

export default NewArtist
