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
                {props.amounts.map((amount) => (
                    <option key={amount.value} value={amount.value}>
                        {amount.label}
                    </option>
                ))}
            </select>
        </>
    )
}

export default Amount;
