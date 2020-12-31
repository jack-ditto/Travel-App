import "./App.css";
import React from "react";
import ReactDOM from "react-dom";
import Intro from "./intro/Intro";
import NewTrip from "./new-trip/NewTrip";
import Trip from "./trip/Trip";
import EditTrip from "./edit-trip/EditTrip";

class ViewController extends React.Component {
  /**
   * Constructor
   *
   * @param {*} props
   */
  constructor(props) {
    super(props);
    this.state = { view: "intro", currTripId: "none" };
  }

  /**
   * Callback to update the view
   *
   * @param {string} newView a string representing the desired view (intro, new-trip)
   */
  setNewView = (newView) => {
    this.setState({ view: newView });
  };

  /**
   * Callback to update the view to a trip. Basically the same as setNewView but allows an
   * ID to be set for the trip view.
   *
   * @param {*} newView
   * @param {*} id
   */
  setTripView = (newView, id) => {
    console.log(id);
    this.setState({ view: newView, currTripId: id });
  };

  render() {
    if (this.state.view === "intro") {
      return (
        <Intro
          setNewView={this.setNewView}
          setTripView={this.setTripView}
        ></Intro>
      );
    }

    if (this.state.view === "new-trip") {
      return (
        <NewTrip
          setNewView={this.setNewView}
          setTripView={this.setTripView}
        ></NewTrip>
      );
    }

    if (this.state.view === "trip") {
      return (
        <Trip
          setNewView={this.setNewView}
          currTripId={this.state.currTripId}
        ></Trip>
      );
    }

    if (this.state.view === "edit-trip") {
      return (
        <EditTrip
          setNewView={this.setNewView}
          setTripView={this.setTripView}
          currTripId={this.state.currTripId}
        ></EditTrip>
      );
    }
  }
}

function App() {
  return <ViewController></ViewController>;
}

export default App;
