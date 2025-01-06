import React, { useState, useEffect, useContext } from "react";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { AuthContext } from "../../../providers/AuthProvider";

const SeePayment = () => {
  const { user } = useContext(AuthContext);
  const [foodData, setFoodData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    if (!user?.email) {
      setError("User is not authenticated");
      setLoading(false);
      return;
    }

    const fetchFoodData = async () => {
      try {
        const response = await axiosPublic.get(`/find-food-id?email=${user.email}`);

        if (response.data.success) {
          setFoodData(response.data.foodData);
        } else {
          setError(response.data.message || "No data found for the user.");
        }
      } catch (err) {
        setError("Failed to fetch payment status.");
      } finally {
        setLoading(false);
      }
    };

    fetchFoodData();
  }, [user]);

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="container mx-auto p-4 mt-10">
      <h1 className="text-2xl font-bold text-center mb-6">Payment Details</h1>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 gap-4">
        {foodData.length === 0 ? (
          <p className="text-center">No payment details available for this user.</p>
        ) : (
          foodData.map((food) => (
            <div key={food._id} className="card bg-base-100 shadow-xl p-4">
              <div className="card-body">
                <h2 className="card-title">Payment Information</h2>
                
                <p>
                  <span className="font-semibold">Payment ID:</span> {food.paymentId}
                </p>
                <p>
                  <span className="font-semibold">Food ID:</span> {food.foodId}
                </p>
                <p>
                  <span className="font-semibold">Email:</span> {food.email}
                </p>
                <p>
                  <span className="font-semibold">Price:</span> ${food.price}
                </p>
                <p>
                  <span className="font-semibold">Payment Status:</span> {food.status}
                </p>

                <div className="mt-4">
                  {food.status === "success" ? (
                    <button className="btn btn-success w-full">
                      Payment Successful
                    </button>
                  ) : (
                    <button className="btn btn-warning w-full">
                      Pending Payment
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SeePayment;
