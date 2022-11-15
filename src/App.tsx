import { useEffect, useState } from "react";
import words from "./assets/wordList.json";
import styles from "./wordle.module.css";
import { OneWord } from "./Components/OneWord";

const WORD_LENGTH = 5;

function App() {
  const [wordToGuess, setWordToGuess] = useState("");
  const [currentGuess, setCurrentGuess] = useState<string>("");
  const [guessedWords, setGuessedWords] = useState<string[]>(
    Array(6).fill(null)
  );
  const [gameOver, setGameOver] = useState(false);
  const [isWinner, setIsWinner] = useState(false);

  const restartGame = () => {
    window.location.reload();
  };

  useEffect(() => {
    if (
      currentGuess !== wordToGuess &&
      guessedWords.every((word) => word !== null)
    ) {
      setGameOver(true);
    }
  }, [guessedWords]);

  useEffect(() => {
    const filteredWords = words.filter((word) => word.split("").length === 5);
    const word = filteredWords.at(
      Math.floor(Math.random() * filteredWords.length)
    );
    setWordToGuess(word!);
  }, []);

  useEffect(() => {
    console.log(wordToGuess);
    function handleKeyPress(e: KeyboardEvent) {
      if (gameOver) return;

      if (new RegExp("^[a-zA-Z]$").test(e.key) && currentGuess.length < 5) {
        setCurrentGuess((previous) => previous + e.key);
      } else if (e.key === "Enter") {
        if (currentGuess.length !== 5) return;

        const isCorrect = wordToGuess === currentGuess;
        if (isCorrect) {
          setGameOver(true);
          setIsWinner(true);
        }
        const newGuesses = [...guessedWords];
        newGuesses[guessedWords.findIndex((guess) => guess == null)] =
          currentGuess;
        setGuessedWords(newGuesses);
        setCurrentGuess("");
      } else if (e.key === "Backspace") {
        setCurrentGuess((previous) => previous.slice(0, -1));
      }
    }

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [currentGuess]);

  return (
    <div className={styles.App}>
      <div className={styles.Header}>Toomdas Wordle Clone!</div>
      <div className={styles.WordGrid}>
        {guessedWords.map((guess, i) => {
          const isCurrentGuess =
            i === guessedWords.findIndex((guess) => guess == null);
          return (
            <OneWord
              guessedWord={isCurrentGuess ? currentGuess : guess ?? ""}
              wordLength={WORD_LENGTH}
              isFinal={!isCurrentGuess && guess != null}
              wordToGuess={wordToGuess ?? ""}
            ></OneWord>
          );
        })}
      </div>
      {gameOver ? (
        <div className={styles.GameOver}>
          <span
            style={{
              display: "flex",
              gap: "50px",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {isWinner ? "Congratulations" : "You've lost :/ "} The word was:
            <p style={{ color: "green" }}>{wordToGuess}</p>
          </span>

          <button className={styles.btnRestart} onClick={restartGame}>
            RESTART
          </button>
        </div>
      ) : null}

      <div className="keyboard" style={{ color: "white" }}></div>
    </div>
  );
}

export default App;
