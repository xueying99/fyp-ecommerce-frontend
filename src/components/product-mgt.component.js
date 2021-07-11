import React, { Component } from "react";
import { Link } from "react-router-dom";

import ProductDataService from "../services/product.service";

export default class ProductManagement extends Component {
    constructor(props) {
        super(props);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeCategory = this.onChangeCategory.bind(this);
        this.onChangeProductname = this.onChangeProductname.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeSize = this.onChangeSize.bind(this);
        this.onChangePrice = this.onChangePrice.bind(this);
        this.onChangeQuantity = this.onChangeQuantity.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.retrieveProducts = this.retrieveProducts.bind(this);
        this.setActiveProduct = this.setActiveProduct.bind(this);
        this.removeAllProducts = this.removeAllProducts.bind(this);
        this.saveProduct = this.saveProduct.bind(this);
        this.newProduct = this.newProduct.bind(this);

        this.state = {
            products: [],
            currentProduct: null,
            currentIndex: -1,

            id: null,
            title: "",
            category: "",
            productname: "",
            description: "",
            size: "",
            price: 0.00,
            quantity: 10,
            published: false,

            submitted: false,
            message: ""
        };
    }

    componentDidMount() {
        this.refreshList();
        this.retrieveProducts();
    }

    retrieveProducts() {
        ProductDataService.getAll()
            .then(response => {
                this.setState({
                    products: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            })
    }

    refreshList() {
        this.retrieveProducts();
        this.setState({
            currentProduct: null,
            currentIndex: -1
        });
    }

    setActiveProduct(product, index) {
        this.setState({
            currentProduct: product,
            currentIndex: index
        });
    }

    removeAllProducts() {
        ProductDataService.deleteAll()
            .then(response => {
                console.log(response.data);
                this.refreshList();
            })
            .catch(e => {
                console.log(e);
            });
    }

    onChangeTitle(e) {
        this.setState({
            title: e.target.value
        });
    }

    onChangeCategory(e) {
        this.setState({
            category: e.target.value
        });
    }

    onChangeProductname(e) {
        this.setState({
            productname: e.target.value
        });
    }

    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        });
    }

    onChangeSize(e) {
        this.setState({
            size: e.target.value
        });
    }

    onChangePrice(e) {
        this.setState({
            price: e.target.value
        });
    }

    onChangeQuantity(e) {
        this.setState({
            quantity: e.target.value
        });
    }

    saveProduct() {
        var data = {
            title: this.state.title,
            category: this.state.category,
            productname: this.state.productname,
            description: this.state.description,
            size: this.state.size,
            price: this.state.price,
            quantity: this.state.quantity
        };

        ProductDataService.create(data)
            .then(response => {
                this.setState({
                    id: response.data.id,
                    title: response.data.title,
                    category: response.data.category,
                    productname: response.data.productname,
                    description: response.data.description,
                    size: response.data.size,
                    price: response.data.price,
                    quantity: response.data.quantity,
                    published: response.data.published,

                    submitted: true,
                    message: "New Product CREATED successfully!"
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
                alert("Failed! Please check all details cannot be empty / Product name already existed.")
            });
    }

    newProduct() {
        this.setState({
            id: null,
            title: "",
            category: "",
            productname: "",
            description: "",
            size: "",
            price: "",
            quantity: "",
            published: false,

            submitted: false
        });
    }


    render() {
        const { products, currentProduct, currentIndex } = this.state;


        return (
            <div className=''>
                <header className="jumbotron">
                    <h3><b>PRODUCT MANAGEMENT</b></h3>
                </header>
                <div className='mgt-container'>
                    <div className="submit-form mt-5 mb-5 mr-3 ml-3">
                        {this.state.submitted ? (
                            <div>
                                {/* <h4>You submitted successfully!</h4> */}
                                <a className='btn btn-success' href='#product01'>Add New Product</a>
                            </div>
                        ) : (
                            <div>
                                <a className='btn btn-success' href='#product01'>Add New Product</a>
                            </div>
                        )}
                    </div>
                    <div className='row mgt-list-div'>
                        <div className='col-md-6'>
                            <h4 className='text-left'>Products List</h4>

                            <ul className='mgt-list-view'>
                                {products &&
                                    products.map((product, index) => (
                                        <li className={'list-div' + (index === currentIndex ? ' active' : '')}
                                            onClick={() => this.setActiveProduct(product, index)}
                                            key={index}>
                                            <div>
                                                <p>{product.productname.toUpperCase()}</p>
                                            </div>
                                        </li>
                                    ))}
                            </ul>
                            <button className='m-3 btn btn-danger' onClick={this.removeAllTutorials}>
                                Remove All
                            </button>
                        </div>
                        <div className='col-md-6'>
                            {currentProduct ? (
                                <div className='event-mgt-detail'>
                                    <h4>Product</h4>
                                    <div className='product-mgt-detail-img'>
                                        <img src={'http://localhost:8080/api/files/' + currentProduct.title + '-1.jpg'} className="mgt-img"></img>
                                    </div>
                                    <div className='product-mgt-detail-info '>
                                        <label>
                                            <strong>Name:</strong>
                                        </label> {" "}
                                        {currentProduct.productname}
                                    </div>
                                    <div className='product-mgt-detail-info '>
                                        <label>
                                            <strong>Category:</strong>
                                        </label> {" "}
                                        {currentProduct.category}
                                    </div>
                                    <div className='product-mgt-detail-info '>
                                        <label>
                                            <strong>Description:</strong>
                                        </label> {" "}
                                        {currentProduct.description}
                                    </div>
                                    <div className='product-mgt-detail-info '>
                                        <label>
                                            <strong>Size:</strong>
                                        </label> {" "}
                                        {currentProduct.size}
                                    </div>
                                    <div className='product-mgt-detail-info '>
                                        <label>
                                            <strong>Price:</strong>
                                        </label> {" "}
                                        {currentProduct.price}
                                    </div>
                                    <div className='product-mgt-detail-info '>
                                        <label>
                                            <strong>Quantity:</strong>
                                        </label> {" "}
                                        {currentProduct.quantity}
                                    </div>
                                    <div className='product-mgt-detail-info '>
                                        <label>
                                            <strong>Status:</strong>
                                        </label> {" "}
                                        {currentProduct.published ? "Published" : "Pending"}
                                    </div>

                                    <Link to={'/products/' + currentProduct.id} className='btn btn-warning mgt-detail-btn'>
                                        Edit
                                    </Link>
                                </div>
                            ) : (
                                <div>
                                    <br />
                                    <p>Please click on a Product to view detail information...</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="modal" id="product01">
                    <div className='modal-dialog'>
                        <div className='modal-content mgt-div'>
                            <header className="modal-container">
                                <a href="#" className="closebtn">×</a>
                                <h4>Add New Product</h4>
                            </header>
                            <div className='add-mgt-div'>
                            <div className='form-group'>
                                    <label htmlFor='title'>Image Name<span> ( Please upload image at <a href='/image-mgt'>here</a> )</span></label>
                                    <input
                                        type='text'
                                        className='form-control'
                                        id='title'
                                        required
                                        value={this.state.title}
                                        onChange={this.onChangeTitle}
                                        name='title'
                                        placeholder='Example: dress01'
                                    />
                                </div>
                                <div className='form-group'>
                                    <label htmlFor='category'>Category</label>
                                    <div className='signup-form-radio'>
                                        <input
                                            type="radio"
                                            className="form-control"
                                            id="women"
                                            name="category"
                                            value="women"
                                            onChange={this.onChangeCategory}
                                            required />
                                        <label for="women" className="radiobtn">Women</label>
                                        <input
                                            type="radio"
                                            className="form-control"
                                            id="men"
                                            name="category"
                                            value="men"
                                            onChange={this.onChangeCategory}
                                            required />
                                        <label for="men" className="radiobtn">Men</label>
                                    </div>
                                </div>
                                <div className='form-group'>
                                    <label htmlFor='productname'>Product Name</label>
                                    <input
                                        type='text'
                                        className='form-control'
                                        id='productname'
                                        required
                                        value={this.state.productname}
                                        onChange={this.onChangeProductname}
                                        name='productname'
                                    />
                                </div>
                                <div className='form-group'>
                                    <label htmlFor='description'>Description</label>
                                    <input
                                        type='text'
                                        className='form-control'
                                        id='description'
                                        required
                                        value={this.state.description}
                                        onChange={this.onChangeDescription}
                                        name='description'
                                    />
                                </div>
                                <div className='form-group'>
                                    <label htmlFor='size'>Size <span>( Only one size avaliable )</span></label>
                                    <div className='signup-form-radio'>
                                        <input
                                            type="radio"
                                            className="form-control"
                                            id="S"
                                            name="size"
                                            value="S"
                                            onChange={this.onChangeSize}
                                            required />
                                        <label for="S" className="radiobtn">S</label>
                                        <input
                                            type="radio"
                                            className="form-control"
                                            id="M"
                                            name="size"
                                            value="M"
                                            onChange={this.onChangeSize}
                                            required />
                                        <label for="M" className="radiobtn">M</label>
                                        <input
                                            type="radio"
                                            className="form-control"
                                            id="L"
                                            name="size"
                                            value="L"
                                            onChange={this.onChangeSize}
                                            required />
                                        <label for="L" className="radiobtn">L</label>
                                        <input
                                            type="radio"
                                            className="form-control"
                                            id="XL"
                                            name="size"
                                            value="XL"
                                            onChange={this.onChangeSize}
                                            required />
                                        <label for="XL" className="radiobtn">XL</label>
                                        <input
                                            type="radio"
                                            className="form-control"
                                            id="XXL"
                                            name="size"
                                            value="XXL"
                                            onChange={this.onChangeSize}
                                            required />
                                        <label for="XL" className="radiobtn">XXL</label>
                                    </div>
                                </div>
                                <div className='form-group'>
                                    <label htmlFor='price'>Price</label>
                                    <input
                                        type='text'
                                        className='form-control'
                                        id='price'
                                        required
                                        value={this.state.price}
                                        onChange={this.onChangePrice}
                                        name='price'
                                    />
                                </div>
                                <div className='form-group'>
                                    <label htmlFor='quantity'>Quantity</label>
                                    <input
                                        type='number'
                                        className='form-control'
                                        id='quantity'
                                        required
                                        value={this.state.quantity}
                                        onChange={this.onChangeQuantity}
                                        name='quantity'
                                        min='10'
                                    />
                                </div>
                                <button onClick={this.saveProduct} href='#' className='btn btn-success float-right'>Submit</button>
                            </div>
                            <div>{this.state.message}</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}