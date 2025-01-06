import React, { useEffect, useState, useContext } from "react";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { AuthContext } from "../../../providers/AuthProvider";

const SeeStudentList = () => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState({});
  const { user } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const [countdowns, setCountdowns] = useState({});

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

  useEffect(() => {
    const fetchPaymentStatus = async () => {
      if (!user?.email) return;
      try {
        const response = await axiosPublic.get(`/find-food-id?email=${user.email}`);
        console.log("Response data:", response.data);

        const foodData = response.data.foodData;
        if (Array.isArray(foodData)) {
          const statuses = foodData.reduce((acc, curr) => {
            if (curr.foodId && curr.status) {
              acc[curr.foodId] = curr.status;
            }
            return acc;
          }, {});
          setPaymentStatus(statuses);
        } else {
          console.error("foodData is not an array:", foodData);
        }
      } catch (err) {
        console.error("Failed to fetch payment status:", err);
      }
    };

    fetchPaymentStatus();
  }, [user]);

  useEffect(() => {
    const startCountdown = (food) => {
      const deadline = new Date(food.enrollmentTime);
      const id = food._id;
      const intervalId = setInterval(() => {
        const now = new Date();
        const timeRemaining = deadline - now;
        if (timeRemaining <= 0) {
          clearInterval(intervalId); 
          setCountdowns((prev) => ({ ...prev, [id]: "Time Over" }));
        } else {
          const minutes = Math.floor(timeRemaining / 60000);
          const seconds = Math.floor((timeRemaining % 60000) / 1000);
          const formattedTime = `${minutes}m ${seconds}s`;
          setCountdowns((prev) => ({ ...prev, [id]: formattedTime }));
        }
      }, 1000);
    };

    foods.forEach((food) => {
      startCountdown(food);
    });

    return () => {
      Object.keys(countdowns).forEach((id) => {
        clearInterval(countdowns[id]);
      });
    };
  }, [foods, countdowns]);

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
        if (res.data?.paymentUrl) {
          window.open(res.data.paymentUrl, "_blank");
        }
      })
      .catch((err) => console.error("Payment error:", err));
  };

  const openModal = (food) => {
    document.getElementById(`modal_${food._id}`).showModal();
  };

  const isTimeOver = (enrollmentTime) => {
    const now = new Date();
    const deadline = new Date(enrollmentTime);
    return now > deadline;
  };

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="container mx-auto p-4 mt-10">
      <h1 className="text-2xl font-bold text-center mb-6">Food List</h1>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 gap-4">
        {foods.map((food) => {
          const timeOver = isTimeOver(food.enrollmentTime);
          const alreadyEnrolled = paymentStatus[food._id] === "success";
          const countdown = countdowns[food._id];

          return (
            <div key={food._id} className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title">{food.mealType}</h2>
                <p>
                  <span className="font-semibold">Items:</span> {food.items.join(", ")}
                </p>
                <p>
                  <span className="font-semibold">Price:</span> ${food.price}
                </p>
                <p>
                  <span className="font-semibold">Enrollment Time before:</span>{" "}
                  {new Date(food.enrollmentTime).toLocaleString()}
                </p>
                {alreadyEnrolled ? (
                  <button className="btn btn-disabled mt-4 bg-gray-400 cursor-not-allowed">
                    Already Enrolled
                  </button>
                ) : timeOver ? (
                  <button className="btn btn-disabled mt-4 bg-gray-400 cursor-not-allowed">
                    Time Over
                  </button>
                ) : (
                  <>
                    <p className="text-center mt-2">{countdown}</p>
                    <button
                      className="btn btn-primary mt-4"
                      onClick={() => openModal(food)}
                    >
                      Proceed to Pay
                    </button>
                  </>
                )}
              </div>
              <dialog id={`modal_${food._id}`} className="modal">
                <div className="modal-box bg-green-400">
                  <h3 className="font-bold text-lg text-center text-black">
                    Are you sure?
                  </h3>
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
          );
        })}
      </div>
    </div>
  );
};

export default SeeStudentList;
