import React, {useState} from "react";
function MyComponent() {
    // useState() - transform place that have name to setName
    const [name, setName] = useState();
    const [age, setAge] = useState(0);
    const [isEmployed, setIsEmployed] = useState(false);
    const [quanity, setQuanity] = useState();
    const [comment, setComment] = useState("");
    const [payment, setPayment] = useState("");
    const [divery, setDivery] = useState("");
    const updateName = () => {
        setName("Jonh Doe");
    }
    const updateAge = () => {
        setAge(age + 1);
    }
    const updateEmployed = () => {
        setIsEmployed(!isEmployed);
    }

    // useChange = event handler used with form element
    //              ex. <input>, <textarea>, <radio>
    //              trigger a function every time the value of the input change
    

    function handleNameChange(event) {
        setName(event.target.value)    
    }
    function handleQuanityChange(e) {
        setQuanity(e.target.value)

    }
    function handleCommentChange(e) {
        setComment(e.target.value)
    }
    function handlePaymentChange(e) {
        setPayment(e.target.value)
    }
    function handleDiveryChange(e) {
        setDivery
    }
    return (
        <div>
            <p>Name: {name}</p>
            <button onClick={updateName}>Set Name</button>

            <p>Age: {age}</p>
            <button onClick={updateAge}>Add Age</button>

            <p>Is Employed: {isEmployed ? "yes" : "no"}</p>
            <button onClick={updateEmployed}>Status Toggle</button>

            {/* onChange */}
            <input type="text" value={name} onChange={handleNameChange} />
            <p>Name: {name}</p>

            <input type="Number" value={quanity} onChange={handleQuanityChange}/>
            <p>Quanity: {quanity}</p>

            <textarea name="comment" id="comment" value={comment} onChange={handleCommentChange} placeholder="leave your comment"></textarea>
            <p>Comment: {comment}</p>

            <select name="payment" id="payment" value={payment} onChange={handlePaymentChange}>
                <option value="">Select an Option</option>
                <option value="visa">Visa</option>
                <option value="masterCard">Master Card</option>
                <option value="giftCard">Gift Card</option>
            </select>
            <p>Payment: {payment}</p>
        </div>
    );
}
export default MyComponent;