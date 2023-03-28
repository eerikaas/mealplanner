import React from "react"; 
 
const ShoppingList = ({ ingredients }) => { 
  return ( 
    <div id="shoppingList"> 
      {ingredients.map((meal, index) => ( 
        <p className="shoppingList" key={index}>{meal}</p> 
      ))} 
    </div> 
  ); 
}; 
 
export default ShoppingList;