"use client";
import useJokeGenerator from "@/hook/useJokeGenerator";
import { useEffect, useState } from "react";
import SocialIcon from "./components/SocialIcon";

function HomePage() {
  const [copied, setCopied] = useState(false);

  const {
    prompt,
    setPrompt,
    joke,
    loading,
    handleSubmit,
    handlePromptChange,
    aux,
  } = useJokeGenerator({ setCopied });

  const handleCopy = () => {
    navigator.clipboard.writeText(joke);
    setCopied(true);
  };

  const [error, setError] = useState("");

  useEffect(() => {
    const handleErrorInput = () => {
      let error = "";
      if (prompt.length > 20) {
        error = "El texto no puede ser mayor a 20 caracteres";
      } else if (prompt.length < 3) {
        error = "El texto no puede ser menor a 3 caracteres";
      }
      return error;
    };
    setError(handleErrorInput());
  }, [prompt]);

  return (
    <div className="bg-gray-900 h-screen flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-10 rounded-md form relative"
      >
        <h1 className="text-3xl text-white mb-8 text-center">
          <span className="font-bold">Chistes IT 🤣</span>
          <p className="text-xs text-gray-500 mt-2 mb-2">
            Problablemente no lo entiendas 😆
          </p>
        </h1>
        <input
          type="text"
          name="name"
          placeholder="Lo que escribas sera un chiste de 👨🏽‍💻"
          onChange={handlePromptChange}
          className="p-3 rounded-md block bg-gray-700 text-white w-full mb-2"
          value={prompt}
          autoFocus
          autoComplete="off"
        />
        {error && (
          <p className="text-red-500 text-xs italic mt-2 mb-2">{error}</p>
        )}
        <button
          type="submit"
          className="bg-green-500 p-3 rounded-md block w-full text-white disabled:opacity-50"
          disabled={!prompt || loading || error}
        >
          {loading ? "Pensando..." : "Generar"}
        </button>
        {aux && (
          <p className="text-xs text-gray-500 mt-2 mb-2">
            Tema del chiste: {aux}
          </p>
        )}
        {joke && (
          <p className="text-2xl font-bold text-white mt-8 text-center">
            {joke}
          </p>
        )}
        <button
          onClick={handleCopy}
          className={`border border-blue-500 text-blue-500 font-bold py-2 px-4 rounded mt-5 ${
            copied ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={copied || !joke}
        >
          {copied ? "Copiado!" : "Copiar!"}
        </button>
        <span className="absolute top-0 right-0 p-2 text-gray-600 text-xs">
          by Alan Luna 🚀
        </span>
        <span className="absolute bottom-0 left-0 p-2 text-gray-600 text-xs">
          <a href="https://platform.openai.com/overview" target="_blank">
            Powered by OpenAI
          </a>
        </span>
        <SocialIcon />
      </form>
    </div>
  );
}

export default HomePage;
