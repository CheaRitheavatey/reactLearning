import PropTypes from 'type-check'
function Student(prop) {
    return (
        <div className="student">
            <p>Name: {prop.name}</p>
            <p>Age: {prop.age}</p>
            <p>Student: {prop.isStudent ? "Yes": "No"}</p>
        </div>
    );

} 

// defining protype so that its easy for debugging altho its not going to show any error
Student.propTypes = {
    name: PropTypes.string,
    age: PropTypes.number,
    isStudent: PropTypes.bool
}

// default proptype
Student.defaultProps = {
    name: "Guest",
    age: 0,
    isStudent: false
}

export default Student