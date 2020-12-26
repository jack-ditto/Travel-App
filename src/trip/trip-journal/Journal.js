import { Box, Typography, Card, Paper } from "@material-ui/core";
import React from "react";

class Journal extends React.Component {
  /**
   * Constructor
   *
   * @param {*} props
   */
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Paper elevation={3} className="journal--title-paper">
          <Typography variant="h4">
            <Box textAlign="center">
              Day 4
            </Box>
          </Typography>
          <Typography variant="subtitle">
            <Box textAlign="center" marginTop={1}>
              12/22/2020
            </Box>
          </Typography>
        </Paper>
        <textarea placeholder="You've got a blank slate. Write about your day!" className="journal--text-area"></textarea>
      </div>
    );
  }
}

export default Journal;
