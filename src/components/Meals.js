import React from "react";

const Meals = ({ show }) => {
    return (
        <div>
            {show.map((meal, index) => (
                <div key={index}>
                    <p>{meal.name}</p>
                </div>
            ))}
        </div>
    )
}

export default Meals;