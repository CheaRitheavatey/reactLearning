function List() {
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
    // fruits.sort((a,b) => a.name.localeCompare(b.name)); // a-> z
    // fruits.sort((a,b) => b.name.localeCompare(a.name)); // z->a
    
    // sort calories
    fruits.sort((a,b) => a.calorie-b.calorie);


    // const lowcal = fruits.filter(fruit => fruit.calorie <= 100)
    const highcal = fruits.filter(fruit => fruit.calorie > 100)
    const item = highcal.map(fruit => <li key={fruit.id}>{fruit.name}: {fruit.calorie}</li>)
    
    return (
        <ul>{item}</ul>
    )
}
export default List