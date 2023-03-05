/**
 * Word length of answer
 */
type AnswerLength = number;

/**
 * Maximum guesses for an answer
 */
type TotalGuesses = number;

/**
 * Maps arbitrary answer lengths to maximum guesses
 * @example
 * {
 *   5: 6,  // 5 letter answer => 6 guesses
 *   6: 5,  // 6 letter answer => 5 guesses
 *   7: 4   // 7 letter answer => 4 guesses
 * }
 */
interface AnswerGuesses {
  [key: AnswerLength]: TotalGuesses;
}

/**
 * Maps answer lengths to maximum guesses, according to game difficulty
 * @example
 * {
 *   "short": {
 *     5: 6,  // 5 letter answer => 6 guesses on short difficulty
 *   },
 *   "medium": {
 *     5: 5,  // 5 letter answer => 5 guesses on medium difficulty
 *   },
 * }
 */
interface GameConfig {
  short: AnswerGuesses;
  medium: AnswerGuesses;
  long: AnswerGuesses;
}

/**
 * Game configuration as of 2023-02-26
 */
export const gameConfig: GameConfig = {
  short: {
    5: 6,
    6: 5,
    7: 4,
  },
  medium: {
    4: 6,
    5: 6,
    6: 5,
    7: 5,
    8: 4,
  },
  long: {
    3: 6,
    4: 6,
    5: 5,
    6: 5,
    7: 4,
    8: 4,
    9: 3,
  },
};
