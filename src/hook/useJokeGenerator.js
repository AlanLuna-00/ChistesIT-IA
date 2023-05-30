"use client";
import { useState } from "react";

function useJokeGenerator({ setCopied }) {
  const [prompt, setPrompt] = useState("");
  const [joke, setJoke] = useState("");
  const [loading, setLoading] = useState(false);
  const [aux, setAux] = useState("");

  const generateJoke = async (prompt) => {
    setCopied(false);
    setLoading(true);
    setPrompt("");
    setAux(prompt);
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
    setAux("");
    setJoke("");
  };

  return {
    prompt,
    setPrompt,
    joke,
    loading,
    handleSubmit,
    handlePromptChange,
    aux,
  };
}

export default useJokeGenerator;
