import React, {useState} from 'react'

function MyComponent2() {
    const [food, setFood] = useState(["Apple", "Banana", "Mango"]);
    function handleAddFood() {
        const newFood = document.getElementById('foodInput').value;
        document.getElementById('foodInput').value = "";
        setFood(f => [...f , newFood]);
    }

    function removeFood(index) {
        setFood(food.filter((_, i) => i !== index))

    }
    return (
        <div>
            <h2>List of Food</h2>
            <ul>
                {food.map((value, index) =>
                <li key={index} onClick={() => removeFood(index)}>
                    {value}
                </li>)}
            </ul>

            <input type="text" placeholder='Enter new Food' id='foodInput'/>
            <button onClick={handleAddFood}>Add Food</button>
        </div>
    );
    
}

export default MyComponent2