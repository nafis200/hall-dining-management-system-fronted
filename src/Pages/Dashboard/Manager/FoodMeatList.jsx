import React, { useState } from "react";
import "tailwindcss/tailwind.css";
import "daisyui/dist/full.css"; // Import DaisyUI

const FoodMeatList = () => {
  const [items, setItems] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [price, setPrice] = useState("");
  const [mealType, setMealType] = useState("lunch");
  const [enrollmentTime, setEnrollmentTime] = useState("");
  const [isEnrollmentOpen, setIsEnrollmentOpen] = useState(true);

  // Function to add item to the list
  const addItem = () => {
    if (inputValue.trim() !== "") {
      const newItem = inputValue.trim();
      setItems([...items, newItem]);
      setInputValue(""); 
    }
  };

  // Function to delete an item from the list
  const deleteItem = (itemToDelete) => {
    setItems(items.filter(item => item !== itemToDelete));
  };

  // Function to check if the enrollment is open
  const checkEnrollmentStatus = () => {
    const currentDateTime = new Date();
    const selectedDateTime = new Date(enrollmentTime);

    if (currentDateTime > selectedDateTime) {
      setIsEnrollmentOpen(false);
      setItems([]);  // Clear the food list if the time is over
    } else {
      setIsEnrollmentOpen(true);
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Collect form data
    const formData = {
      items: items,
      price: price,
      mealType: mealType,
      enrollmentTime: enrollmentTime
    };

    console.log("Form Submitted: ", formData);

    // Clear food items after submission
    setItems([]);
    setInputValue("");
    setPrice("");
    setMealType("lunch");
    setEnrollmentTime("");
  };

  return (
    <div className="max-w-md mx-auto py-8">
      {/* Food Input and Button */}
      <label className="block text-sm font-medium text-gray-700 mt-8">Add food or meat:</label>
      <div className="mb-4 flex">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="input input-bordered w-full mt-2"
          placeholder="Add Food"
        />
        <button className="btn btn-primary mt-2 ml-8" onClick={addItem}>
          Add Item
        </button>
      </div>

      <div className="mt-8">
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

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Price:</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="input input-bordered w-full mt-2"
            placeholder="Enter Price"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Meal Type:</label>
          <select
            value={mealType}
            onChange={(e) => setMealType(e.target.value)}
            className="select select-bordered w-full mt-2"
            required
          >
            <option value="lunch">Lunch</option>
            <option value="dinner">Dinner</option>
            <option value="morning">Morning</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Enrollment Time:</label>
          <input
            type="datetime-local"
            value={enrollmentTime}
            onChange={(e) => setEnrollmentTime(e.target.value)}
            className="input input-bordered w-full mt-2"
            required
          />
        </div>
        <div className="mb-4">
          <button type="submit" className="btn btn-success w-full mt-4">
            Submit Form
          </button>
        </div>
      </form>
    </div>
  );
};

export default FoodMeatList;
