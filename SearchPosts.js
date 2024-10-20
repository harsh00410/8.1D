import React, { useState, useEffect } from 'react';
import { db } from './firebase'; // Firestore setup
import { collection, query, where, orderBy, getDocs } from "firebase/firestore";
import './SearchPosts.css'; // Import the enhanced CSS

const SearchPosts = () => {
    const [posts, setPosts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [expandedPostId, setExpandedPostId] = useState(null);

    useEffect(() => {
        fetchPosts();
    }, []);

    // Fetch all posts from Firestore (both articles and questions)
    const fetchPosts = async () => {
        const postsCollection = collection(db, "questions"); // Assuming questions and articles in the same collection
        const articlesCollection = collection(db, "articles");

        try {
            const querySnapshotQuestions = await getDocs(postsCollection);
            const querySnapshotArticles = await getDocs(articlesCollection);

            const questions = querySnapshotQuestions.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
                type: "question"
            }));

            const articles = querySnapshotArticles.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
                type: "article"
            }));

            setPosts([...questions, ...articles]);

        } catch (error) {
            console.error("Error fetching posts: ", error);
        }
    };

    // Handle search input changes
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    // Handle date selection
    const handleDateChange = (e) => {
        setSelectedDate(e.target.value);
    };

    // Filter posts based on search term and date
    const filteredPosts = posts.filter((post) => {
        const postDate = new Date(post.timestamp.toDate()).toISOString().split('T')[0];
        const matchesDate = selectedDate ? postDate === selectedDate : true;
        const matchesSearchTerm = searchTerm
            ? post.title.toLowerCase().includes(searchTerm.toLowerCase())
            : true;

        return matchesDate && matchesSearchTerm;
    });

    // Handle show more/less functionality
    const toggleShowMore = (id) => {
        setExpandedPostId(expandedPostId === id ? null : id);
    };

    // Handle delete post
    const handleDelete = async (id) => {
        try {
            // Here you can add logic to delete the post from Firestore
            setPosts(posts.filter(post => post.id !== id)); // Remove from UI
        } catch (error) {
            console.error("Error deleting post: ", error);
        }
    };

    return (
        <div className="container">
            {/* Search and Filter Section */}
            <div className="search-filter-container">
                <input
                    type="text"
                    className="search-bar"
                    placeholder="Search by title"
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
                <input
                    type="date"
                    className="date-picker"
                    value={selectedDate}
                    onChange={handleDateChange}
                />
            </div>

            {/* Display Filtered Posts */}
            <div className="post-container">
                {filteredPosts.map((post) => (
                    <div
                        key={post.id}
                        className={`post-card ${expandedPostId === post.id ? 'expanded' : ''}`}
                    >
                        <h4 className="post-title">{post.title}</h4>
                        <p className="post-timestamp">
                            Date: {new Date(post.timestamp.toDate()).toLocaleString()}
                        </p>

                        {/* Conditionally render post content */}
                        {expandedPostId === post.id && (
                            <p className="post-content">
                                {post.type === 'question' ? post.description : post.articleText}
                            </p>
                        )}

                        <button className="button" onClick={() => toggleShowMore(post.id)}>
                            {expandedPostId === post.id ? 'Show Less' : 'Show More'}
                        </button>
                        <button
                            className="button button-red"
                            onClick={() => handleDelete(post.id)}
                        >
                            Delete Post
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SearchPosts;
