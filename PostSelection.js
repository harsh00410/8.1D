import React, { useState } from 'react';
import Title from './Title';                  
import Questionform from './Questionform';    
import Articleform from './Articleform';      
import TagPostButton from './TagPostButton';  

const PostSelection = () => {
    const [msg, setMsg] = useState("Start your question with how, what, why, etc.");
    const [displayComponent, setDisplayComponent] = useState(<Questionform />);

    const handleOptionChange = (event) => {
        const selectedOption = event.target.value;
        if (selectedOption === "article") {
            setMsg("Enter a descriptive title");
            setDisplayComponent(<Articleform />);
        } else {
            setMsg("Start your question with how, what, why, etc.");
            setDisplayComponent(<Questionform />);
        }
    };

    return (
        <div className="post-selection">
            <header>
                <h3>New Post</h3>
                <div>
                    <p>Select Post Type:</p>
                    <div className="radio-group">
                        <input 
                            type="radio" 
                            id="question" 
                            name="postType" 
                            value="question" 
                            defaultChecked 
                            onChange={handleOptionChange} 
                        />
                        <label htmlFor="question">Question</label>

                        <input 
                            type="radio" 
                            id="article" 
                            name="postType" 
                            value="article" 
                            onChange={handleOptionChange} 
                        />
                        <label htmlFor="article">Article</label>
                    </div>
                </div>
            </header>
            <Title placeholderMsg={msg} />
            {displayComponent}
            <TagPostButton />
        </div>
    );
}

export default PostSelection;
