import React, { Component } from "react";

import { withStyles } from "@material-ui/core/styles";
import ReactImageMagnify from "react-image-magnify";

import UploadService from "../services/file-upload.service";

const styles = theme => ({
  root: {}
});

const imageBaseUrl =
  "http://localhost:8080/api/files/dress";
// "./images/women/dress";

class ImageMagnify extends Component {
  constructor(props) {
    super(props);

    this.state = {
      imageInfos: [],
    };
  }

  componentDidMount() {
    UploadService.getFiles().then((response) => {
      this.setState({
        imageInfos: response.data,
      });
    });
  }

  render() {
    return (
      <ReactImageMagnify
        {...{
          smallImage: {
            alt: "",
            isFluidWidth: true,
            src: `${imageBaseUrl}01-1.jpg`,
          },
          largeImage: {
            src: `${imageBaseUrl}01-1.jpg`,
            width: 480,
            height: 480
          },
          enlargedImagePortalId: "myPortal"
        }}
      />
    );
  }
}

export default withStyles(styles)(ImageMagnify);
