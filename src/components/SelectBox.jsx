import { useState } from 'react'
import '../css/SelectBox.css';

const SelectBox = (props) => {

    return (
        <div className='selectbox-group'>
            <label className="label" htmlFor={props.id}>{props.label}</label>

            <select
                id={props.id}
                className='selectbox'
                value={props.value}
                onChange={(e) => props.onChange(Number(e.target.value))} 
            >
                {props.items.map((item) => (
                    <option key={item.value} value={item.value}>
                        {item.label}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default SelectBox;
