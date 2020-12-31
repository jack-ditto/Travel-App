import React from "react";
import Icon from "@material-ui/core/Icon";
import Trip from "./Trip";
import Button from "@material-ui/core/Button";
import { Typography } from "@material-ui/core";
import DataRequest from "../global/DataRequest";

class Intro extends React.Component {
  /**
   * Constructor
   *
   * @param {*} props
   */
  constructor(props) {
    super(props);
    this.dataReq = new DataRequest();
    this.state = {
      trips: [],
    };
  }

  componentDidMount() {
    this.getTrips();
  }

  /**
   * Handle action when go to trip button is clicked
   */
  goClicked = (tripId) => {
    console.log(tripId);
    this.props.setTripView("trip", tripId);
  };

  getTrips = async () => {
    let endpoint = "getTrips";
    let data = await this.dataReq.makeGetReq({}, endpoint);
    if (data.status === "success") {
      console.log(data.rows);
      this.setState({ trips: data.rows });
    }
  };

  editTripClicked = (id) => {
    this.props.setTripView("edit-trip", id);
  };

  render() {
    let tripId = 1;
    const listTrips = this.state.trips.map((d) => {
      let sd = new Date(d.startDate);
      let ed = new Date(d.endDate);
      return (
        <Trip
          key={d.id}
          id={d.id}
          name={d.name}
          startDate={
            this.dataReq.monthNames[sd.getMonth()] +
            " " +
            sd.getDate() +
            ", " +
            sd.getFullYear()
          }
          endDate={
            this.dataReq.monthNames[ed.getMonth()] +
            " " +
            ed.getDate() +
            ", " +
            ed.getFullYear()
          }
          photo={d.image}
          gotoClickedCallback={() => this.goClicked(tripId)}
          updateTrips={this.getTrips}
          editTripClicked={this.editTripClicked}
        ></Trip>
      );
    });
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
          {listTrips}
          {/* <Trip
            name="Peru"
            startDate="January 24, 2020"
            endDate="January 30, 2020"
            photo="https://www.peru.travel/Contenido/AcercaDePeru/Imagen/en/6/0.0/Principal/Machu%20Picchu.jpg"
            gotoClickedCallback={() => this.goClickedCallback(tripId)}
          ></Trip> */}
        </div>
      </div>
    );
  }
}

export default Intro;
