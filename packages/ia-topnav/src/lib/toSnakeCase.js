const toSnakeCase = (phrase) => {
  const words = phrase.split(' ');
  const lastWord = words.pop();
  const capitalizedWord = `${lastWord.substr(0, 1).toUpperCase()}${lastWord.substr(1)}`;
  return words.length ? toSnakeCase(`${words.join(' ')}${capitalizedWord}`) : capitalizedWord;
};

export default toSnakeCase;
