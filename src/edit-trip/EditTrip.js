import React from "react";
import TextField from "@material-ui/core/TextField";
import Icon from "@material-ui/core/Icon";
import Button from "@material-ui/core/Button";
import DateFnsUtils from "@date-io/date-fns";
import Alert from "@material-ui/lab/Alert";

import "date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DataRequest from "../global/DataRequest";

class EditTrip extends React.Component {
  /**
   * Constructor
   *
   * @param {*} props
   */
  constructor(props) {
    super(props);
    this.dataReq = new DataRequest();

    this.state = {
      destination: "",
      startDate: new Date(),
      endDate: new Date(),
      image: "",
    };

    this.error = false;
    this.errorMsg = "";
  }

  componentDidMount() {
    this.dataReq
      .makeGetReq({ id: this.props.currTripId }, "getTrip")
      .then((data) => {
        let tripData = data.rows[0];
        this.setState({
          id: tripData.id,
          destination: tripData.name,
          startDate: new Date(tripData.startDate),
          endDate: new Date(tripData.endDate),
          image: tripData.image,
        });
      });
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
      // [name]: `${d.getMonth()}/${d.getDate()}/${d.getFullYear()}`,
      [name]: d,
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
  updateTrip = async () => {
    let endpoint = "updateTrip";
    let data = {
      id: this.state.id,
      name: this.state.destination,
      startDate: this.state.startDate,
      endDate: this.state.endDate,
      image: this.state.image,
    };

    this.error = false;
    this.errorMsg = "";

    // Input validation
    if (this.state.endDate < this.state.startDate) {
      this.error = true;
      this.errorMsg = "Start date cannot be after end date.";
    } else if (!this.state.destination) {
      this.error = true;
      this.errorMsg = "Destination cannot be blank.";
    } else if (
      this.state.endDate.getDate() === this.state.startDate.getDate() &&
      this.state.endDate.getMonth() === this.state.startDate.getMonth() &&
      this.state.endDate.getFullYear() === this.state.startDate.getFullYear()
    ) {
      this.error = true;
      this.errorMsg = "Start and end dates cannot be the same.";
    } else {
      this.error = false;
      this.errorMsg = "";
    }

    if (!this.error) {
      await this.dataReq.makePostReq(data, endpoint);
      this.props.setNewView("intro");
    } else {
      this.setState({ showAlert: true, alertMsg: this.errorMsg });
    }
  };

  showAlertBox = () => {
    if (this.state.showAlert) {
      return (
        <Alert className="alert-box" variant="filled" severity="error">
          {this.state.alertMsg}
        </Alert>
      );
    } else {
      return "";
    }
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
          <h3>Edit your trip</h3>
          <Icon fontSize="small">add</Icon>
        </div>
        <hr className="title-divider"></hr>
        <div className="new-trip--description-wrapper">
          <p>Make any changes to your trip.</p>
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
            Update cover photo
            <input onChange={this.onFileChange} type="file" hidden />
          </Button>
          <Button
            variant="contained"
            component="label"
            size="large"
            onClick={this.updateTrip}
            color="primary"
          >
            Save your trip!
          </Button>
        </div>
        {this.showAlertBox()}
      </div>
    );
  }
}

export default EditTrip;
