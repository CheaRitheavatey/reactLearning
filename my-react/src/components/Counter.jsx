import { useState } from "react"

function Counter() {

    const [count, setCount] = useState(0);
    const increamentCount = () => {
        setCount(count + 1) 
    }

    const decrementCount = () => {
        setCount(count - 1)
    }

    const reset = () => {
        setCount(0)
    }
    return (

        <div className="counter-container">
            <p className="display-count">{count}</p>
            <button className="btn" onClick={increamentCount}>+</button>
            <button className="btn" onClick={decrementCount}>-</button>
            <button className="btn" onClick={reset}>Reset</button>
        </div>
    )
}
export default Counter