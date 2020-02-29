import { getPreviousNextNode } from '../../src/utils/helpers';

const Articles = [
  {
    node: 'article0',
  },
  {
    node: 'article1',
  },
  {
    node: 'article2',
  },
  {
    node: 'article3',
  },
  {
    node: 'article4',
  },
];

test('articles is empty', () => {
  const result1 = getPreviousNextNode([], 1);
  const result2 = getPreviousNextNode([], -1);
  const expected = { previous: undefined, next: undefined };
  expect(result1).toEqual(expected);
  expect(result2).toEqual(expected);
});

test('fromInd is -1', () => {
  const result = getPreviousNextNode(Articles, -1);
  const expected = { previous: undefined, next: undefined };
  expect(result).toEqual(expected);
});

test('fromInd is 0', () => {
  const result = getPreviousNextNode(Articles, 0);
  const expected = { previous: null, next: 'article1' };
  expect(result).toEqual(expected);
});

test('fromInd is the lastone', () => {
  const result = getPreviousNextNode(Articles, 4);
  const expected = { previous: 'article3', next: null };
  expect(result).toEqual(expected);
});

test('fromInd is the lastone', () => {
  const result = getPreviousNextNode(Articles, 2);
  const expected = { previous: 'article1', next: 'article3' };
  expect(result).toEqual(expected);
});
