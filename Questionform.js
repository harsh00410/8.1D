import React, { useState } from 'react';
import { db } from './firebase'; // Firestore setup
import { collection, addDoc } from "firebase/firestore";
import './App.css'; 


const QuestionForm = ({ titlePlaceholder = "Enter the title", questionPlaceholder = "Describe your problem in detail..." }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        setLoading(true);

        try {
            // Save the title and description to Firestore in separate fields
            await addDoc(collection(db, "questions"), {
                title: title,             // Title field
                description: description, // Description field
                timestamp: new Date(),    // Timestamp for when the question was submitted
            });

            alert("Question submitted successfully!");
            // Clear the form after submission
            setTitle('');
            setDescription('');
        } catch (error) {
            console.error("Error submitting question: ", error);
            alert("Error submitting question");
        }

        setLoading(false);
    };

    return (
        <div className="question-body">
            {/* Title input field */}
            <h4>Title</h4>
            <input
                type="text"
                name="title"
                placeholder={titlePlaceholder}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="title-input"
            />

            {/* Description input field */}
            <h4>Description</h4>
            <textarea
                name="description"
                placeholder={questionPlaceholder}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="description-input"
            />

            {/* Submit Button */}
            <button onClick={handleSubmit} disabled={loading} className="submit-button">
                {loading ? 'Submitting...' : 'Post'}
            </button>
        </div>
    );
};

export default QuestionForm;
