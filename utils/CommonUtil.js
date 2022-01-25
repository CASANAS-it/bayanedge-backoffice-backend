

function getPagination(page, size) {
  const limit = size ? +size : 3;
  const offset = page ? page * limit : 0;

  return { limit, offset };
}

function getPagingData(data, page, limit) {
  const { total: totalItems, docs: rows } = data;
  const currentPage = page ? + page : 0;
  const totalPages = Math.ceil(totalItems / limit);

  return { totalItems, rows, totalPages, currentPage };
}

function padZeroes(num, size = 6) {
  num = num.toString();
  while (num.length < size) num = "0" + num;
  return num;
}



export {
  getPagination,
  getPagingData,
  padZeroes
}
