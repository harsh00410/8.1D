import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import './homepage.css'; // Importing the CSS file
import backgroundImage from './8.1D.jpg'; // Import the image

const HomePage = () => {
    return (
        <div className="homepage-container" style={{ backgroundImage: `url(${backgroundImage})` }}>
            <h1>Welcome to the Q&A App</h1>

            <div className="button-group">
                <Link to="/new-post">
                    <button className="homepage-button">New Post</button>
                </Link>

                <Link to="/search-posts">
                    <button className="homepage-button">Search Post</button>
                </Link>

                <Link to="/">
                    <button className="homepage-button">Home</button>
                </Link>
            </div>
        </div>
    );
};

export default HomePage;
