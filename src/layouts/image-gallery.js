import React, { Component } from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import ReactImageMagnify from "react-image-magnify";
import { withStyles } from "@material-ui/core/styles";
import ImageMagnify from "./image-magnify";

const PREFIX_URL = './images/women/dress';

class ReactImageGallery extends Component {
  myRenderItem() {
    return <ImageMagnify {...this.props} />;
  }

constructor() {
    super();
    this.state = {
      showIndex: false,
      showBullets: true,
      infinite: true,
      showThumbnails: true,
      showFullscreenButton: true,
      showGalleryFullscreenButton: true,
      thumbnailPosition: 'bottom',
      showVideo: {},
      renderItem: this.myRenderItem.bind(this)

    };

    this.images = [
      {
        thumbnail: `${PREFIX_URL}02-1.jpg`,
        original: `${PREFIX_URL}02-1.jpg`,
        description: 'Render custom slides within the gallery',
      },
      {
        original: `${PREFIX_URL}02-2.jpg`,
        thumbnail: `${PREFIX_URL}02-2.jpg`,
      },
      {
        original: `${PREFIX_URL}01-3.jpg`,
        thumbnail: `${PREFIX_URL}01-3.jpg`,
        originalClass: 'featured-slide',
        thumbnailClass: 'featured-thumb',
        description: 'Custom class for slides & thumbnails dress03'
      },
      {
        original: `${PREFIX_URL}01-4.jpg`,
        thumbnail: `${PREFIX_URL}01-4.jpg`,
        originalClass: 'featured-slide',
        thumbnailClass: 'featured-thumb',
        description: 'Custom class for slides & thumbnails'
      },
    ].concat(this._getStaticImages());
  }

  _onImageClick(event) {
    console.debug('clicked on image', event.target, 'at index', this._imageGallery.getCurrentIndex());
  }

  _onImageLoad(event) {
    console.debug('loaded image', event.target.src);
  }

  _onScreenChange(fullScreenElement) {
    console.debug('isFullScreen?', !!fullScreenElement);
  }

  _getStaticImages() {
    let images = [];
    for (let i = 2; i < images.length; i++) {
      images.push({
        original: `${PREFIX_URL}${i}.jpg`,
        thumbnail:`${PREFIX_URL}${i}t.jpg`
      });
    }

    return images;
  }

  _resetVideo() {
    this.setState({showVideo: {}});

    if (this.state.showFullscreenButton) {
      this.setState({showGalleryFullscreenButton: true});
    }
  }

  render() {
    return (

      <section className='app'>
        <ImageGallery
          ref={i => this._imageGallery = i}
          items={this.images}
          lazyLoad={false}
          onClick={this._onImageClick.bind(this)}
          onImageLoad={this._onImageLoad}
          onScreenChange={this._onScreenChange.bind(this)}
          infinite={this.state.infinite}
          showBullets={this.state.showBullets}
          showFullscreenButton={this.state.showFullscreenButton && this.state.showGalleryFullscreenButton}
          showThumbnails={this.state.showThumbnails}
          additionalClass="app-image-gallery"
        />

        <div className='app-sandbox'>

          <div className='app-sandbox-content'>
            {/* <h2 className='app-header'>Settings</h2> */}
          </div>

        </div>
      </section>
    );
  }
}

export default ReactImageGallery;
