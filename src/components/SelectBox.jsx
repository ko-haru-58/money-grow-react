import { useState } from 'react'

const SelectBox = (props) => {

    return (
        <>
            <label htmlFor={props.id}>{props.label}</label>

            <select
                id={props.id}
                value={props.value}
                onChange={(e) => props.onChange(Number(e.target.value))}    //setAmount(Number(e.target.value))
            >
                {props.items.map((item) => (
                    <option key={item.value} value={item.value}>
                        {item.label}
                    </option>
                ))}
            </select>
        </>
    )
}

export default SelectBox;
