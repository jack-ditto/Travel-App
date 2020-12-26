import React from "react";
import Card from "@material-ui/core/Card";
import Icon from "@material-ui/core/Icon";
import Button from "@material-ui/core/Button";
import { Typography } from "@material-ui/core";
import Box from "@material-ui/core/Box";

class Trip extends React.Component {
  /**
   * Constructor
   *
   * @param {*} props
   */
  constructor(props) {
    super(props);

    // Destination name
    this.name = props.name;

    // Start date / end date
    this.startDate = props.startDate;
    this.endDate = props.endDate;

    // Cover pic
    this.photo = props.photo;
  }

  render() {
    return (
      <Card className="intro--trip-card">
        <img className="trip-card-photo" src={this.photo}></img>
        <div className="intro--trip-card-title-wrapper">
          <Typography className="intro--trip-card-title" variant="h6">
            <Box fontWeight={500}>{this.name}</Box>
          </Typography>
          <span></span>
          <Typography className="intro--trip-card-title" variant="subtitle1">
            <Box letterSpacing={.1}>
              {this.startDate} - {this.endDate}
            </Box>
          </Typography>
        </div>
        <div className="intro--trip-card-actions-wrapper">
          <Button
            className="intro--trip-card-goto-btn"
            onClick={this.props.gotoClickedCallback}
            color="primary"
            variant="contained"
          >
            Go to this trip
            <Icon fontSize="small">arrow_forward</Icon>
          </Button>
          <Button
            size="small"
            variant="contained"
            className="intro--trip-card-edit-btn"
          >
            Edit
          </Button>
          <Button
            size="small"
            color="secondary"
            className="intro--trip-card-delete-btn"
            variant="contained"
          >
            Delete
          </Button>
        </div>
      </Card>
    );
  }
}

export default Trip;
