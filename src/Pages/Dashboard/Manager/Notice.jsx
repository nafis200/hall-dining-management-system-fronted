import React, { useState } from "react";
import useAxiosPublic from "../../../hooks/useAxiosPublic";


const Notice = () => {
  const axiosPublic = useAxiosPublic();
  const [notice, setNotice] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!notice || !date) {
      alert("Please fill out both fields");
      return;
    }

    try {
      const response = await axiosPublic.post("/notice", { notice, date });
      alert(response.data.message);
      setNotice("");
      setDate("");
    } catch (error) {
      alert("Error submitting the notice: " + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-96">
        <h1 className="text-xl font-bold mb-4 text-center">Submit Notice</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <textarea
            className="textarea textarea-bordered w-full"
            placeholder="Enter your notice"
            value={notice}
            onChange={(e) => setNotice(e.target.value)}
          ></textarea>
          <input
            type="date"
            className="input input-bordered w-full"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <button className="btn btn-primary w-full">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Notice;
