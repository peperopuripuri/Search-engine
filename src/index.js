export default (docs, query) => {
  const result = docs
    .filter((doc) => doc
      .text
      .split(' ')
      .filter((word) => word === query)
      .length > 0)
    .map((doc) => doc.id);
  return result;
};
