export default (docs, query) => {
  const queryWords = query.toLowerCase().match(/\w+/g) || [];

  const invertedIndex = {};
  const docWordCounts = {};
  const totalDocs = docs.length;

  docs.forEach((doc) => {
    const words = doc.text.toLowerCase().match(/\w+/g) || [];
    docWordCounts[doc.id] = words.length;

    const uniqueWords = {};
    words.forEach((word) => {
      if (invertedIndex[word]) {
        if (!invertedIndex[word].includes(doc.id)) {
          invertedIndex[word].push(doc.id);
        }
      } else {
        invertedIndex[word] = [doc.id];
      }
      uniqueWords[word] = (uniqueWords[word] || 0) + 1;
    });

    Object.keys(uniqueWords).forEach((word) => {
      const tf = uniqueWords[word] / words.length;
      const idf = Math.log(totalDocs / invertedIndex[word].length);
      const tfidf = tf * idf;
      doc.tfidf = doc.tfidf || {};
      doc.tfidf[word] = tfidf;
    });
  });

  const relevanceMap = {};
  queryWords.forEach((queryWord) => {
    if (invertedIndex[queryWord]) {
      invertedIndex[queryWord].forEach((docId) => {
        relevanceMap[docId] = (relevanceMap[docId] || 0) + docs.find((doc) => doc.id === docId).tfidf[queryWord];
      });
    }
  });

  const result = Object.keys(relevanceMap)
    .sort((docId1, docId2) => relevanceMap[docId2] - relevanceMap[docId1]);

  return result;
};
