import React, { Component } from "react";
import '../css/layouts.css';

import ProductDataService from "../services/product.service";

export default class SearchPage extends Component {
    constructor(props) {
        super(props);
        this.onChangeSearchProduct = this.onChangeSearchProduct.bind(this);
        this.retrieveProduct = this.retrieveProduct.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.setActiveProduct = this.setActiveProduct.bind(this);
        this.searchProduct = this.searchProduct.bind(this);

        this.state = {
            products: [],
            currentProduct: null,
            currentIndex: -1,
            searchProduct: ""
        };
    }

    componentDidMount() {
        this.retrieveProduct();
    }

    onChangeSearchProduct(e) {
        const searchProduct = e.target.value;

        this.setState({
            searchProduct: searchProduct
        });
    }

    retrieveProduct() {
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
        this.retrieveProduct();
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

    searchProduct() {
        ProductDataService.findByProductName(this.state.searchProduct)
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

    render() {
        const { searchProduct, products, currentProduct, currentIndex } = this.state;

        return (
            <div className='container mt-5 mb-5'>
                <div className='justify-content-end col-md-4'>
                    <div className='input-group mb-3'>
                        <input
                            type='text'
                            className='form-control'
                            placeholder='Search'
                            value={searchProduct}
                            onChange={this.onChangeSearchProduct} />
                        <div className='input-group-append'>
                            <button
                                className='btn btn-outline-secondary'
                                type='button'
                                onClick={this.searchProduct}>
                                Search
                            </button>
                        </div>
                    </div>
                </div>

                <div className='row search-div'>
                    <div className='col-md-6'>
                        <h4 className='text-left'>Products List</h4>

                        <ul className='mgt-list-view'>
                            {products &&
                                products.map((product, index) => (
                                    <li className={'list-div' + (index === currentIndex ? ' active' : '')}
                                        onClick={() => this.setActiveProduct(product, index)}
                                        key={index}>
                                        <div>
                                            <p>{product.productname}</p>
                                        </div>
                                    </li>
                                ))}
                        </ul>
                    </div>
                    <div className='col=md-6'>
                        {currentProduct ? (
                            <div className='event-mgt-detail'>
                                <h4>Product</h4>
                                <div className='product-mgt-detail-img'>
                                    <img src={'http://localhost:8080/api/files/' + currentProduct.title + '.jpg'} className="mgt-img"></img>
                                </div>
                                <div className='product-mgt-detail-info '>
                                    <label>
                                        <strong>Name:</strong>
                                    </label> {" "}
                                    {currentProduct.productname}
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
        );
    }
}