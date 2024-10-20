import React from 'react';
import './newpostpage.css'; // Import the updated CSS

const NewPostPage = () => {
    return (
        <div className="new-post-container">
            <div className="new-post-box">
                <h1>Create a New Post</h1>
                <p>Select the type of post you'd like to create:</p>

                <div className="button-group">
                    <button className="new-post-button" onClick={() => window.location.href = '/new-article'}>
                        Write an Article
                    </button>

                    <button className="new-post-button" onClick={() => window.location.href = '/new-question'}>
                        Ask a Question
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NewPostPage;
