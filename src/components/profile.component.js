import React, { Component } from "react";
import Table from 'react-bootstrap/Table';
import { Tab, TabPanel, Tabs, TabList } from "react-web-tabs";
import "react-web-tabs/dist/react-web-tabs.css";
import "../css/component.css";

import AuthService from "../services/auth.service";
import ProductDataService from "../services/product.service";
import OrderDataService from "../services/order.service";
import OrderItemDataService from "../services/orderItem.service";

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeContact = this.onChangeContact.bind(this);
    this.onChangeAddress = this.onChangeAddress.bind(this);
    this.onChangePoscode = this.onChangePoscode.bind(this);
    this.onChangeState = this.onChangeState.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.retrieveProducts = this.retrieveProducts.bind(this);
    this.retrieveOrder = this.retrieveOrder.bind(this);
    this.retrieveOrderItem = this.retrieveOrderItem.bind(this);
    this.setActiveOrder = this.setActiveOrder.bind(this);

    this.state = {
      users: [],
      currentUser: AuthService.getCurrentUser(),
      currentOrder: null,
      currentIndex: -1,
      email: "",
      address: "",
      poscode: "",
      state: "",

      products: [],
      orders: [],
      orderItem: [],
    };
  }

  componentDidMount() {
    this.refreshList();
  }

  refreshList() {
    this.retrieveProducts();
    this.retrieveOrder();
    this.retrieveOrderItem();
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    });
  }

  onChangeAddress(e) {
    this.setState({
      address: e.target.value
    });
  }

  onChangeState(e) {
    this.setState({
      state: e.target.value
    });
  }

  onChangePoscode(e) {
    this.setState({
      poscode: e.target.value
    });
  }

  onChangeContact(e) {
    this.setState({
      contact: e.target.value
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

  retrieveOrderItem() {
    OrderItemDataService.getAll()
      .then(res => {
        this.setState({
          orderItem: res.data
        })
        console.log(res.data)
      })
      .catch(e => {
        console.log(e);
      });
  }

  retrieveOrder() {
    OrderDataService.getAll()
      .then(res => {
        this.setState({
          orders: res.data
        })
        console.log(res.data)
      })
      .catch(e => {
        console.log(e);
      });
  }

  setActiveOrder(order, index) {
    this.setState({
      currentOrder: order,
      currentIndex: index
    });
  }

  render() {
    const { currentUser, orders, currentOrder, currentIndex } = this.state;

    let uid = null
    let oid = []
    let totalitem = 0
    let totalprice = 0.00

    for (let i = 0; i < this.state.orders.length; i++) {
      if (currentUser.id === this.state.orders[i].userId) {
        uid = currentUser.id
      }
    }

    for (let i = 0; i < this.state.orders.length; i++) {
      for (let j = 0; j < this.state.orderItem.length; j++) {
        if (this.state.orders[i].id === this.state.orderItem[j].orderId) {
          oid = this.state.orders[i].id
        }
      }
    }

    for (let j = 0; j < this.state.orderItem.length; j++) {
      if (oid === this.state.orderItem[j].orderId) {
        totalitem = totalitem + this.state.orderItem[j].quantity
        totalprice = totalprice + this.state.orderItem[j].price
      }
    }

    return (
      <div className="">
        <header className="jumbotron">
          <h3><strong>PROFILE PAGE</strong></h3>
        </header>
        <div className='mb-5'>
          <Tabs defaultTab="vertical-tab-one" vertical className="vertical-tabs">
            <TabList className='tab-list-div'>
              <Tab tabFor="vertical-tab-one">Profile</Tab>
              <Tab tabFor="vertical-tab-two">Order History</Tab>
            </TabList>

            <TabPanel tabId="vertical-tab-one" className='tab-content-div'>
              <div className="profile-view">
                <div className="profile-table">
                  <img src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                    alt="profile-img"
                    className="profile-img-card" />
                  <div className='mt-5'>
                    <div className='profile-table-row'>
                      <label className=''>Username</label>
                      <input className=''
                        defaultValue={currentUser.username}
                        disabled>
                      </input>
                    </div>
                    <div className='profile-table-row'>
                      <label className=''>Email</label>
                      <input className=''
                        value={currentUser.email}
                        onChange={this.onChangeEmail}>

                      </input>
                    </div>
                    <div className='profile-table-row'>
                      <label className=''>Gender</label>
                      <input className=''
                        defaultValue={currentUser.gender}
                        disabled>

                      </input>
                    </div>
                    <div className='profile-table-row'>
                      <label className=''>Date of Birth</label>
                      <input className=''
                        defaultValue={currentUser.dob}
                        disabled>

                      </input>
                    </div>
                    <div className='profile-table-row'>
                      <label className=''>Contact Number</label>
                      <input className=''
                        value={currentUser.contact}
                        onChange={this.onChangeContact}>

                      </input>
                    </div>
                    <div className='profile-table-row'>
                      <label className=''>Address</label>
                      <input className=''
                        value={currentUser.address}
                        onChange={this.onChangeAddress}>

                      </input>
                    </div>
                    <div className='profile-table-row'>
                      <label className=''>Poscode</label>
                      <input className=''
                        value={currentUser.poscode}
                        onChange={this.onChangePoscode}>

                      </input>
                    </div>
                    <div className='profile-table-row'>
                      <label className=''>State</label>
                      <input className=''
                        value={currentUser.state}
                        onChange={this.onChangeState}>

                      </input>
                    </div>
                  </div>
                </div>
              </div>
            </TabPanel>

            <TabPanel tabId="vertical-tab-two" className='tab-order-history'>
              <div className='tab-order-container'>
                <div className='tab-order-div'>
                  <h5><b>Order History</b></h5>
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th><b>Order Details</b></th>
                        <th><b>Status</b></th>
                      </tr>
                    </thead>

                    {orders &&
                      orders.filter(i => i.userId === uid).map((order, index) => (
                        <tbody>
                          <tr>
                            <td>
                              <div className='order-detail-div'>
                                <div>
                                  <p>Order ID: <b>{order.id}</b>
                                    <span>Date: <b>{order.date}</b></span>
                                  </p>
                                  <p>Total Paid: RM {order.payment.toFixed(2)} ({order.accepted ? "Accepted" : "Pending"})</p>
                                </div>
                                <a className={'btn btn-primary' + (index === currentIndex ? ' active' : '')}
                                  onClick={() => this.setActiveOrder(order, index)}
                                  key={index} href="#orderlist">
                                  View Details
                                </a>
                              </div>
                            </td>
                            <td>
                              {order.completed ? "Completed" : "In Progress"}
                            </td>
                          </tr>
                        </tbody>
                      ))}
                  </Table>
                </div>
              </div>
              <div>
                {currentOrder ? (
                  <div className="modal" id="orderlist">
                    <div className='modal-dialog'>
                      <div className='modal-content'>
                        <header className="modal-container">
                          <a href="#" className="closebtn">×</a>
                          <h4>Details of ORDER ID <b>{currentOrder.id}</b></h4>
                        </header>

                        <div className='modal-table-div'>
                          <p>Shipping Information</p>
                          <table className='modal-shipping-table'>
                            <tbody>
                              <tr>
                                <td>Shipping Name:</td>
                                <td>{currentOrder.shippingname}</td>
                              </tr>
                              <tr>
                                <td>Shipping Address:</td>
                                <td>{currentOrder.shippingaddress}</td>
                              </tr>
                              <tr>
                                <td>Contact:</td>
                                <td>{currentOrder.shippingcontact}</td>
                              </tr>
                              <tr>
                                <td>Courier Service:</td>
                                <td>{currentOrder.courier}</td>
                              </tr>
                              <tr>
                                <td>Tracking Number:</td>
                                <td>{currentOrder.tracking}</td>
                              </tr>
                            </tbody>
                          </table>
                          <p>Order Item List</p>
                          <table className='modal-order-item-table'>
                            <thead>
                              <tr>
                                <th>No</th>
                                <th>Product</th>
                                <th>Quantity</th>
                              </tr>
                            </thead>
                            <tbody>
                              {
                                this.state.orderItem
                                  .filter(i => i.orderId === currentOrder.id)
                                  .map(o => {
                                    let p = this.state.products.filter(i => i.id === o.productId)[0]
                                    return (
                                      <tr>
                                        <td>{o.id}</td>
                                        <td className=''>
                                          {p.productname}
                                        </td>
                                        <td>
                                          {o.quantity}
                                        </td>
                                      </tr>
                                    )
                                  })
                              }
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div></div>
                )}
              </div>
            </TabPanel>
          </Tabs>
        </div>
      </div>
    );
  }
}