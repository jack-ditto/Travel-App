import React from "react";
import Icon from "@material-ui/core/Icon";
import Trip from "./Trip";
import Button from "@material-ui/core/Button";
import { Typography } from "@material-ui/core";

class Intro extends React.Component {
  /**
   * Constructor
   *
   * @param {*} props
   */
  constructor(props) {
    super(props);
  }

  /**
   * Handle action when go to trip button is clicked
   */
  goClickedCallback = (tripId) => {
    console.log(tripId);
    this.props.setTripView("trip", tripId);
  };

  render() {
    let tripId = 1;
    return (
      <div className="intro-wrapper">
        <div className="title-wrapper">
          <h3>Jack's Travel Log</h3>
          <Icon fontSize="small">flight</Icon>
        </div>
        <hr className="title-divider"></hr>
        <Typography className="intro--start-description" variant="button">
          Select a trip or{" "}
          <Button
            onClick={() => this.props.setNewView("new-trip")}
            variant="contained"
            size="small"
            className="intro--start-description-btn"
          >
            begin a new one.
          </Button>
        </Typography>
        <div className="intro--new-trip-wrapper"></div>
        <div className="info--trip-cards-wrapper">
          {/* TODO: This is where we will fetch database and list app Trips */}
          <Trip
            name="Peru"
            startDate="January 24, 2020"
            endDate="January 30, 2020"
            photo="https://www.peru.travel/Contenido/AcercaDePeru/Imagen/en/6/0.0/Principal/Machu%20Picchu.jpg"
            gotoClickedCallback={() => this.goClickedCallback(tripId)}
          ></Trip>
          <Trip
            name="Peru"
            startDate="January 24, 2020"
            endDate="January 30, 2020"
            photo="https://www.peru.travel/Contenido/AcercaDePeru/Imagen/en/6/0.0/Principal/Machu%20Picchu.jpg"
            gotoClickedCallback={() => this.goClickedCallback(tripId)}
          ></Trip>
          <Trip
            name="Peru"
            startDate="January 24, 2020"
            endDate="January 30, 2020"
            photo="https://www.peru.travel/Contenido/AcercaDePeru/Imagen/en/6/0.0/Principal/Machu%20Picchu.jpg"
            gotoClickedCallback={() => this.goClickedCallback(tripId)}
          ></Trip>
          <Trip
            name="Peru"
            startDate="January 24, 2020"
            endDate="January 30, 2020"
            photo="https://www.peru.travel/Contenido/AcercaDePeru/Imagen/en/6/0.0/Principal/Machu%20Picchu.jpg"
            gotoClickedCallback={() => this.goClickedCallback(tripId)}
          ></Trip>
        </div>
      </div>
    );
  }
}

export default Intro;
