import React from "react";
import Card from "react-bootstrap/Card";
import "bootstrap/dist/css/bootstrap.min.css";
import Moovi from "./Moovi";
class Movies extends React.Component {
  render() {
    console.log(this.props);
    return (
      <>

          {this.props.locationMovie.map((element) => {
            return (
              <Card
                style={{
                  width: "30rem",
                  border: "solid",
                  background: "white",
                  color: "white",
                  margin: "10px",
                }}
              >
                <Card.Body
                  style={{
                    color: "black",
                  }}
                >
                  <Card.Title>Movie</Card.Title>

                  <Card.Text>
                    {" "}
                    <Moovi  movieInfo={element} />
                  </Card.Text>

                  <Card.Img
                    variant="top"
                    src={`https://image.tmdb.org/t/p/w500${element.img} `}
                    alt={element.title}
                  />
                </Card.Body>
              </Card>
            );
          })}
    
      </>
    );
  }
}

export default Movies;