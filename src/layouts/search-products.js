import React, { Component } from "react";
import ProductDataService from "../services/product.service";
import { Link } from "react-router-dom";
import '../css/layouts.css';

export default class SearchPage extends Component {
    constructor(props) {
        super(props);
        this.onChangeSearchProduct = this.onChangeSearchProduct.bind(this);
        this.retrieveProduct = this.retrieveProduct.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.setActiveProduct = this.setActiveProduct.bind(this);
        // this.removeAllTutorials = this.removeAllTutorials.bind(this);
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
            <div className='mainView'>
                <div className='justify-content-end col-md-3'>
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

                <div className='col-md-6'>
                    <h4>Products List</h4>

                    <ul className='list-group'>
                        {products && 
                         products.map((product, index) => (
                            <li className={'list-group-item' + (index === currentIndex ? 'active' : '')}
                                onClick={() => this.setActiveProduct(product, index)}
                                key={index}>
                                {product.title}
                            </li>
                         ))}
                    </ul>
                </div>
                <div className='col=md-6'>
                    {currentProduct ? (
                        <div>
                            <h4>Product</h4>
                            <div>
                                <label>
                                    <strong>Title:</strong>
                                </label> {" "}
                                {currentProduct.title}
                            </div>
                            <div>
                                <label>
                                    <strong>Description:</strong>
                                </label> {" "}
                                {currentProduct.description}
                            </div>
                            <div>
                                <label>
                                    <strong>Status:</strong>
                                </label> {" "}
                                {currentProduct.published ? "Published" : "Pending"}
                            </div>

                            <Link to={'/tutorials/' + currentProduct.id} className='badge badge-warning'>
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