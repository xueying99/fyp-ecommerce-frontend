import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import '../css/layouts.css';

export default function() {
    return (      
        <div class="footer-section">
        {/* <!--footer top start--> */}
            <div class="footer-top gradient-bg">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-4 col-12">
                            <div class="footer-nav-wrap text-white mb-0 mb-md-4 mb-lg-0">
                                <a class="d-block" href="#"><img src="images/fortry-logo-transparent.png" alt="footer logo" width="200" class="img-fluid mb-1"/></a>
                                <p>Intrinsicly matrix high standards in niches whereas intermandated niche markets. Objectively harness competitive resources.</p>
                                <ul class="list-unstyled social-list mb-0">
                                    <li class="list-inline-item"><a href="#" class="rounded"><span class="ti-facebook white-bg color-2 shadow rounded-circle"></span></a></li>
                                    <li class="list-inline-item"><a href="#" class="rounded"><span class="ti-twitter white-bg color-2 shadow rounded-circle"></span></a></li>
                                    <li class="list-inline-item"><a href="#" class="rounded"><span class="ti-linkedin white-bg color-2 shadow rounded-circle"></span></a></li>
                                    <li class="list-inline-item"><a href="#" class="rounded"><span class="ti-dribbble white-bg color-2 shadow rounded-circle"></span></a></li>
                                </ul>
                            </div>
                        </div>

                        <div class="col-lg-2 col-md-4 col-12">
                            <div class="footer-nav-wrap text-white">
                                <h5 class="text-white">Usefull Links</h5>
                                <ul class="list-unstyled footer-nav-list mt-3">
                                    <li><a href="#" class="text-foot"><span class="ti-angle-double-right"></span> FAQ Section</a></li>
                                    <li><a href="#" class="text-foot"><span class="ti-angle-double-right"></span> Return Policy</a></li>
                                    <li><a href="#" class="text-foot"><span class="ti-angle-double-right"></span> Privacy Policy</a></li>
                                    <li><a href="#" class="text-foot"><span class="ti-angle-double-right"></span> Terms of Services</a></li>
                                </ul>
                            </div>
                        </div>

                        <div class="col-lg-2 col-md-4 col-12">
                            <div class="footer-nav-wrap text-white">
                                <h5 class="text-white">Company</h5>
                                <ul class="list-unstyled footer-nav-list mt-3">
                                    <li><a href="#" class="text-foot"><span class="ti-angle-double-right"></span> About Us</a></li>
                                    <li><a href="#" class="text-foot"><span class="ti-angle-double-right"></span> Size Guideline</a></li>
                                    <li><a href="#" class="text-foot"><span class="ti-angle-double-right"></span> Offers & Events</a></li>
                                    <li><a href="#" class="text-foot"><span class="ti-angle-double-right"></span> Contact Us</a></li>
                                </ul>
                            </div>
                        </div>

                        <div class="col-lg-4 col-md-4 col-12">
                            <div class="footer-nav-wrap text-white">
                                <h5 class="text-light footer-head">Newsletter</h5>
                                <p>Subscribe our newsletter to get our update. We don't send span email to you.</p>
                                <form action="#" class="newsletter-form mt-3">
                                    <div class="input-group">
                                        <input type="email" class="form-control email-form-control" id="email" placeholder="Enter your email" required=""/>
                                        <div class="input-group-append">
                                            <button class="btn solid-btn subscribe-btn btn-hover" type="submit">
                                                Subscribe
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!--footer top end--> */}

            {/* <!--footer copyright start--> */}
            <div class="footer-bottom gray-light-bg py-3">
                <div class="container">
                    <div class="row text-center justify-content-center">
                        <div class="col-md-6 col-lg-5"><p class="copyright-text pb-0 mb-0">
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