const feed_back = async (req, res, client) => {
  try {
    const {user, feedBack} = req.body
    const user_id = user.id
    console.log(user, feedBack)
    const { type, content, schedule_date } = feedBack
    console.log(type, content, schedule_date)
    const myQuery = schedule_date ? 
      `INSERT INTO feedbacks(schedule_date, user_id, type) VALUES ('${schedule_date}','${user_id}', '${type}')`:
      `INSERT INTO feedbacks(content, user_id, type) VALUES ('${content}','${user_id}', '${type}')`
    const result = await client.query(myQuery)
    res.sendStatus(201)
  } catch(err) {
    console.log(err)
  }
}

const get_feed_backs = async (req, res, client) => {
   try {
    const result = await client.query(
      `select f.content, f.schedule_date, f.type, f.date_created, u.first_name, u.id from feedbacks f, users u where f.user_id = u.id`
    )
    console.log(result.rows)
    res.send(result.rows)
  } catch(err) {
    console.log(err)
  } 
}

module.exports = {
  feed_back,
  get_feed_backs,
}
