function List(prop) {
    const category = prop.category;
    const itemList = prop.item
    
    // fruits.sort((a,b) => a.name.localeCompare(b.name)); // a-> z
    // fruits.sort((a,b) => b.name.localeCompare(a.name)); // z->a
    
    // sort calories
    // prop.item.sort((a,b) => a.calorie-b.calorie);


    // const lowcal = fruits.filter(fruit => fruit.calorie <= 100)
    // const highcal = itemList.filter(fruit => item.calorie > 100)
    const items = itemList.map(item => <li key={item.id}>{item.name}: {item.calorie}</li>)
    
    // default category when item dont have a category
  
    List.defaultProps = {
        category: "category",
        item: []
    }
    return (
        <>
            <h3 className="list-category">{category}</h3>
            <ul className="list-item">{items}</ul>
        </>
    )  
}
export default List