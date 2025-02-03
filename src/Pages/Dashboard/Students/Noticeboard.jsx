import React, { useState, useEffect } from "react";
import useAxiosPublic from "../../../hooks/useAxiosPublic";


const Noticeboard = () => {
  const axiosPublic = useAxiosPublic();
  const [notice, setNotice] = useState("");
  const [date, setDate] = useState("");
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const response = await axiosPublic.get("/notice");
        setNotices(response.data);
      } catch (error) {
        alert("Error fetching notices");
      }
    };

    fetchNotices();
  }, [axiosPublic]);


  return (
    <div className="flex flex-col items-center min-h-screen  mt-10">
      <div className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-lg font-bold mb-4 text-center">Notices</h2>
        {notices.length === 0 ? (
          <p className="text-center">No notices available.</p>
        ) : (
          <ul className="space-y-4">
            {notices.map((item, index) => (
              <li key={index} className="p-4 bg-gray-50 border rounded">
                <p className="font-semibold">{item.notice}</p>
                <p className="text-sm text-gray-500">Date: {item.date}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Noticeboard;
