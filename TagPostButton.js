import React, { useState } from 'react';
import { db } from './firebase'; // Import Firebase Firestore setup
import { collection, addDoc } from 'firebase/firestore';

const TagPostButton = ({ postId }) => {
    const [tag, setTag] = useState('');
    const [loading, setLoading] = useState(false);

    const handleTagPost = async () => {
        if (tag.trim() === '') {
            alert('Please add a valid tag');
            return;
        }

        setLoading(true);

        try {
            // Save the tag to Firestore (you can also associate it with a specific post using postId if needed)
            await addDoc(collection(db, 'tags'), {
                tag,
                postId: postId || null, // Optionally associate the tag with a post
                timestamp: new Date()
            });

            alert('Tag posted successfully!');
            setTag(''); // Clear the input after posting
        } catch (error) {
            console.error('Error posting tag:', error);
            alert('Error posting tag');
        }

        setLoading(false);
    };

    return (
        <div className="tag-post-container">
            <div className="tag">
                <h4>Tags</h4>
                <input 
                    type="text" 
                    placeholder="Please add tags" 
                    aria-label="Add tags" 
                    value={tag}
                    onChange={(e) => setTag(e.target.value)} // Capture tag input
                />
            </div>
            <div className="post-button">
                <button type="button" onClick={handleTagPost} disabled={loading}>
                    {loading ? 'Posting...' : 'Post'}
                </button>
            </div>
        </div>
    );
};

export default TagPostButton;
