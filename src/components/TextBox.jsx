import { useState } from 'react'

const TextBox = (props) => {
    
    return (
        <>
            <label htmlFor={props.id}>{props.label}</label>

            <input
            type="text"
            value={props.value}
            readOnly
            />
        </>
    )

}

export default TextBox;