const get_list_questions = async (req, res, client) => {
  const result = await client.query(
    `SELECT q.id, q.complete_date, u.first_name, u.last_name, m.allow from questions q, users u, meetings m where q.user_id = u.id AND m.question_id = q.id AND m.user_id = u.id`
  )
  res.json(result.rows)
}

const get_question = async (req, res, client) => {
  const {question_id} = req.params
  const result = await client.query(`SELECT * FROM questions where id='${question_id}'`);
  res.send(result.rows[0])
}

const questions = async (req, res, client) => {
  try {
    const {questions,user} = req.body
    const user_id = user.id
    const result = await client.query(
      `INSERT INTO questions(content, user_id) VALUES('${questions}', '${user_id}') RETURNING id;`
    )
    if (result.rows[0].id) {
      const question_id = result.rows[0].id
      await client.query(
        `INSERT INTO meetings(user_id, question_id) VALUES('${user_id}', '${question_id}') RETURNING id;`
      )
    }
    // now, send email notification to the mediator to read through and check.
    // mediator will go to "check all questionaire" page and evaluate
    res.sendStatus(201)
  } catch(err) {
    console.log(err)
  }
}

const set_allow_case = async ( req, res, client) => {
  try {
    const {question_id, allow} = req.body
    const result = await client.query(`UPDATE meetings set allow='${allow}' where question_id='${question_id}'`)
    // if allow = true, now we shall email to the user having the questionaire.
    // the user will go to "check my questionaire" page and set date of meeting
    res.sendStatus(201)
  } catch(err) {
    console.log(err)
  }
}

module.exports = {
  get_list_questions,
  get_question,
  questions,
  set_allow_case,
}
