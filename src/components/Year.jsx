import { useState } from 'react'

function Year(props) {
    const [year, setYear] = useState(1); // 初期値1%

    return (
        <>
            <label htmlFor="rate">積立期間</label>

            <select
                id="year"
                value={year}
                onChange={(e) => setYear(Number(e.target.value))}
            >
                {props.years.map((year) => (
                    <option key={year.value} value={year.value}>
                        {year.label}
                    </option>
                ))}
            </select>
        </>
    )
}

export default Year;
