if (process.env.NODE_ENV !== 'test') {
  console.log('Hello, world!');
}

const addOne = (num: number): number => {
  return num + 1;
};
export default addOne;
