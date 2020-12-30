import React from "react";
import TextField from "@material-ui/core/TextField";
import Icon from "@material-ui/core/Icon";
import Button from "@material-ui/core/Button";

import DateFnsUtils from "@date-io/date-fns";
import "date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

class NewTrip extends React.Component {
  /**
   * Constructor
   *
   * @param {*} props
   */
  constructor(props) {
    super(props);

    this.imageSrc =
      "https://www.civhc.org/wp-content/uploads/2018/10/question-mark.png";

    this.state = {
      destination: "",
      startDate: new Date(),
      endDate: new Date(),
      image: this.imageSrc,
    };
  }

  /**
   * Update state (and therefore the date picker) on date change
   *
   * @param {string} date
   * @param {string} name
   */
  handleDateChange = (date, name) => {
    let d = new Date(date);

    this.setState({
      ...this.state,
      [name]: `${d.getMonth()}/${d.getDate()}/${d.getFullYear()}`,
    });
  };

  /**
   * Update state (and therefore text input) on change
   *
   * @param {*} event
   */
  handleInputChange = (event) => {
    const value = event.target.value;
    this.setState({ ...this.state, [event.target.name]: value });
  };

  /**
   * Update the state on file select
   *
   * @param {*} event
   */
  onFileChange = (event) => {
    let reader = new FileReader();
    reader.onload = function (e) {
      this.setState({ image: e.target.result });
    }.bind(this);

    reader.readAsDataURL(event.target.files[0]);
  };

  /**
   * Send a post request to the backend server to add a trip to the databaseƒ
   */
  addNewTrip = () => {
    // Simple POST request with a JSON body using fetch
    console.log("Making request!");
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: this.state.destination,
        startDate: this.state.startDate,
        endDate: this.state.endDate,
        image: this.state.image,
      }),
    };
    fetch("http://localhost:8888/addTrip", requestOptions)
      .then((response) => console.log(response.json()))
      .then((data) => {
        console.log(data);
      });
  };

  render() {
    const selectionRange = {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    };
    return (
      <div>
        <Button
          onClick={() => this.props.setNewView("intro")}
          variant="contained"
          className="back-button"
          position="absolute"
        >
          <Icon style={{ marginRight: "10px" }}>arrow_back</Icon>go back
        </Button>
        <div className="title-wrapper new-trip--title-wrapper">
          <h3>Begin a new trip</h3>
          <Icon fontSize="small">add</Icon>
        </div>
        <hr className="title-divider"></hr>
        <div className="new-trip--description-wrapper">
          <p>You can come back and edit this info at any time.</p>
        </div>
        <div className="new-trip--inputs-wrapper">
          <TextField
            className="new-trip--input new-trip--dest-input"
            label="Destination"
            spellCheck="false"
            value={this.state.destination}
            onChange={this.handleInputChange}
            name="destination"
          ></TextField>
          <div className="new-trip--time-range-wrapper">
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <h4>From</h4>
              <KeyboardDatePicker
                disableToolbar
                className="new-trip--input"
                variant="inline"
                format="MM/dd/yyyy"
                margin="normal"
                id="date-picker-inline"
                label="Trip start date"
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
                value={this.state.startDate}
                onChange={(date) => this.handleDateChange(date, "startDate")}
              />
              <h4>Till</h4>
              <KeyboardDatePicker
                disableToolbar
                className="new-trip--input"
                variant="inline"
                format="MM/dd/yyyy"
                margin="normal"
                id="date-picker-inline"
                label="Trip end date"
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
                value={this.state.endDate}
                onChange={(date) => this.handleDateChange(date, "endDate")}
              />
            </MuiPickersUtilsProvider>
          </div>
          <div>
            <img
              id="cover-photo-upload"
              className="new-trip--trip-card-photo trip-card-photo"
              src={this.state.image}
            ></img>
            <p className="new-trip--trip-photo-desc">Current cover photo</p>
          </div>
          <Button variant="contained" component="label">
            Upload a cover photo
            <input onChange={this.onFileChange} type="file" hidden />
          </Button>
          <Button
            variant="contained"
            component="label"
            size="large"
            onClick={this.addNewTrip}
            color="primary"
          >
            Save your trip!
          </Button>
        </div>
      </div>
    );
  }
}

export default NewTrip;
