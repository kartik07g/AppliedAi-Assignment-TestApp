import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="p-4 text-center">
      <h1 className="text-2xl font-bold mb-4">Welcome to the MCQ Test</h1>
      <button onClick={() => navigate("/test")} className="p-2 bg-blue-500 text-white">
        Start Test
      </button>
    </div>
  );
};

export default Home;
