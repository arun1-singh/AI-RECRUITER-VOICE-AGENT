"use client";
import React from "react";

function QuestionListContainer({ questionList }) {
  const getBadgeColor = (type) => {
    switch ((type || "").toLowerCase()) {
      case "technical":
        return "bg-blue-100 text-blue-800";
      case "behavioral":
        return "bg-green-100 text-green-800";
      case "experience":
        return "bg-purple-100 text-purple-800";
      case "problem solving":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="mt-12 space-y-5">
      <h3 className="text-xl font-semibold text-center text-primary">
        
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {questionList.map((q, i) => (
          <div
            key={i}
            className="p-4 rounded-xl bg-gray-50 border shadow-sm hover:shadow-md transition-all"
          >
            <p className="font-medium text-gray-800">{q.question}</p>
            <div className="mt-2">
              <span
                className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getBadgeColor(
                  q.type
                )}`}
              >
                {q.type || "Unknown"}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default QuestionListContainer;
