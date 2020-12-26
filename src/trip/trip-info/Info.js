import { Box, Icon, Paper, Typography } from "@material-ui/core";
import React from "react";


class Info extends React.Component {
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
      <div className="info--dashboard-wrapper">
        <div className="info--dashboard-text">
          <Paper elevation="3">
          <Typography variant="h4" >
            <Box textAlign="center" paddingTop={1} paddingBottom={1}>
              Peru
            </Box>
          </Typography>
          </Paper>
        </div>
        <Paper id="a1" elevation={3} className="info--dashboard-paper">
          <Icon fontSize="large" color="">
            create
          </Icon>
          <Typography variant="h3" color="">
            <Box marginTop={3} textAlign="center">
              8
            </Box>
          </Typography>
          <Typography variant="h5" color="">
            <Box
              textAlign="center"
              marginTop={3}
              width={100}
              className="info--dashboard-paper-title-wrapper"
            >
              Journals
            </Box>
          </Typography>
        </Paper>
        <Paper id="a2" elevation={3} className="info--dashboard-paper">
          <Icon fontSize="large" color="">
            insert_photo
          </Icon>
          <Typography variant="h3" color="">
            <Box marginTop={3} textAlign="center">
              13
            </Box>
          </Typography>
          <Typography variant="h5" color="">
            <Box
              textAlign="center"
              marginTop={3}
              width={100}
              className="info--dashboard-paper-title-wrapper"
            >
              Photos
            </Box>
          </Typography>
        </Paper>
        <Paper id="a3" elevation={3} className="info--dashboard-paper">
          <Icon fontSize="large" color="">
            play_arrow
          </Icon>
          <Typography variant="h3" color="">
            <Box marginTop={3} textAlign="center">
              10
            </Box>
          </Typography>
          <Typography variant="h5" color="">
            <Box
              textAlign="center"
              marginTop={3}
              width={100}
              className="info--dashboard-paper-title-wrapper"
            >
              Videos
            </Box>
          </Typography>
        </Paper>
        <Paper id="a4" elevation={3} className="info--dashboard-paper-review">
          <Typography variant="h6" color="">
            <Box textAlign="center" marginTop={2}>Trip Review:</Box>
          </Typography>
            <textarea placeholder="Use this space to write a short review of your trip." className="info--dashboard-paper-textarea"></textarea>
        </Paper>
      </div>
    );
  }
}

export default Info;
