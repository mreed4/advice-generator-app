import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [adviceSlip, setAdviceSlip] = useState({});

  async function getAdvice() {
    const response = await fetch("https://api.adviceslip.com/advice");
    const data = await response.json();

    console.log(data.slip);

    setAdviceSlip(data.slip);
  }

  useEffect(() => {
    getAdvice();
  }, []);

  useEffect(() => {
    const handleSpacebar = (event) => {
      if (event.code === "Space") {
        getAdvice();
      }
    };

    window.addEventListener("keydown", handleSpacebar);

    return () => {
      window.removeEventListener("keydown", handleSpacebar);
    };
  }, []);

  return (
    <>
      <h1>Advice # {adviceSlip.id}</h1>
      <p className="advice">&#x201C;{adviceSlip.advice}&#x201D;</p>
      <img src="/img/pattern-divider-desktop.svg" alt="divider " className="desktop divider" />
      <img src="/img/pattern-divider-mobile.svg" alt="divider" className="mobile divider" />
      <button className="button" onClick={getAdvice}>
        <img src="/img/icon-dice.svg" alt="icon  " />
      </button>
      <p className="key desktop">
        Press <span>Space</span> to get advice
      </p>
    </>
  );
}

export default App;
