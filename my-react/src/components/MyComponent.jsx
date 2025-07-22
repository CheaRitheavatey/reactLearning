import React, {useState} from "react";
function MyComponent() {
    const [name, setName] = useState();
    const [age, setAge] = useState(0);
    const [isEmployed, setIsEmployed] = useState(false);


    const updateName = () => {
        setName("Jonh Doe");
    }
    const updateAge = () => {
        setAge(age + 1);
    }
    const updateEmployed = () => {
        setIsEmployed(!isEmployed);
    }
    

    return (
        <div>
            <p>Name: {name}</p>
            <button onClick={updateName}>Set Name</button>

            <p>Age: {age}</p>
            <button onClick={updateAge}>Add Age</button>

            <p>Is Employed: {isEmployed ? "yes" : "no"}</p>
            <button onClick={updateEmployed}>Status Toggle</button>
        </div>
    );
}
export default MyComponent;