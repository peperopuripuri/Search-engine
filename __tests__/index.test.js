import search from '../src/index.js';

const createDocs = () => {
  const doc1 = { id: 'doc1', text: "I can't shoot straight unless I've had a pint!" };
  const doc2 = { id: 'doc2', text: "Don't shoot shoot shoot that thing at me." };
  const doc3 = { id: 'doc3', text: "I'm your shooter." };
  const docs = [doc1, doc2, doc3];

  return docs;
};

test('steps 1, 2, 3, 4', () => {
  const docs = createDocs();
  expect(search(docs, 'shoot')).toEqual(['doc2', 'doc1']);
  expect(search(docs, 'shoot at me')).toEqual(['doc2', 'doc1']);
  expect(search([], 'shoot')).toEqual([]);
});
