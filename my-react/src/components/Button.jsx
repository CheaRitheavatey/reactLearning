import styles from "./Button.module.css"
function Button() {
    const style = {
    
        backgroundColor: "rgb(113, 113, 222)",
        color: "white",
        padding: "10px 20px",
        borderRadius: "5px",
        border: "none",
        cursor: "pointer",

    }

    let count = 0;
    const handleClick = (name) => {
        if (count < 3) {
            count++;
            console.log("You click "+ count + " times")
        } else {
            console.log("stop click!");

        }
        
    };
   

    const handleClick2 = (e) => e.target.textContent = "ouch";
    return (
        <button className={styles.btn} onClick={(e) => handleClick2(e)}>Click Me</button>
    )
}
export default Button