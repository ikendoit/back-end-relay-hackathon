const getMonthYear = async (req, res, client) => {

  const {month, year} = req.query
  console.log(month, year, 'date')
  //const result = await client.query(
  //  ``
  //)
  res.send('hello: ', year, month)
  //res.json(result.rows)
}

module.exports = {
  getMonthYear
}
