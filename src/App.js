import React, { useState, useEffect } from 'react';
import Meals from './components/Meals';
import Ingredients from './components/Ingredients';
import ShoppingList from './components/ShoppingList';
import './App.css'

function App() {
  const [meals, setMeals] = useState([]);
  const [selectedMeals, setSelectedMeals] = useState([]);
  const [shoppingList, setShoppingList] = useState([]);
  const [mealName, setMealName] = useState('');
  const [ingredients, setIngredients] = useState('');

  const getMealData = () => {
    fetch('https://mealplanner-e0f27-default-rtdb.europe-west1.firebasedatabase.app/.json')
      .then((response) => response.json())
      .then((data) => {
        setMeals(data.meals)
      })
      .catch((error) => {
        console.log('Error:', error);
      });
  };

  const writeMealData = () => {
    const newMeal = {
      name: mealName,
      ingredients: ingredients.split(',').map((ingredient) => ingredient.trim())
    };

    fetch('https://mealplanner-e0f27-default-rtdb.europe-west1.firebasedatabase.app/.json', {
      method: 'POST',
      body: JSON.stringify({ meal: newMeal })
    })
      .then((response) => response.json())
      .then(() => {
        setMealName('');
        setIngredients('');
        alert('Meal added successfully!');
      })
      .catch((error) => {
        console.log('Error:', error);
      });
  };

  useEffect(() => {
    getMealData();
  }, []);

  const generateMealPlan = () => {
    const selectedMealsArray = [];
    for (let i = 0; i < 5; i++) {
      const randomIndex = Math.floor(Math.random() * meals.length);
      selectedMealsArray.push(meals[randomIndex]);
      meals.splice(randomIndex, 1);
    }
    setSelectedMeals(selectedMealsArray);
  };

  const generateShoppingList = () => {
    const ingredients = selectedMeals.map((item) => item.ingredients).flat();
    setShoppingList(ingredients);
  };

  const handleCopy = async () => {
    const text = document.querySelectorAll('.shoppingList');
    const clipBoardArray = [];
    text.forEach((element) => {
      clipBoardArray.push(element.innerHTML);
    });
    const textToBeCopied = clipBoardArray.join(', ');
    try {
      await navigator.clipboard.writeText(textToBeCopied);
      alert('Content copied to clipboard');
    } catch (err) {
      alert(`Failed to copy: ${err.message}`);
    }
  };

  return (
    <div className='App'>
      <h1>Meal planner</h1>
      <h2>Meal plan:</h2>
      <button className='Button' onClick={generateMealPlan}>
        Generate meal plan
      </button>
      <Meals className='Text' show={selectedMeals} />
      <h2>Shopping list:</h2>
      {shoppingList && <ShoppingList className='Text' ingredients={shoppingList} />}
      <button className='Button' onClick={generateShoppingList}>
        Generate shopping list
      </button>
      <button className='Button' onClick={handleCopy}>
        Copy to clipboard
      </button>
      <h2>WIP</h2>
      <h3>Add meal to database:</h3>
      <input
        placeholder='Meal'
        value={mealName}
        onChange={(e) => setMealName(e.target.value)}
      ></input>
    </div>
  )
  }


export default App;