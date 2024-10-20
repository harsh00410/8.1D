import React, { useState } from 'react';
import { db, storage } from './firebase'; // Firebase setup
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import './App.css';

const ArticleForm = () => {
    const [abstract, setAbstract] = useState("");
    const [articleText, setArticleText] = useState("");
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        setLoading(true);

        try {
            // Initialize the imageUrl as an empty string
            let imageUrl = "";
            
            // Upload the image to Firebase Storage (if there is one)
            if (image) {
                const imageRef = ref(storage, `images/${image.name}`);
                const snapshot = await uploadBytes(imageRef, image);
                imageUrl = await getDownloadURL(snapshot.ref);
            }

            // Save the article data with separate fields to Firestore
            await addDoc(collection(db, "articles"), {
                abstract: abstract,     // Save abstract
                articleText: articleText, // Save article text
                imageUrl: imageUrl,    // Save image URL (if uploaded)
                timestamp: new Date()   // Save timestamp
            });

            alert("Article submitted successfully!");
            // Clear the form fields after submission
            setAbstract("");
            setArticleText("");
            setImage(null);
        } catch (error) {
            console.error("Error submitting article: ", error);
            alert("Error submitting article");
        }

        setLoading(false);
    };

    return (
        <div className="article-body">
            <section className="article-abstract">
                <h4>Abstract</h4>
                <textarea
                    placeholder="Abstract"
                    value={abstract}
                    onChange={(e) => setAbstract(e.target.value)}
                />
            </section>

            <section className="article-text">
                <h4>Article Text</h4>
                <textarea
                    placeholder="Enter the article content here..."
                    value={articleText}
                    onChange={(e) => setArticleText(e.target.value)}
                />
            </section>

            <section className="article-image">
                <h4>Upload Image</h4>
                <input type="file" onChange={(e) => setImage(e.target.files[0])} />
            </section>

            <button onClick={handleSubmit} disabled={loading}>
                {loading ? 'Submitting...' : 'Submit Article'}
            </button>
        </div>
    );
};

export default ArticleForm;
