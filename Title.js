import React from 'react';

const Title = ({ placeholder_msg }) => (
    <div className="Title-input">
        <h3>What are your thoughts?</h3>
        <div>
            <h4>Title</h4>
            <input 
                type="text" 
                name="Title" 
                placeholder={placeholder_msg} 
                required 
            />
        </div>
    </div>
);

export default Title;
