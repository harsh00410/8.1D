import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './homepage';
import NewPostPage from './newpostpage';
import ArticleForm from './Articleform';
import QuestionForm from './Questionform';
import SearchPosts from './SearchPosts'; // Import the new component

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/new-post" element={<NewPostPage />} />
                <Route path="/new-article" element={<ArticleForm />} />
                <Route path="/new-question" element={<QuestionForm />} />
                <Route path="/search-posts" element={<SearchPosts />} /> {/* Add SearchPosts route */}
            </Routes>
        </Router>
    );
}

export default App;
