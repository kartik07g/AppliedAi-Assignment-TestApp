import config from "./config";

export const fetchQuestions = () => {
    return fetch(`${config.BACKEND_API_BASE_URL}/backend/test/questions/`, {
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
  
  const response = await fetch(`${config.BACKEND_API_BASE_URL}/backend/test/submit/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ answers }),
  });
  return response.json();
};
