import styles from "../wordle.module.css";

type OneWordProps = {
  guessedWord: string;
  wordLength: number;
  isFinal: boolean;
  wordToGuess: string;
};

export function OneWord({
  guessedWord,
  wordLength,
  isFinal,
  wordToGuess,
}: OneWordProps) {
  const tiles = [];
  for (let i = 0; i < wordLength; i++) {
    let backgroundColor = "transparent";
    if (isFinal) {
      if (guessedWord[i] === wordToGuess[i]) backgroundColor = "lime";
      else if (
        guessedWord[i] !== wordToGuess[i] &&
        wordToGuess.includes(guessedWord[i])
      ) {
        backgroundColor = "yellow";
      } else {
        backgroundColor = "grey";
      }
    }

    tiles.push(
      <div
        key={i}
        className={styles.Field}
        style={{
          backgroundColor: backgroundColor,
          transition: "background-color .6s ease-in-out ",
        }}
      >
        {guessedWord[i]}
      </div>
    );
  }

  return <div className={styles.Wordle}>{tiles}</div>;
}
