function UserGreeting(prop) {
    // if (prop.isLoggedIn === true) {
    //     return <h2>Welcome {prop.username}</h2>
    // } else {
    //     return <p>please log in</p>
    // }

    const welcomeMessage = <h2 className="wel" >welcome {prop.username}</h2>;
    const loginprompt = <h2 className="log-in">please log in first</h2>;

    return (prop.isLoggedIn ? welcomeMessage : loginprompt)
    
}
export default UserGreeting