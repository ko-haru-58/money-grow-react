import { useState } from 'react'
import '../css/TextBox.css';

const TextBox = (props) => {
    
    return (
        <div className='textbox-group'>
            <label htmlFor={props.id}>{props.label}</label>
            <input type="text" className="textbox" value={props.value} readOnly />
        </div>
    )
}

export default TextBox;