const centToDollar = (cents) => {
  let i = parseInt(cents);
  return i / 100 + '.' + String(i % 100).padEnd(2, 0);
};

let utiMixin = {
  method: {
    centToDollar,
  },
};

export default utiMixin;
