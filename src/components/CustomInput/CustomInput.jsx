import React from 'react';
import './CustomInput.css';

const CustomInput = ({ label, value, onChange }) => {
    
    return (
        <div className='input-body'>
            <label className='label-input'>{label}</label>
            <input className='class-input' type="text" value={value} onChange={onChange} />
        </div>
    );
};

export default CustomInput;