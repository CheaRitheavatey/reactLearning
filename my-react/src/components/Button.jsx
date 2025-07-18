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
    return (
        <button className={styles.btn}>Click Me</button>
    )
}
export default Button