// remove item from DOM
export default (item) => {
  document.querySelector(`.card-body .card-row:nth-child(${item.index})`).remove();
  item.delete();
};
