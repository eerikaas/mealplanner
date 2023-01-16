import React, { useState, useEffect } from 'react';
import Meals from './components/Meals';
import Ingredients from './components/Ingredients';
import ShoppingList from './components/ShoppingList';
import './App.css'

function App() {
  const [meals, setMeals] = useState([])
  const [selectedMeals, setSelectedMeals] = useState([])
  const [shoppingList, setShoppingList] = useState([])
  const [newName, setNewName] = useState([])
  const [newIngredients, setNewIngredients] = useState([])

  const getMealData = () => {
    fetch('https://mealplanner-e0f27-default-rtdb.europe-west1.firebasedatabase.app/.json')
    .then((response) => response.json())
    .then((data) => {
      setMeals(data.meals)
    })
    .catch(() => {
      console.log('error')
    })
  }

  const writeMealData = (mealName, ingredients) => {
    fetch('https://mealplanner-e0f27-default-rtdb.europe-west1.firebasedatabase.app/.json',
    {
      method: 'POST',
      body: JSON.stringify()
    })
    
  }

  useEffect(() => {
    getMealData();
  }, [])

  const generateMealPlan = () => {
    const selectedMealsArray = []
    for (let i = 0; i < 5; i++) {
      const randomIndex = Math.floor(Math.random() * meals.length)
      selectedMealsArray.push(meals[randomIndex])
      meals.splice(randomIndex, 1)
    }
    setSelectedMeals(selectedMealsArray)

    
  }
  console.log(selectedMeals)

  const generateShoppingList = () => {
    let ingredients = selectedMeals.map((item) => item.ingredients);
    let merged = ingredients.flat(1);
    console.log(merged);
    setShoppingList(merged);
    console.log(shoppingList);
  };



  const handleCopy = async () => {
    let text = document.querySelectorAll(".shoppingList");
    let clipBoardArray = [];
    text.forEach((element) => {
      clipBoardArray.push(element.innerHTML);
    });
    let textToBeCopied = clipBoardArray.join(", ");
    console.log(textToBeCopied);
    try {
      await navigator.clipboard.writeText(textToBeCopied);
      alert("Content copied to clipboard");
    } catch (err) {
      alert("Failed to copy: ", err.message);
    }
  };

  return (
  <div className='App'>
  <h1>Meal planner</h1>
  <h2>Meal plan:</h2>
  <button className='Button' onClick={generateMealPlan}>Generate meal plan</button>
  <Meals className="Text" show={selectedMeals}/>
  <h2>Shopping list:</h2>
  {shoppingList && <ShoppingList className="Text" ingredients={shoppingList} />}
  <button className='Button' onClick={generateShoppingList}>Generate shopping list</button>
  <button className="Button" onClick={handleCopy}>Copy to clipboard</button>
  <h3>Add meal to database:</h3>
  <input placeholder='Meal' value={mealName}  onChange={(e) => setNewName(e.target.value)}></input>
  <input placeholder='Ingredients (divide with comma)' value={ingredients} onChange={(e) => setNewIngredients(e.target.value)}></input>
  <button onClick={writeMealData}>Add</button>
  </div>
  )
}

export default App;