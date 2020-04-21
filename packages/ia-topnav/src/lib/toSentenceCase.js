const toSentenceCase = (phrase) => {
  const words = phrase.split(' ');
  const lastWord = words.pop();
  const capitalizedWord = `${lastWord.substr(0, 1).toUpperCase()}${lastWord.substr(1)}`;
  return words.length ? toSentenceCase(`${words.join(' ')}${capitalizedWord}`) : capitalizedWord;
};

export default toSentenceCase;
