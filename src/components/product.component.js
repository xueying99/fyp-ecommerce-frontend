import React, { Component } from "react";

import ProductDataService from "../services/product.service";

export default class Product extends Component {
    constructor(props) {
        super(props);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeProductname = this.onChangeProductname.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeSize = this.onChangeSize.bind(this);
        this.onChangePrice = this.onChangePrice.bind(this);
        this.onChangeQuantity = this.onChangeQuantity.bind(this);
        this.getProduct = this.getProduct.bind(this);
        this.updatePublished = this.updatePublished.bind(this);
        this.updateProduct = this.updateProduct.bind(this);
        this.deleteProduct = this.deleteProduct.bind(this);

        this.state = {
            currentProduct: {
                id: null,
                title: "",
                productname: "",
                description: "",
                size: "",
                price: "",
                quantity: "",
                published: false,

            },
            message: ""
        };
    }

    componentDidMount() {
        this.getProduct(this.props.match.params.id);
    }

    onChangeTitle(e) {
        const title = e.target.value;

        this.setState(function (prevState) {
            return {
                currentProduct: {
                    ...prevState.currentProduct,
                    title: title
                }
            };
        });
    }

    onChangeProductname(e) {
        const productname = e.target.value;

        this.setState(function (prevState) {
            return {
                currentProduct: {
                    ...prevState.currentProduct,
                    productname: productname
                }
            };
        });
    }

    onChangeDescription(e) {
        const description = e.target.value;

        this.setState(prevState => ({
            currentProduct: {
                ...prevState.currentProduct,
                description: description
            }
        }));
    }

    onChangeSize(e) {
        const size = e.target.value;

        this.setState(prevState => ({
            currentProduct: {
                ...prevState.currentProduct,
                size: size
            }
        }));
    }

    onChangePrice(e) {
        const price = e.target.value;

        this.setState(prevState => ({
            currentProduct: {
                ...prevState.currentProduct,
                price: price
            }
        }));
    }

    onChangeQuantity(e) {
        const quantity = e.target.value;

        this.setState(prevState => ({
            currentProduct: {
                ...prevState.currentProduct,
                quantity: quantity
            }
        }));
    }

    getProduct(id) {
        ProductDataService.get(id)
            .then(response => {
                this.setState({
                    currentProduct: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    updatePublished(status) {
        var data = {
            id: this.state.currentProduct.id,
            title: this.state.currentProduct.title,
            productname: this.state.currentProduct.productname,
            description: this.state.currentProduct.description,
            size: this.state.currentProduct.size,
            price: this.state.currentProduct.price,
            quantity: this.state.currentProduct.quantity,
            published: status
        };

        ProductDataService
            .update(this.state.currentProduct.id, data)
            .then(response => {
                this.setState(prevState => ({
                    currentProduct: {
                        ...prevState.currentProduct,
                        published: status
                    }
                }));
                console.log(response.data);
                alert("Product is PUBLISHED successfully!");
            })
            .catch(e => {
                console.log(e);
            });
    }

    updateProduct() {
        ProductDataService.update(
            this.state.currentProduct.id,
            this.state.currentProduct
        )
            .then(response => {
                console.log(response.data);
                this.setState({
                    message: "The product was updated successsfully!"
                });
            })
            .catch(e => {
                console.log(e);
            });
    }

    deleteProduct() {
        ProductDataService.delete(this.state.currentProduct.id)
            .then(response => {
                console.log(response.data);
                alert("Product is DELETED sucessfully!");
                this.props.history.push('/')
            })
            .catch(e => {
                console.log(e);
            });
    }

    render() {
        const { currentProduct } = this.state;

        return (
            <div className='single-view'>
                {currentProduct ? (
                    <div className='edit-form'>
                        <h4>Product</h4>
                        <div className=' mt-4 mb-4 text-center'>
                            <img src={'http://localhost:8080/api/files/' + currentProduct.title + '.jpg'}></img>
                        </div>
                        <div className='single-div'>
                            <form>
                                <div className='form-group-row'>
                                    <div className='form-group'>
                                        <label htmlFor='title'>Image Name</label>
                                        <input size='30'
                                            type='text'
                                            className='form-control'
                                            id='title'
                                            value={currentProduct.title}
                                            onChange={this.onChangeTitle} />
                                    </div>
                                    <div className='form-group'>
                                        <label htmlfor='productname'>Product Name</label>
                                        <input size='30'
                                            type='text'
                                            className='form-control'
                                            id='productname'
                                            required
                                            value={currentProduct.productname}
                                            onChange={this.onChangeProductname}
                                            name='productname'
                                        />
                                    </div>
                                </div>
                                <div className='form-group-row'>
                                    <div className='form-group'>
                                        <label htmlFor='description'>Description</label>
                                        <input size='82'
                                            type='text'
                                            className='form-control'
                                            id='description'
                                            value={currentProduct.description}
                                            onChange={this.onChangeDescription} />
                                    </div>

                                </div>
                                <div className='form-group-row'>

                                    <div className='form-group'>
                                        <label htmlfor='size'>Size</label>
                                        <select
                                            list="size"
                                            className="form-control"
                                            name="size"
                                            value={currentProduct.size}
                                            onChange={this.onChangeSize}
                                            required >
                                            <option value="S">S</option>
                                            <option value="M">M</option>
                                            <option value="L">L</option>
                                            <option value="XL">XL</option>
                                        </select>
                                    </div>
                                    <div className='form-group'>
                                        <label htmlfor='price'>Price</label>
                                        <input size='15'
                                            type='text'
                                            className='form-control'
                                            id='price'
                                            required
                                            value={currentProduct.price}
                                            onChange={this.onChangePrice}
                                            name='price'
                                        />
                                    </div>
                                    <div className='form-group qty-input'>
                                        <label htmlfor='quantity'>Quantity</label>
                                        <input
                                            type='number'
                                            className='form-control'
                                            id='quantity'
                                            required
                                            value={currentProduct.quantity}
                                            onChange={this.onChangeQuantity}
                                            name='quantity'
                                        />
                                    </div>
                                </div>
                                <div className='pl-5'>
                                    <div className='form-group'>
                                        <label>
                                            <strong>Status: </strong>
                                        </label>{" "}
                                        {currentProduct.published ? "Published" : "Pending"}
                                    </div>

                                </div>
                            </form>
                            <div className='pl-5'>
                                {currentProduct.published ? (
                                    <button className='btn btn-primary mr-4' onClick={() => this.updatePublished(false)}>
                                        Unpublish
                                    </button>
                                ) : (
                                    <button className='btn btn-primary mr-4' onClick={() => this.updatePublished(true)}>
                                        Publish
                                    </button>
                                )}

                                <button className='btn btn-danger mr-4' onClick={this.deleteProduct}>
                                    Delete
                                </button>
                                <button type='submit' className='btn btn-success' onClick={this.updateProduct}>
                                    Update
                                </button>
                                <div className='mt-3'>
                                    <p>{this.state.message}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div></div>
                )}
            </div>
        );
    }
}