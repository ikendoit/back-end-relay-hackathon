// should make these parameterized for safety, if this goes on
// hash password too, that too.
const user_create = async (req, res, client) => {
  res.send('hello world')
}

const get_users = async (req, res, client) => {
  try {
    const result = await client.query('SELECT id, last_name, first_name, address, phone, email from users')
    res.json(result)
  } catch(err) {
    console.log(err)
  }
}

const user_signin = async (req, res, client) => {
  try {
    const {password, first_name} = req.body
    const result = await client.query(
      `SELECT id, last_name, first_name, address, phone, email FROM users WHERE password='${password}' AND first_name='${first_name}'` 
    )
    if (result.rows.length === 0 ) res.sendStatus(404)
    else {
      const user_id = result.rows[0].id
      const countScheds = await client.query(`select count(*) from meetings where user_id='${user_id}';`)
      res.send({...result.rows[0], countScheds: countScheds.rows[0].count})
    }
  } catch(err){
    console.log(err)
  }
}

const user_signup = async (req, res, client) => {
  try {
    const {password, first_name, last_name, address, phone, email} = req.body
    const result = await client.query(
      `INSERT INTO users(last_name, first_name, address,phone, email, password) VALUES('${last_name}','${first_name}', '${address}', '${phone}', '${phone}', '${password}') RETURNING id;`
    )
    if (result.rows.length === 0 ) res.sendStatus(404)
    else res.send(result.rows[0].id)
  } catch(err){
    console.log(err)
  }
}

const schedulability = async (req, res, client) => {
  try {
    const {user_id} = req.params
    const result = await client.query(
      `SELECT * from meetings where user_id='${user_id}' AND allow=true`
    )
    res.send(result.rows)
  } catch(err) {
    console.log(err)
  }
}

module.exports = {
  user_signin,
  user_signup,
  get_users,
  schedulability,
}
