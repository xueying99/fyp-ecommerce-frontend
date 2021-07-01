import React, { Component } from "react";

import ReactImageMagnify from "react-image-magnify";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  root: {}
});

const imageBaseUrl =
  "./images/women/dress";
const images = [
  { name: "01-1.jpg" },
  { name: "01-2.jpg" },
  { name: "01-3.jpg" },
  { name: "01-4.jpg" }
//   { name: "wristwatch_770.jpg", vw: "770w" },
//   { name: "wristwatch_861.jpg", vw: "861w" },
//   { name: "wristwatch_955.jpg", vw: "955w" },
//   { name: "wristwatch_1033.jpg", vw: "1033w" },
//   { name: "wristwatch_1112.jpg", vw: "1112w" },
//   { name: "wristwatch_1192.jpg", vw: "1192w" },
//   { name: "wristwatch_1200.jpg", vw: "1200w" }
];

class ImageMagnify extends Component {
    get srcSet() {
        return images
          .map(image => {
            return `${imageBaseUrl}${image.name} ${image.vw}`;
          })
          .join(", ");
      }
    render() {
    return (
      <ReactImageMagnify
        {...{
          smallImage: {
            alt: "",
            isFluidWidth: true,
            src: `{imageBaseUrl}{this.srcSet}`
          },
          largeImage: {
            src: `{imageBaseUrl}{this.srcSet}`,
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
