export default (docs, query) => {
  const queryWords = query.toLowerCase().match(/\w+/g) || [];
  
  const result = docs
    .map(doc => {
      const words = doc.text.toLowerCase().match(/\w+/g) || [];
      const relevance = words.filter(word => queryWords.includes(word)).length;
      return { id: doc.id, relevance };
    })
    .filter(doc => doc.relevance > 0)
    .sort((doc1, doc2) => doc2.relevance - doc1.relevance)
    .map(doc => doc.id);

  return result;
};  