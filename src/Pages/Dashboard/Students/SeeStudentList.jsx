import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { AuthContext } from "../../../providers/AuthProvider";

const SeeStudentList = () => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [paymentUrl, setPaymentUrl] = useState(null); // Added state to store payment URL
  const { user } = useContext(AuthContext);
  const location = useLocation();
  const data = location?.state;

  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const response = await axiosPublic.get("/food");
        setFoods(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch food data");
        setLoading(false);
      }
    };

    fetchFoods();
  }, []);

  const handlePayment = (food) => {
    if (!user?.email) {
      console.error("User is not authenticated");
      return;
    }

    const paymentData = {
      email: user.email,
      foodId: food._id,
      items: food.items,
      price: food.price,
      mealType: food.mealType,
      enrollmentTime: food.enrollmentTime,
    };

    document.getElementById(`modal_${food._id}`).close();

    axiosPublic
      .post("/sslCommerce", { data: paymentData })
      .then((res) => {
        console.log(res.data);
        if (res.data?.paymentUrl) {
          setPaymentUrl(res.data.paymentUrl); // Store the payment URL in state
          // Optionally open it in a new window
          window.open(res.data.paymentUrl, "_blank"); 
        }
      })
      .catch((err) => console.error("Payment error:", err));
  };

  const openModal = (food) => {
    document.getElementById(`modal_${food._id}`).showModal();
  };

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="container mx-auto p-4 mt-10">
      <h1 className="text-2xl font-bold text-center mb-6">Food List</h1>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 gap-4">
        {foods.map((food) => (
          <div key={food._id} className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">{food.mealType}</h2>
              <p>
                <span className="font-semibold">Items:</span>{" "}
                {food.items.join(", ")}
              </p>
              <p>
                <span className="font-semibold">Price:</span> ${food.price}
              </p>
              <p>
                <span className="font-semibold">Enrollment Time before:</span>{" "}
                {new Date(food.enrollmentTime).toLocaleString()}
              </p>
              <button
                className="btn btn-primary mt-4"
                onClick={() => openModal(food)}
              >
                Proceed to Pay
              </button>
            </div>
            <dialog id={`modal_${food._id}`} className="modal">
              <div className="modal-box bg-green-400">
                <h3 className="font-bold text-lg text-center text-black">Are you sure?</h3>
                <p className="mt-5 text-center font-bold text-black">
                  Your total bill is ${food.price}
                </p>
                <div className="flex justify-center mt-5">
                  <button
                    onClick={() => handlePayment(food)}
                    className="btn btn-success text-white"
                  >
                    Pay the bill
                  </button>
                </div>
                <div className="modal-action">
                  <form method="dialog">
                    <button className="btn">Close</button>
                  </form>
                </div>
              </div>
            </dialog>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SeeStudentList;
