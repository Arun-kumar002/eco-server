const paginater = (pageSize, page, data) => {
  let payload = [];
  let limiter = 0;
  for (let x in data[0]) {
    if (x > pageSize*page && limiter < 10) {
      payload.push(data[0][x]);
      limiter = limiter + 1;
    }
  }
  return payload;
};
//TODO another way
// let startIndex = req.query.pageNumber * req.query.limit;
// const endIndex = (req.query.pageNumber + 1) * req.query.limit;

module.exports = { paginater };
