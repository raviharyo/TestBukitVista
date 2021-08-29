import React, { Component } from 'react';
import './App.css';
import API_URL from './support/API_URL'
import axios from 'axios'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      data: [],
      detailsData: {
        booking_code: "",
        guest_name: "",
        property_name: "",
        check_in_date: "",
        check_out_date: "",
        arrival_time: "",
        profile_picture: ""
      },
      bookingCode: "",
      newArrivalTime:""
     }
  }
 

  getdata = (bookingcode) => {
    axios
      .get(`${API_URL}/bookings/${bookingcode}`)
      .then(res => {
        this.setState({
          detailsData: res.data
        })
      })
      .catch(err => console.error(err));
  }
  onChangeAlphaNumericInput = (value) => {
    const regex = /^[0-9A-Z]+$/;
    if (value.match(regex) || value === "") {
      this.setState({ bookingCode: value });
      this.getdata(value)
    }
  }

  onClickSaveTime = () => {
    axios
      .put(`${API_URL}/bookings/${this.state.detailsData.booking_code}/update-eta`,
      {arrival_time: this.state.newArrivalTime}
      )
      .then(res => {
        this.setState({
          detailsData: res.data
        })
        alert("Input Time Success!")
      })
      .catch(err => alert("error bos"));
  }
  
  render() { 
    const {detailsData} = this.state
    return ( 
      <div className="all">

      <div className='row'>
        <div className='col-md-2'>

        </div>
        <div className='col-md-6'>
        
          <p className='mt-5'>Your Booking Code:</p>
          <input type="text" class="form-control" onChange={(e) =>
           {
         
             this.onChangeAlphaNumericInput(e.target.value)
           }
           
            } value={this.state.bookingCode} />

          <div className='nampilkan' >
            {detailsData.booking_code ? <>
              <img className='mt-4' src={detailsData.profile_picture}></img>
              <p className='mt-2'>Hi, {detailsData.guest_name}!</p>
              <p>Thank you for booking with Bukit Vista, Here are the details of yout current booking:</p>
              <p>Property Name: {detailsData.property_name}</p>
              <div className='row'>
              <div className='col-md-6'>
              <p>Check in Date: {detailsData.check_in_date}</p>

              </div>
              <div className='col-md-6'>
              <p>Check out Date: {detailsData.check_out_date}</p>

              </div>
              </div>
              
              {detailsData.arrival_time ? 
              <div className='row'>
              <div className='col-md-4'>
                  <p>Arrival Time: {detailsData.arrival_time} </p>
              </div>
              <div className='col-md-1' > 
                  <button type="button" className='btn btn-info btn-sm' onClick={()=>{
                   this.setState({
                     detailsData: {...detailsData, arrival_time:""}
                   }) 
                  }}
                  >EDIT</button> 
              </div>
              </div>
              :
                  <div>
              <input type="time" onChange={(e)=>{
                this.setState({
                  newArrivalTime: e.target.value
                })
              }}></input>
               <p style={{color:'red'}}>Please Set your Arrival Time</p>
               
               <br></br>
              <button type="button" className='mt-2 btn btn-primary ' onClick={this.onClickSaveTime}>SAVE</button> 
               
                </div>}
            </>
            :
            <p style={{color: 'red'}}>Input the correct Booking code!</p>
            }
            
            
            </div>
            </div>
            </div>

      </div>
      
     );
  }
}
 
export default App;


