import React from "react";

const QuestionCard = ({ question, index, handleAnswer }) => {
  const options = [
    { key: "a", text: question.option_a },
    { key: "b", text: question.option_b },
    { key: "c", text: question.option_c },
    { key: "d", text: question.option_d },
  ];

  return (
    <div className="border p-4 rounded-lg shadow">
      <h2 className="font-bold">
        {index + 1}. {question.question}
      </h2>

      {options.map((option) => (
        <div key={option.key}>
          <input
            type="radio"
            name={`question-${question.id}`} // Use question ID
            value={option.key}
            onChange={() => handleAnswer(option.key)}
          />
          <label className="ml-2">{option.text}</label>
        </div>
      ))}
    </div>
  );
};

export default QuestionCard;
