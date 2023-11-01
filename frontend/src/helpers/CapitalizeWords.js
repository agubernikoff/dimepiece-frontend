export function capitalizeWords(inputString) {
  // Split the input string into an array of words
  const words = inputString.split(" ");

  // Map over the words array and capitalize the first letter of each word
  const capitalizedWords = words.map((word) => {
    if (word.length === 0) {
      return ""; // Handle empty words gracefully
    }
    const firstLetter = word[0].toUpperCase();
    const restOfWord = word.slice(1).toLowerCase();
    return firstLetter + restOfWord;
  });

  // Join the capitalized words back into a single string
  const resultString = capitalizedWords.join(" ");

  return resultString;
}
