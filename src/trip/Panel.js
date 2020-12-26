import React from "react";
import Card from "@material-ui/core/Card";
import Info from "./trip-info/Info";
import Journal from "./trip-journal/Journal";
import Media from "./trip-media/Media";

class Panel extends React.Component {
  /**
   * Constructor
   *
   * @param {*} props
   */
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.currPanel == "info") {
      return (
        <div className="trip--panel">
          <Card className="trip--panel-card">
            <Info></Info>
          </Card>
        </div>
      );
    }

    if (this.props.currPanel == "journal") {
      return (
        <div className="trip--panel">
          <Card className="trip--panel-card">
            <Journal></Journal>
          </Card>
        </div>
      );
    }

    if (this.props.currPanel == "media") {
      return (
        <div className="trip--panel">
          <Card className="trip--panel-card">
            <Media></Media>
          </Card>
        </div>
      );
    }
  }
}

export default Panel;
