// const API_URL = process.env.FASTAPI_BACKEND_URL || "http://localhost:5000";

export const fetchQuestions = () => {
    return fetch("http://localhost:5000/questions/", {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      }
    })
    .then(response => {
      console.log("Raw Response:", response);
      return response.json();  // Convert response to JSON
    })
    .then(data => {
      console.log("Parsed JSON Data:", data);
      return data;
    })
    .catch(error => {
      console.error("Error fetching questions:", error);
      return [];
    });
  };

export const submitAnswers = async (answers) => {
  
  const response = await fetch(`http://localhost:5000/submit/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ answers }),
  });
  return response.json();
};
