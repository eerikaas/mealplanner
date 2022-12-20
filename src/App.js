import React, { useState, useEffect } from 'react';
import Meals from './components/Meals';
import Ingredients from './components/Ingredients';
import { db } from './utils/firebase';
import { ref, onValue } from 'firebase/database'

function App() {
  const [meals, setMeals] = useState([])
  const [selectedMeals, setSelectedMeals] = useState([])
  const [shoppingList, setShoppingList] = useState([])

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
    setShoppingList([...shoppingList, ...selectedMeals.map(item => item.ingredients)])
    console.log(shoppingList.join(','))
  }



  const handleCopy = () => {
    const textToCopy = document.getElementById(shoppingList)
    const hiddenInput = document.createElement("input")
    hiddenInput.setAttribute("type", "hidden")
    hiddenInput.setAttribute("value", textToCopy.innerHTML)
    document.body.appendChild(hiddenInput)
    hiddenInput.select()
    document.execCommand("copy")
    document.body.removeChild(hiddenInput)
    alert('List has been copied to clipboard')

  }

  return (
  <div className='App'>
  <h1>Meal planner</h1>
  <h2>Meal plan:</h2>
  <button onClick={generateMealPlan}>Generate meal plan</button>
  <Meals show={selectedMeals}/>
  <h2>Shopping list:</h2>
  <button onClick={generateShoppingList}>Generate shopping list</button>
  <button onClick={handleCopy}>Copy to clipboard</button>
  </div>
  )
}

export default App;