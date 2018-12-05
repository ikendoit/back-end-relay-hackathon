const schedule = async (req, res, client) => {
  try {
    const {schedule, user} = req.body
    const {date, note, question_id} = schedule
    const result = await client.query(
      `INSERT INTO meetings(date, note, user_id, question_id, allow) values \
        ('${date}','${note}','${user.id}','${question_id}')`
    )
    res.sendStatus(201)
  } catch(err) {
    console.log(err)
  }
}

const update_schedules = async (req, res, client) => {
  try {
    const {schedule_id} = req.params
    const {note, date} = req.body 
    if (!date) {
      res.sendStatus(400)
      return
    }
    const result = await client.query(
      `UPDATE meetings set note='${note}', date='${date}' WHERE id='${schedule_id}' ;`
    )
    // now, the user has set a date of meeting, we notify the participating mediator
    res.send(result.rows)
  } catch(err) {
    console.log(err)
  }
}

const get_schedules = async (req, res, client) => {
  try {
    const {user_id} = req.params
    const result = await client.query(
      `SELECT m.date, m.id, m.note, m.allow, q.complete_date FROM meetings m, questions q WHERE m.user_id='${user_id}' AND m.question_id=q.id`
    )
    res.send(result.rows)
  } catch(err) {
    console.log(err)
  }
}

module.exports = {
  schedule, 
  get_schedules,
  update_schedules,
}
