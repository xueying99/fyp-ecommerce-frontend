import React, { Component } from "react";
import ReactDOM from "react-dom";
import Grid from "@material-ui/core/Grid";
import "react-image-gallery/styles/css/image-gallery.css";

import ImageGallery from "../layouts/image-gallery";

export default class Image extends Component {
  render() {
    return (
        <div className='container'>
            <div className='mainContainer'>
            <Grid container spacing={4}>
                <Grid item xs={6}>
                <ImageGallery />
                </Grid>
                <Grid container spacing={2} item xs={6} direction="column">
                <Grid item>
                    <div id="myPortal" />
                </Grid>
                </Grid>
            </Grid>
            </div>
        </div>
    );
  }
}

// const rootElement = document.getElementById("root");
// ReactDOM.render(<Image />, rootElement);
