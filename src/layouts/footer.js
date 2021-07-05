import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import '../css/layouts.css';

export default function() {
    return (      
        <div className="footer-section">
        {/* <!--footer top start--> */}
            <div className="footer-top gradient-bg">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4 col-12">
                            <div className="footer-nav-wrap text-white mb-0 mb-md-4 mb-lg-0">
                                <a className="d-block" href="#"><img src="../images/fortry-logo-transparent.png" alt="footer logo" width="200" className="img-fluid mb-1"/></a>
                                <p>Intrinsicly matrix high standards in niches whereas intermandated niche markets. Objectively harness competitive resources.</p>
                                <ul className="list-unstyled social-list mb-0">
                                    <li className="list-inline-item"><a href="#" className="rounded"><span className="ti-facebook white-bg color-2 shadow rounded-circle"></span></a></li>
                                    <li className="list-inline-item"><a href="#" className="rounded"><span className="ti-twitter white-bg color-2 shadow rounded-circle"></span></a></li>
                                    <li className="list-inline-item"><a href="#" className="rounded"><span className="ti-linkedin white-bg color-2 shadow rounded-circle"></span></a></li>
                                    <li className="list-inline-item"><a href="#" className="rounded"><span className="ti-dribbble white-bg color-2 shadow rounded-circle"></span></a></li>
                                </ul>
                            </div>
                        </div>

                        <div className="col-lg-2 col-md-4 col-12">
                            <div className="footer-nav-wrap text-white">
                                <h5 className="text-white">Usefull Links</h5>
                                <ul className="list-unstyled footer-nav-list mt-3">
                                    <li><a href="#" className="text-foot"><span className="ti-angle-double-right"></span> FAQ Section</a></li>
                                    <li><a href="#" className="text-foot"><span className="ti-angle-double-right"></span> Return Policy</a></li>
                                    <li><a href="#" className="text-foot"><span className="ti-angle-double-right"></span> Privacy Policy</a></li>
                                    <li><a href="#" className="text-foot"><span className="ti-angle-double-right"></span> Terms of Services</a></li>
                                </ul>
                            </div>
                        </div>

                        <div className="col-lg-2 col-md-4 col-12">
                            <div className="footer-nav-wrap text-white">
                                <h5 className="text-white">Company</h5>
                                <ul className="list-unstyled footer-nav-list mt-3">
                                    <li><a href="#" className="text-foot"><span className="ti-angle-double-right"></span> About Us</a></li>
                                    <li><a href="#" className="text-foot"><span className="ti-angle-double-right"></span> Size Guideline</a></li>
                                    <li><a href="#" className="text-foot"><span className="ti-angle-double-right"></span> Offers & Events</a></li>
                                    <li><a href="#" className="text-foot"><span className="ti-angle-double-right"></span> Contact Us</a></li>
                                </ul>
                            </div>
                        </div>

                        <div className="col-lg-4 col-md-4 col-12">
                            <div className="footer-nav-wrap text-white">
                                <h5 className="text-light footer-head">Newsletter</h5>
                                <p>Subscribe our newsletter to get our update. We don't send span email to you.</p>
                                {/* <form action="#" className="newsletter-form mt-3">
                                    <div className="input-group">
                                        <input type="email" className="form-control email-form-control" id="email" placeholder="Enter your email" required=""/>
                                        <div className="input-group-append">
                                            <button className="btn solid-btn subscribe-btn btn-hover" type="submit">
                                                Subscribe
                                            </button>
                                        </div>
                                    </div>
                                </form> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!--footer top end--> */}

            {/* <!--footer copyright start--> */}
            <div className="footer-bottom gray-light-bg py-3">
                <div className="container">
                    <div className="row text-center justify-content-center">
                        <div className="col-md-6 col-lg-5"><p className="copyright-text pb-0 mb-0">
                            Copyrights © 2021. All rights reserved by
                            <a href="/home" target="_blank"> FORTRY</a></p>
                        </div>
                    </div>
                </div>
            </div>
        {/* <!--footer copyright end--> */}
    </div>
    // {/* <!--footer section end--> */}
    )
}