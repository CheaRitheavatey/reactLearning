import Card from "./components/Card"
import Button from "./components/Button"
import Student from "./components/Student"
import UserGreeting from "./components/UserGreeting"
import List from "./components/List"
import MyComponent from "./components/myComponent"
import Counter from "./components/Counter"
import ColorPicker from "./components/ColorPicker"
function App() {
       const vegetable = [{
            id:6,
            name: "potatoes",
            calorie: 110
        }, 
        {
            id:7,
            name: "celery",
            calorie: 15
        }, 
        {
            id: 8,
            name: "carrots",
            calorie: 25
        }, 
        {
            id: 9,
            name: "corn",
            calorie: 63}]

        const fruits = [
        {
            id:1,
            name: "apple",
            calorie: 95
        }, 
        {
            id:2,
            name: "banana",
            calorie: 105
        }, 
        {
            id: 3,
            name: "coconut",
            calorie: 50
        }, 
        {
            id: 4,
            name: "durian",
            calorie: 110}]
  return (
    <>  

    <ColorPicker></ColorPicker>
        {/* onChange */}
        {/* <Counter></Counter> */}


        <MyComponent/>

      {/* <Button/> */}
      {/* {vegetable.length > 0 && <List item={vegetable} category="vegetable"/>} */}

      {/* <hr /> */}
      {/* {fruits.length > 0 && <List item={fruits} category="fruit"/> } */}
      {/* <List/>
      <Student name="spongebob" age={14} isStudent={true} />
      <hr />
      <Student name="patrick" age={34} isStudent={false} />
      <hr />
      <Student name="squidward" age={50} isStudent={false} />
      <hr />
      <Student name="sandy" age={27} isStudent={true} />
      <hr />
      <Student />
      <hr />
      <UserGreeting isLoggedIn={true} username="my name"/>

      <br />
      <Card/>
      <Card/>
      <Card/> */}
    
    </>
  )
}

export default App
