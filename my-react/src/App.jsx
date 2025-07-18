import Card from "./components/Card"
import Button from "./components/Button"
import Student from "./components/Student"
import UserGreeting from "./components/UserGreeting"
function App() {
  return (
    <>

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

      <Button/>
      <br />
      <Card/>
      <Card/>
      <Card/>
    
    </>
  )
}

export default App
