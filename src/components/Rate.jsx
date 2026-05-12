import { useState } from 'react'

function Rate(props) {
    const [rate, setRate] = useState(1); // 初期値1%

    return (
        <>
            <label htmlFor="rate">利回り</label>

            <select
                id="rate"
                value={rate}
                onChange={(e) => setRate(Number(e.target.value))}
            >
                {props.rates.map((rateItem) => (
                    <option key={rateItem} value={rateItem}>
                        {rateItem}%
                    </option>
                ))}
            </select>
        </>
    )
}

export default Rate;
