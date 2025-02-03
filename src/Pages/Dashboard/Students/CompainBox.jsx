import React, { useContext, useState } from "react";
import "daisyui/dist/full.css";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { AuthContext } from "../../../providers/AuthProvider";

const CompainBox = () => {
  const [complaintText, setComplaintText] = useState("");
  const [message, setMessage] = useState("");
  const axiosPublic = useAxiosPublic();
  const { user } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosPublic.post("/complaints", {
        email: user?.email,
        complaintText,
      });

      setMessage(`Complaint submitted successfully! ID`);
      setComplaintText("");
    } catch (error) {
      setMessage("Error: " + error.message);
    }
  };

  return (
    <div className="min-h-screen bg-base-200 p-10">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold text-center mb-4">Complaint Form</h1>
        <div className="card p-6 bg-white shadow-md">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="label">Email</label>
              <input
                type="text"
                value={user?.email}
                className="input input-bordered w-full"
                readOnly
              />
            </div>

            <div>
              <label className="label">Complaint</label>
              <textarea
                placeholder="Describe your complaint"
                className="textarea textarea-bordered w-full"
                value={complaintText}
                onChange={(e) => setComplaintText(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary w-full">
              Submit Complaint
            </button>
          </form>

          {message && (
            <div className="mt-4 text-center">
              <p>{message}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CompainBox;
