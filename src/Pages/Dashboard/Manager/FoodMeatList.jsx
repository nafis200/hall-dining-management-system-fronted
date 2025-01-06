

import React, { useState } from "react";
import "tailwindcss/tailwind.css";
import "daisyui/dist/full.css"; // Import DaisyUI

const FoodMeatList = () => {
  const [items, setItems] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const addItem = (type) => {
    if (inputValue.trim() !== "") {
      const newItem = inputValue.trim();
      setItems([...items, newItem]);
      setInputValue(""); 
    }
  };

  const deleteItem = (itemToDelete) => {
    setItems(items.filter(item => item !== itemToDelete));
  };

  return (
    <div className="max-w-md mx-auto py-8">
        <label className="block text-sm font-medium text-gray-700 mt-20 ">Add food or meat:</label>
      <div className="mb-4 flex">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="input input-bordered w-full mt-2"
          placeholder="Add Food"
        />
         <button className="btn btn-primary mt-2 ml-8" onClick={() => addItem("food")}>
          Add Item
        </button>
      </div>

      <div>
        {items.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {items.map((item, index) => (
              <div key={index} className="badge badge-primary">
                {item}
                <button
                  className="ml-2 text-white"
                  onClick={() => deleteItem(item)}
                >
                  ❌
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FoodMeatList;
