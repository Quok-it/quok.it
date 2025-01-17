"use client";
import { useState } from "react";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { questions, type Question } from "./questions.config";

export default function Waitlist() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string | string[]>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // Add this handler near your other state declarations
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      // Don't trigger on multiselect
      if (questions[currentQuestion].type !== "multiselect") {
        handleNext();
      }
    }
  };
  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      setError(null);

      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(answers),
      });

      if (!response.ok) {
        throw new Error("Failed to submit");
      }

      setIsSubmitted(true);
    } catch (error) {
      console.error("Error submitting:", error);
      setError("Failed to submit. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Get all questions that should be shown based on current answers
  const getVisibleQuestions = () => {
    return questions.filter(
      (q) => !q.showIf || q.showIf(answers as Record<number, string>)
    );
  };

  console.log("currentQuestion ID: ", currentQuestion);
  console.log("Dynamic length: ", getVisibleQuestions().length - 1);
  const isLastQuestion = () => {
    let nextIndex = currentQuestion + 1;
    while (nextIndex < questions.length) {
      if (
        !questions[nextIndex].showIf ||
        questions[nextIndex].showIf?.(answers as Record<number, string>)
      ) {
        return false;
      }
      nextIndex++;
    }
    return true;
  };
  const handleNext = () => {
    // If we're on a choice question, let the onClick handler handle navigation
    if (questions[currentQuestion].type === "choice") {
      return;
    }

    let nextIndex = currentQuestion + 1;
    const visibleQuestions = getVisibleQuestions();

    // Find the next visible question after the current one
    while (nextIndex < questions.length) {
      // Check if this question should be shown
      if (
        !questions[nextIndex].showIf ||
        questions[nextIndex].showIf?.(answers as Record<number, string>)
      ) {
        setCurrentQuestion(nextIndex);
        return;
      }
      nextIndex++;
    }

    // If we reach here, we're at the end
    console.log("Survey completed!", answers);
  };
  const handlePrevious = () => {
    const visibleQuestions = getVisibleQuestions();
    const currentIndex = visibleQuestions.findIndex(
      (q) => q.id === questions[currentQuestion].id
    );

    if (currentIndex > 0) {
      const prevQuestion = visibleQuestions[currentIndex - 1];
      setCurrentQuestion(questions.findIndex((q) => q.id === prevQuestion.id));
    }
  };

  const handleAnswer = (answer: string | string[]) => {
    setAnswers((prev) => ({
      ...prev,
      [questions[currentQuestion].id]: answer,
    }));
  };
  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="w-full max-w-2xl mx-auto p-6 text-center space-y-6">
          <h2 className="text-4xl font-bold">Thank You!</h2>
          <p className="text-gray-400">
            Your submission has been received. We'll be in touch soon!
          </p>
          <div className="mt-8">
            <a
              href="https://quok.it"
              className="text-red-500 hover:text-red-400 transition-colors"
            >
              Return to Homepage
            </a>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div
      className="min-h-screen bg-black text-white flex items-center justify-center"
      onKeyDown={handleKeyPress}
      tabIndex={0} // Makes the div focusable
    >
      <div className="w-full max-w-2xl mx-auto p-6">
        <div className="space-y-8">
          <h2 className="text-4xl font-bold">
            {questions[currentQuestion].question}
          </h2>
          {questions[currentQuestion].subtext && (
            <p className="mt-4 text-gray-400">
              {questions[currentQuestion].subtext}
            </p>
          )}

          {questions[currentQuestion].type === "intro" && (
            <button
              onClick={handleNext}
              className="w-full mt-8 p-4 bg-red-500 rounded-lg 
                      hover:bg-red-600 hover:shadow-[0_0_30px_rgba(204,0,0,0.8)]
                      shadow-[0_0_15px_rgba(204,0,0,0.5)]
                      transition-all duration-300 text-center font-semibold"
            >
              Get Started
            </button>
          )}

          {questions[currentQuestion].type === "choice" && (
            <div className="space-y-3">
              {questions[currentQuestion].options?.map((option) => (
                <button
                  key={option}
                  onClick={() => {
                    handleAnswer(option);
                    // Find next visible question after setting the answer
                    let nextIndex = currentQuestion + 1;
                    while (nextIndex < questions.length) {
                      if (
                        !questions[nextIndex].showIf ||
                        questions[nextIndex].showIf?.({
                          ...answers,
                          [questions[currentQuestion].id]: option,
                        } as Record<number, string>)
                      ) {
                        setCurrentQuestion(nextIndex);
                        return;
                      }
                      nextIndex++;
                    }
                  }}
                  className="w-full p-4 text-left rounded-lg border border-white/10 
                  hover:border-red-500 hover:bg-red-500/10 transition-all duration-300"
                >
                  {option}
                </button>
              ))}
            </div>
          )}

          {(questions[currentQuestion].type === "text" ||
            questions[currentQuestion].type === "email") && (
            <input
              type={questions[currentQuestion].type}
              placeholder={questions[currentQuestion].placeholder}
              value={(answers[questions[currentQuestion].id] as string) || ""}
              onChange={(e) => handleAnswer(e.target.value)}
              onKeyDown={handleKeyPress}
              className="w-full p-4 bg-transparent rounded-lg border border-white/10 
             focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20
             transition-all duration-300"
            />
          )}

          {questions[currentQuestion].type === "multiselect" && (
            <div className="space-y-3">
              {questions[currentQuestion].options?.map((option) => {
                const currentAnswers =
                  (answers[questions[currentQuestion].id] as string[]) || [];
                const isSelected = currentAnswers.includes(option);

                return (
                  <button
                    key={option}
                    onClick={() => {
                      const newAnswers = isSelected
                        ? currentAnswers.filter((item) => item !== option)
                        : [...currentAnswers, option];
                      handleAnswer(newAnswers);
                    }}
                    className={`w-full p-4 text-left rounded-lg border 
                              transition-all duration-300 flex items-center justify-between
                              ${
                                isSelected
                                  ? "border-red-500 bg-red-500/10"
                                  : "border-white/10 hover:border-red-500 hover:bg-red-500/10"
                              }`}
                  >
                    <span>{option}</span>
                    {isSelected && <span className="text-red-500">✓</span>}
                  </button>
                );
              })}

              {(answers[questions[currentQuestion].id] as string[])?.length >
                0 && (
                <button
                  onClick={handleNext}
                  className="w-full p-4 bg-red-500 rounded-lg hover:bg-red-600 
                            transition-all duration-300 text-center font-semibold"
                >
                  Continue
                </button>
              )}
            </div>
          )}

          {questions[currentQuestion].type !== "intro" && (
            <div className="flex justify-between mt-12">
              <button
                onClick={handlePrevious}
                className={`flex items-center gap-2 px-6 py-3 text-white hover:text-red-500 
                transition-colors font-semibold
                ${currentQuestion === 0 ? "invisible" : ""}`}
              >
                <FiArrowLeft className="w-5 h-5" /> Previous
              </button>
              {isLastQuestion() ? (
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className={`px-8 py-3 bg-red-500 rounded-lg 
                transition-all duration-300 text-center font-semibold
                ${
                  isSubmitting
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-red-600 hover:shadow-[0_0_30px_rgba(204,0,0,0.8)] shadow-[0_0_15px_rgba(204,0,0,0.5)]"
                }`}
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  className="flex items-center gap-2 px-6 py-3 text-white hover:text-red-500 
              transition-colors font-semibold"
                >
                  Next <FiArrowRight className="w-5 h-5" />
                </button>
              )}
              {error && (
                <div className="mt-4 text-red-500 text-center">{error}</div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
