import React from 'react';
import './customButton.css';


const CustomButton = ({ handleClick, label }) => {
    return (
        <div className="custom-button" onClick={handleClick}>
            {label}
        </div>
    )
}

export default CustomButton;