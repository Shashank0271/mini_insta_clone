export const formatPostsGridData = (
  dataP: Array<any>,
  numCols: number,
): Array<any> => {
  const data = [...dataP];
  const lastRowItems = data.length % numCols;
  if (lastRowItems === 0) {
    return data;
  }
  const blanks = numCols - lastRowItems;
  for (let i = 0; i < blanks; i++) {
    data.push({id: `blank-${i}`});
  }
  return data;
};
