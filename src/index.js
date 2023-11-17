export default (docs, query) => {
  const result = docs
    .filter(doc => {
        const words = doc.text.toLowerCase().match(/\w+/g);
        return words.includes(query.toLowerCase());
    })
    .sort((doc1, doc2) => {
        const count1 = (doc1.text.match(new RegExp(query, "ig")) || []).length;
        const count2 = (doc2.text.match(new RegExp(query, "ig")) || []).length; 
        return count2 - count1;
      })
    .map((doc) => doc.id);
  return result;
};
