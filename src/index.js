export default (docs, query) => {
  const result = docs
    .filter(doc => {
        const words = doc.text.match(/\w+/g);
        return words && words.includes(query);
    })
    .map((doc) => doc.id);
  return result;
};
