import React from "react";
import Card from "@material-ui/core/Card";
import { CardContent, Icon } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import DateFnsUtils from "@date-io/date-fns";
import "date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

class Toolbar extends React.Component {
  /**
   * Constructor
   *
   * @param {} props
   */
  constructor(props) {
    super(props);
    this.state = {
      currDate: new Date(),
    };
  }

  /**
   * Update state (and therefore the date picker) on date change
   *
   * @param {string} date
   * @param {string} name
   */
  handleDateChange = (date, name) => {
    console.log(date);
    this.setState({ ...this.state, [name]: date });
  };

  incrementDate = () => {
    var result = new Date(this.state.currDate);
    result.setDate(result.getDate() + 1);
    this.setState({ currDate: result });
  };

  decrementDate = () => {
    var result = new Date(this.state.currDate);
    result.setDate(result.getDate() - 1);
    this.setState({ currDate: result });
  };

  render() {
    return (
      <div className="trip--toolbar">
        <Card className="trip--toolbar-card">
          <CardContent className="trip--toolbar-card-content">
            <Button
              variant="contained"
              color="primary"
              size="large"
              className="trip--toolbar-btn"
              onClick={() => this.props.updatePanelState("info")}
            >
              Trip Info <Icon className="trip--toolbar-icon">info</Icon>
            </Button>
            <Button
              variant="contained"
              color="primary"
              size="large"
              className="trip--toolbar-btn"
              onClick={() => this.props.updatePanelState("journal")}
            >
              Journal <Icon className="trip--toolbar-icon">edit</Icon>
            </Button>
            <Button
              variant="contained"
              color="primary"
              size="large"
              className="trip--toolbar-btn"
              onClick={() => this.props.updatePanelState("media")}
            >
              Media <Icon className="trip--toolbar-icon">perm_media</Icon>
            </Button>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                disableToolbar
                className="trip--date-input"
                variant="inline"
                format="MM/dd/yyyy"
                margin="normal"
                id="date-picker-inline"
                label="Current Date"
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
                value={this.state.currDate}
                onChange={(date) => this.handleDateChange(date, "currDate")}
              />
            </MuiPickersUtilsProvider>
            <div className="trip--date-btns-wrapper">
              <Button variant="contained" onClick={this.decrementDate}>
                <Icon>arrow_left</Icon>
              </Button>
              <Button variant="contained" onClick={this.incrementDate}>
                <Icon>arrow_right</Icon>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
}

export default Toolbar;
