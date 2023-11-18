export default (docs, query) => {
  const queryWords = query.toLowerCase().match(/\w+/g) || [];
  
  const invertedIndex = {};
  docs.forEach(doc => {
    const words = doc.text.toLowerCase().match(/\w+/g) || [];
    words.forEach(word => {
      if (invertedIndex[word]) {
        invertedIndex[word].push(doc.id);
      } else {
        invertedIndex[word] = [doc.id];
      }
    });
  });

  const relevantDocs = queryWords.reduce((result, word) => {
    if (invertedIndex[word]) {
      result.push(...invertedIndex[word]);
    }
    return result;
  }, []);

  const relevanceMap = relevantDocs.reduce((map, docId) => {
    map[docId] = (map[docId] || 0) + 1;
    return map;
  }, {});

  const result = Object.keys(relevanceMap)
    .filter(docId => relevanceMap[docId] > 0)
    .sort((docId1, docId2) => relevanceMap[docId2] - relevanceMap[docId1]);

  return result;
};