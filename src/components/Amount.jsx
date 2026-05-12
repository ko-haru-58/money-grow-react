import { useState } from 'react'

function Amount(props) {
    const [amount, setAmount] = useState(1); // 初期値1%

    return (
        <>
            <label htmlFor="amount">積立金額</label>

            <select
                id="amount"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
            >
                {props.amounts.map((amountItem) => (
                    <option key={amountItem} value={amountItem}>
                        {amountItem}円
                    </option>
                ))}
            </select>
        </>
    )
}

export default Amount;
