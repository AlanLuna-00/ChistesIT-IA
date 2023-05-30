"use client";
import { useState } from "react";

function useJokeGenerator({ setCopied }) {
  const [prompt, setPrompt] = useState("");
  const [joke, setJoke] = useState("");
  const [loading, setLoading] = useState(false);

  const generateJoke = async (prompt) => {
    setCopied(false);
    setLoading(true);
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });
      const data = await response.json();
      setJoke(data);
    } catch (error) {
      alert(error.message);
      return;
    }

    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    generateJoke(prompt);
  };

  const handlePromptChange = (e) => {
    setPrompt(e.target.value);
    setJoke("");
  };

  return {
    prompt,
    setPrompt,
    joke,
    loading,
    handleSubmit,
    handlePromptChange,
  };
}

export default useJokeGenerator;
