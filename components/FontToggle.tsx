"use client";
import { useState, useEffect } from "react";

export default function FontToggle() {
  const [isDyslexic, setIsDyslexic] = useState(false);

  const toggleFont = () => {
    setIsDyslexic((prev) => {
      const newValue = !prev;
      localStorage.setItem("isDyslexic", JSON.stringify(newValue));
      return newValue;
    });
  };

  useEffect(() => {
    // apply saved preference if in local storage
    const savedPreference = JSON.parse(
      localStorage.getItem("isDyslexic") || "false"
    );
    if (savedPreference) {
      setIsDyslexic(true);
    }
  }, []);

  useEffect(() => {
    // update body class when isDyslexic state changes
    if (isDyslexic) {
      document.body.classList.add("font-dyslexic");
      document.body.classList.remove("font-default");
    } else {
      document.body.classList.add("font-default");
      document.body.classList.remove("font-dyslexic");
    }
  }, [isDyslexic]);

  return (
    <button
      onClick={toggleFont}
      className="px-2 hover:scale-110 hover:text-primary transition-all duration-300"
    >
      {isDyslexic ? "Default Font" : "Dyslexic Font"}
    </button>
  );
}
