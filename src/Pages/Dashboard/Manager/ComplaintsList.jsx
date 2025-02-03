import React, { useState, useEffect } from "react";

import "daisyui/dist/full.css";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const ComplaintsList = () => {
  const [complaints, setComplaints] = useState([]);
  const [message, setMessage] = useState("");
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await axiosPublic.get("/complaints");
        setComplaints(response.data);
      } catch (error) {
        setMessage("Error fetching complaints: " + error.message);
      }
    };

    fetchComplaints();
  }, [axiosPublic]);

  return (
    <div className="min-h-screen bg-base-200 p-10">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Complaints</h1>

        {message && <div className="alert alert-error mb-6">{message}</div>}

        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-6">
          {complaints.length === 0 ? (
            <p className="text-center">No complaints found.</p>
          ) : (
            complaints.map((complaint, index) => (
              <div key={index} className="card bg-white shadow-md p-6">
                <h2 className="font-bold">Complain</h2>
                <p className="mt-2">{complaint.complaintText}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ComplaintsList;
