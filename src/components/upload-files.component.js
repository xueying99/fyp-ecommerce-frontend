import React, { Component } from "react";
import '../css/index.css';

import UploadService from "../services/file-upload.service";

export default class UploadImages extends Component {
    constructor(props) {
        super(props);
        this.selectFile = this.selectFile.bind(this);
        this.upload = this.upload.bind(this);
        this.uploadImages = this.uploadImages.bind(this);

        this.state = {
            imageInfos: [],
            selectedFiles: undefined,
            previewImages: [],
            progressInfos: [],
            message: [],
        };
    }

    componentDidMount() {
        UploadService.getFiles().then((response) => {
            this.setState({
                imageInfos: response.data,
            });
        });
    }

    selectFile(event) {
        let images = [];

        for (let i = 0; i < event.target.files.length; i++) {
            images.push(URL.createObjectURL(event.target.files[i]))
        }

        this.setState({
            progressInfos: [],
            message: [],
            selectedFiles: event.target.files,
            previewImages: images
        });
    }

    upload(idx, file) {
        let _progressInfos = [...this.state.progressInfos];

        UploadService.upload(file, (event) => {
            _progressInfos[idx].percentage = Math.round((100 * event.loaded) / event.total);
            this.setState({
                progressInfos: _progressInfos,
            });
        })
            .then(() => {
                this.setState((prev) => {
                    let nextMessage = [...prev.message, "Uploaded the image successfully: " + file.name];
                    return {
                        message: nextMessage
                    };
                });

                return UploadService.getFiles();
            })
            .then((files) => {
                this.setState({
                    imageInfos: files.data,
                });
            })
            .catch(() => {
                _progressInfos[idx].percentage = 0;
                this.setState((prev) => {
                    let nextMessage = [...prev.message, "Could not upload the image: " + file.name];
                    return {
                        progressInfos: _progressInfos,
                        message: nextMessage
                    };
                });
            });
    }


    uploadImages() {
        const selectedFiles = this.state.selectedFiles;

        let _progressInfos = [];

        for (let i = 0; i < selectedFiles.length; i++) {
            _progressInfos.push({ percentage: 0, fileName: selectedFiles[i].name });
        }

        this.setState(
            {
                progressInfos: _progressInfos,
                message: [],
            },
            () => {
                for (let i = 0; i < selectedFiles.length; i++) {
                    this.upload(i, selectedFiles[i]);
                }
            }
        );
    }

    render() {
        const { selectedFiles, previewImages, progressInfos, message, imageInfos } = this.state;

        return (
            <div className=''>
                <header className="jumbotron">
                    <h3><b>IMAGE UPLOAD MANAGEMENT</b></h3>
                </header>
                <div className='image-mgt-container'>
                    <div className="row">
                        <div className="col-8">
                            <label className="btn btn-default p-0">
                                <input type="file" accept="image/*" onChange={this.selectFile} />
                            </label>
                        </div>

                        <div className="col-4 text-right">
                            <button
                                className="btn btn-success"
                                disabled={!selectedFiles}
                                onClick={this.uploadImages}
                            >
                                Upload
                            </button>
                        </div>
                    </div>

                    {previewImages && (
                        <div>
                            {previewImages.map((img, i) => {
                                return <img className="preview" src={img} alt={"image-" + i} key={i} />;
                            })}
                        </div>
                    )}

                    {progressInfos &&
                        progressInfos.map((progressInfo, index) => (
                            <div className="mb-2 mt-2" key={index}>
                                <div className="progress">
                                    <div
                                        className="progress-bar progress-bar-info"
                                        role="progressbar"
                                        aria-valuenow={progressInfo.percentage}
                                        aria-valuemin="0"
                                        aria-valuemax="100"
                                        style={{ width: progressInfo.percentage + "%" }}
                                    >
                                        {progressInfo.percentage}%
                                    </div>
                                </div>
                            </div>
                        ))}

                    {message.length > 0 && (
                        <div className="alert alert-secondary mt-2" role="alert">
                            <ul>
                                {message.map((item, i) => {
                                    return <li key={i}>{item}</li>;
                                })}
                            </ul>
                        </div>
                    )}

                    <div className="card mt-3">
                        <div className="card-header">List of Files</div>
                        <ul className="list-group list-group-flush">
                            {imageInfos &&
                                imageInfos.map((img, index) => (
                                    <li className="list-group-item" key={index}>
                                        <div className=''>
                                        {/* <img src={img.url} alt={img.name} height="80px" /> */}
                                        <p><a href={img.url}>{img.name}</a></p>
                                        </div>
                                    </li>
                                ))}
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

