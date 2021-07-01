import React, { Component } from "react";
import ProductDataService from "../services/product.service";
import { Link } from "react-router-dom";

export default class ProductManagement extends Component {
    constructor(props) {
        super(props);
        this.onChangeSearchProduct = this.onChangeSearchProduct.bind(this);
        this.retrieveProducts = this.retrieveProducts.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.setActiveProduct = this.setActiveProduct.bind(this);
        this.removeAllProducts = this.removeAllProducts.bind(this);
        this.searchProductname = this.searchProductname.bind(this);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeProductname = this.onChangeProductname.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeSize = this.onChangeSize.bind(this);
        this.onChangePrice = this.onChangePrice.bind(this);
        this.onChangeQuantity = this.onChangeQuantity.bind(this);
        this.saveProduct = this.saveProduct.bind(this);
        this.newProduct = this.newProduct.bind(this);

        this.state = {
            products: [],
            currentProduct: null,
            currentIndex: -1,
            searchProductname: "",

            id: null,
            title: "",
            productname: "",
            description: "",
            size: "",
            price: "",
            quantity: "",
            published: false,

            submitted: false
        };
    }

    componentDidMount() {
        this.retrieveProducts();
    }

    onChangeSearchProduct(e) {
        const searchProductname = e.target.value;

        this.setState({
            searchProductname: searchProductname
        });
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

    searchProductname() {
        ProductDataService.findByTitle(this.state.searchProductname)
            .then(response => {
                this.setState({
                    products: response.data
                });
                console.log(response.data);
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
                    productname: response.data.productname,
                    description: response.data.description,
                    size: response.data.size,
                    price: response.data.price,
                    quantity: response.data.quantity,
                    published: response.data.published,

                    submitted: true
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    newProduct() {
        this.setState({
            id: null,
            title: "",
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
        const { searchProductname, products, currentProduct, currentIndex } = this.state;

        return (
            <div className=''>
                <header className="jumbotron">
                    <h3><b>PRODUCT MANAGEMENT</b></h3>
                </header>
                {/* <div className='col-md-8'>
                    <div className='input-group mb-3'>
                        <input
                            type='text'
                            className='form-control'
                            placeholder='Name'
                            value={searchProductname}
                            onChange={this.onChangeSearchProduct}
                        />
                        <div className='input-group-append'>
                            <button 
                                className='btn btn-outline-secondary'
                                type='button'
                                onClick={this.searchProductname}>
                                Search    
                            </button>
                        </div>
                    </div>
                </div> */}

                <div className="submit-form">
                    {this.state.submitted ? (
                        <div>
                            <h4>You submitted successfully!</h4>
                            <button className='btn btn-success' onClick={this.newProduct}>Add New Product</button>
                        </div>
                    ) : (
                        <div>
                            Add New Product
                            <div className='form-group'>
                                <label htmlfor='title'>Title</label>
                                <input 
                                    type='text'
                                    className='form-control'
                                    id='title'
                                    required
                                    value={this.state.title}
                                    onChange={this.onChangeTitle}
                                    name='title' 
                                />
                            </div>
                            <div className='form-group'>
                                <label htmlfor='productname'>Name</label>
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
                                <label htmlfor='description'>Description</label>
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
                                <label htmlfor='size'>Size</label>
                                <input 
                                    type='text'
                                    className='form-control'
                                    id='size'
                                    required
                                    value={this.state.size}
                                    onChange={this.onChangeSize}
                                    name='size' 
                                />
                            </div>
                            <div className='form-group'>
                                <label htmlfor='price'>Price</label>
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
                                <label htmlfor='description'>Quantity</label>
                                <input 
                                    type='text'
                                    className='form-control'
                                    id='quantity'
                                    required
                                    value={this.state.quantity}
                                    onChange={this.onChangeQuantity}
                                    name='quantity' 
                                />
                            </div>
                            <button onClick={this.saveProduct} className='btn btn-success'>Submit</button>
                        </div>
                    )}
                </div>

                <div className='col-md-6'>
                    <h4>Products List</h4>

                    <ul className='product-view'>
                    {products && 
                    products.map((product, index) => (
                        <li className={'product-div' + (index === currentIndex ? ' active' : '')}
                            onClick={() => this.setActiveProduct(product, index)}
                            key={index}>
                            <img src={'./images/women/' + product.title + '.jpg'} className="component-img"></img>
                            <div className="d-flex row justify-content-around p-2">
                            <div>{product.productname.toUpperCase()}</div>
                            <div>RM {product.price.toFixed(2)}</div>
                            </div>
                        </li>
                         ))}
                    </ul>
                    <button className='m-3 btn btn-sm btn-danger' onClick={this.removeAllTutorials}>
                        Remove All
                    </button>
                </div>
                <div className='col=md-6'>
                    {currentProduct ? (
                        <div>
                            <h4>Product</h4>
                            <div>
                                <label>
                                    <strong>Name:</strong>
                                </label> {" "}
                                {currentProduct.productname}
                            </div>
                            <div>
                                <label>
                                    <strong>Description:</strong>
                                </label> {" "}
                                {currentProduct.description}
                            </div>
                            <div>
                                <label>
                                    <strong>Size:</strong>
                                </label> {" "}
                                {currentProduct.size}
                            </div>
                            <div>
                                <label>
                                    <strong>Price:</strong>
                                </label> {" "}
                                {currentProduct.price}
                            </div>
                            <div>
                                <label>
                                    <strong>Quantity:</strong>
                                </label> {" "}
                                {currentProduct.quantity}
                            </div>
                            <div>
                                <label>
                                    <strong>Status:</strong>
                                </label> {" "}
                                {currentProduct.published ? "Published" : "Pending"}
                            </div>

                            <Link to={'/products/' + currentProduct.id} className='badge badge-warning'>
                                Edit
                            </Link>
                        </div>
                    ) : (
                        <div>
                            <br />
                            <p>Please click on a Product...</p>
                        </div>
                    )}
                </div>

                
            </div>
        );
    }
}