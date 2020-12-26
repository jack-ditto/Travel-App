import { Box, Paper, Tab, Tabs, Typography } from "@material-ui/core";
import React from "react";
import Content from "./Content";

class Media extends React.Component {
  /**
   * Constructor
   *
   * @param {*} props
   */
  constructor(props) {
    super(props);
    this.state = {
      mediaSelectVal: 0,
    };
  }

  handleChange = (newValue) => {
    this.setState({
      mediaSelectVal: newValue,
    });
  };

  render() {
    return (
      <div>
        <Paper elevation={3} className="media--title-paper">
          <Typography variant="h4">
            <Box textAlign="center">Media</Box>
          </Typography>
          <Typography variant="subtitle">
            <Box textAlign="center" marginTop={1}>
              12/22/2020
            </Box>
          </Typography>
        </Paper>
        <Paper elevation={2} square className="media--type-tabs-wrapper">
          <Tabs
            value={this.state.mediaSelectVal}
            indicatorColor="primary"
            textColor="primary"
          >
            <Tab label="Photos" onClick={() => this.handleChange(0)} />
            <Tab label="Videos" onClick={() => this.handleChange(1)} />
          </Tabs>
        </Paper>
        <Content mediaType={this.state.mediaSelectVal}></Content>
      </div>
    );

  }
}

export default Media;
