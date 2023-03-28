import React from "react";

const Ingredients = ({ show }) => {
    return (
        <div>
            {show.map((meal, index) => (
                <div key={index}>
                    <p>{meal.ingredients}</p>
                </div>
            ))}
        </div>
    )
}

export default Ingredients;