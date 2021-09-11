import React, { Component } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";

// import Movies from "./component/Movies";
export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      locationData: {},
      error: false,
      locationImg: "",
      locationInfos: [],
      locationMovie: [],

    };
  }
  submitForm = async (e) => {
    e.preventDefault();
    try {
      const location = e.target.locationName.value;
      console.log("user Input Location: ", location);
      console.log(process.env.REACT_APP_LOCATION_IQ_KEY);
      const response = await axios.get(
        `https://eu1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATION_IQ_KEY}&q=${location}&format=json`
      );
      this.setState({
        locationData: response.data[0],
      });
      const response2 = await axios.get (
        `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATION_IQ_KEY}&center=${this.state.locationData.lat},${this.state.locationData.lon}&format=jpg `
      );
      

      this.setState({
        error: false ,
        locationImg: response2.config.url,
      });



      //here
      const response3 = await axios.get(
        `${process.env.REACT_APP_server_url}/weathers?city=${location}`
      );
// console.log(response3)
      this.setState({
        locationInfos: response3.data,
      });
//to
const response4 = await axios.get(
  `${process.env.REACT_APP_server_url}/movies?query=${location}`
);

this.setState({
  locationMovie: response4.data,
});
// console.log(respones4);



      // console.log("our cs response", this.state.locationMovie);
    } catch (error) {
      console.log("catch error" + error);
      this.setState({
        error: true,
      });
    }
  };
  render() {


    return (
      <div>
        <form onSubmit={this.submitForm}>
          <label
            style={{
              color: "black",
            }}
          >
            Location Name:{" "}
          </label>
          <input name="locationName" type="text" placeholder="Enter Location" />
          <input type="submit" value="Search" />
        </form>
        {!this.state.error &&
          <div>
            <Card
              style={{
                width: "30rem",
                border: "solid",
                backgroundColor: "rgb(135,206,235)",
                color: "pink",
              }}
            >
              <Card.Body
                style={{
                  color: "black",
                }}
              >
                <Card.Title>
                  {" "}
                  Display Name :{this.state.locationData.display_name}
                </Card.Title>
                <Card.Text>latitude : {this.state.locationData.lat}</Card.Text>
                <Card.Text>longitude : {this.state.locationData.lon}</Card.Text>

                {this.state.locationInfos.map(element => {
                  return <Card.Text>Weather : {element.date}    {element.description}</Card.Text>
                })}


              </Card.Body>
            </Card>
            <img src={this.state.locationImg} alt={""} />
          </div>
          
        }


        <div>
          {this.state.error && <p style={{ color: "white", }}>Location not found try again </p>}
          {this.state.locationData.lon && <p style={{ color: "white", }} >The Selected Map </p>}

        </div>
        <div >
        {/* <Movies locationMovie={this.state.locationMovie} /> */}
        </div>
      </div>
    );
  }
}
export default App;