import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import '../css/layouts.css';

export default function() {
    return (
        <div>

        <div className='footer-section'>
            <div className="footer-top gradient-bg bg-dark py-3">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 col-12 mt-2 mb-4">
                            <div className="footer-nav-wrap text-white mb-0 mb-md-4 mb-lg-0">
                                <a className="d-block" href="#"><img src="/images/fortry-new-logos.png" alt="footer logo" width="150" class="img-fluid mb-0" /></a>
                                <ul className="list-unstyled social-list my-2 py-2">
                                    <li className="list-inline-item"><a href="#" className="rounded"><span className="ti-facebook white-bg color-2 shadow rounded-circle"></span></a></li>
                                    <li className="list-inline-item"><a href="#" className="rounded"><span className="ti-twitter white-bg color-2 shadow rounded-circle"></span></a></li>
                                    <li className="list-inline-item"><a href="#" className="rounded"><span className="ti-linkedin white-bg color-2 shadow rounded-circle"></span></a></li>
                                    <li className="list-inline-item"><a href="#" className="rounded"><span className="ti-dribbble white-bg color-2 shadow rounded-circle"></span></a></li>
                                </ul>
                            </div>
                        </div>

                        <div class="col-lg-3 col-md-4 col-12 mt-2 mb-4">
                            <div class="footer-nav-wrap text-white">
                                <h5 class="">Company</h5>
                                <ul class="list-unstyled footer-nav-list mt-3 col text-start">
                                    <li><a href="#" class="text-foot"><span class="ti-angle-double-right"></span> About Us</a></li><br></br>
                                    <li><a href="#" class="text-foot"><span class="ti-angle-double-right"></span> Size Guide</a></li><br></br>
                                    <li><a href="#" class="text-foot"><span class="ti-angle-double-right"></span> Special Offers</a></li><br></br>
                                    <li><a href="#" class="text-foot"><span class="ti-angle-double-right"></span> Contact Us</a></li><br></br>
                                </ul>
                            </div>
                        </div>

                        <div class="col-lg-3 col-md-4 col-12 mt-2 mb-4">
                            <div class="footer-nav-wrap text-white">
                                <h5 class="text-white">Help</h5>
                                <ul class="list-unstyled footer-nav-list mt-3 col">
                                    <li><a href="#" class="text-foot"><span class="ti-angle-double-right"></span> FAQ</a></li><br></br>
                                    <li><a href="#" class="text-foot"><span class="ti-angle-double-right"></span> Return Policy</a></li><br></br>
                                    <li><a href="#" class="text-foot"><span class="ti-angle-double-right"></span> Privacy Policy</a></li><br></br>
                                </ul>
                            </div>
                        </div>

                        <div class="col-lg-3 col-md-4 col-12 mt-2 mb-4">
                            <div class="footer-nav-wrap text-white">
                                <h5 class="text-white">Useful Links</h5>
                                <ul class="list-unstyled footer-nav-list mt-3 col">
                                    <li><a href="#" class="text-foot"><span class="ti-angle-double-right"></span> Terms of Use</a></li><br></br>
                                    <li><a href="#" class="text-foot"><span class="ti-angle-double-right"></span> Privacy Policy</a></li><br></br>
                                    <li><a href="#" class="text-foot"><span class="ti-angle-double-right"></span> Documentation</a></li><br></br>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="footer-bottom py-3">
                <div class="container">
                    <div class="row text-center justify-content-center">
                        <div class="col-md-6 col-lg-5">
                            <p class="copyright-text pb-0 mb-0">Copyrights © 2021. All rights reserved by FORTRY</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
        
    )
}