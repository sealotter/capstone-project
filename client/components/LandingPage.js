import React from 'react';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';

const LandingPage = () =>{
  return (
    <main className='landingpage'>
      <section className='hero'>
        <div className='section-container'>
          <div  className='content'>
            <h1>Cinema World</h1>
            <h2>Because sometimes you know better than Hollywood</h2>
            <p>Seen any good movies or tv shows? We would love to know!</p>
          </div>
          <div className='content'>
            <img className='mainLogo' src='/../images/logo.png'/>
          </div>
        </div>
      </section>
      <section className='login'>
        <div className='colorme'>
          <h1>Get started!</h1>
          <div className='logincontainer'>
            <Link to='/login'>Login</Link>
            <Link to='/signup'>Sign Up</Link>
          </div>
        </div>
      </section>
      <section className='how-it-works'>
        <div className='section-container'>
          <h2>How it works</h2>
          <div className='content-container'>
            <div className='container'>
              <h2>Don't know what to watch? <br/>Search thousands of movies and tv shows!</h2>
              <div className='imgContainer'>
                <img className='howitworksimg' src='/../images/browse movies.png'/>
              </div>
            </div>
            <div className='container'>
              <h2>Leave a review!</h2>
              <div className='imgContainer'>
                <img className='howitworksimg' src='/../images/leave review.png'/>
              </div>
            </div>
            <div className='container'>
              <h2>Let your friends know!</h2>
              <div className='imgContainer'>
                <img className='howitworksimg' src='/../images/reviews.png'/>
              </div>
            </div>
          </div>
        </div>
      </section>
      <footer>
        <div className='footerDiv'>
          <h3>Need more?</h3>
          <ul>
            <li>About Us</li>
            <li>Sign up</li>
            <li>Support</li>
            <li>Contact</li>
          </ul>
          <p>Warning, this site probably won't work so good</p>
        </div>
        <div className='footerDiv'>
          <h3>Already have an account?</h3>
          <ul>
            <li>Look up movies</li>
            <li>Look up tv shows</li>
            <li>Be our critic</li>
          </ul>
        </div>
        <div className='credit'>
          <h3>Special thanks to The Movie DB</h3>
          <img src='https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_1-5bdc75aaebeb75dc7ae79426ddd9be3b2be1e342510f8202baf6bffa71d7f5c4.svg'/>
        </div>
      </footer>
    </main>
  );
};


export default connect(state=>state)(LandingPage);