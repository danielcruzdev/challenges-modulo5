const { date } = require('../../lib/utils')
const db = require('../../config/db')

module.exports = {
  all(callback) {
    db.query(`SELECT * 
    FROM students
    ORDER BY name ASC`, (err, results) => {
      if(err) throw `Database Error! ${err}`

      callback(results.rows)
    })
  },
  create(data, callback) {

    const query = `
      INSERT INTO students (
        avatar_url,
        name,
        birth,
        email,
        time,
        year,
        teacher_id
      ) VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING id
    `

    const values = [
      data.avatar_url,
      data.name,
      date(data.birth).iso,
      data.email,
      data.time,
      data.year,
      data.teacher
    ]

    db.query(query, values, (err, results) => {
      if(err) throw `Database Error! ${err}`
      
      callback(results.rows[0])
    })


  },
  find(id, callback) {
    db.query(`
    SELECT students.*, teachers.name as teacher_name
    FROM students 
    LEFT JOIN teachers ON (students.teacher_id = teachers.id)
    WHERE students.id = $1`, [id], (err, results) => {
      if(err) throw `Database Error! ${err}`
      callback(results.rows[0])
    })
  },
  update(data, callback) {
    const query = `
    UPDATE students SET 
      avatar_url=($1),
      name=($2),
      birth=($3),
      email=($4),
      time=($5),
      year=($6),
      teacher_id=($7)
    WHERE id = $8
    `

    const values = [
      data.avatar_url,
      data.name,
      date(data.birth).iso,
      data.email,
      data.time,
      data.year,
      data.teacher,
      data.id
    ]

    db.query(query, values, (err, results) => {
      if(err) throw `Database Error! ${err}`

      callback()
    })
  },
  delete(id, callback) {
    db.query(`
      DELETE FROM students
      WHERE id = $1`, [id], (err) => {
        if(err) throw `Database Error! ${err}`
        
        return callback()
    })
  },
  teachersSelectOptions(callback) {
    db.query(`SELECT name, id FROM teachers`, (err, results) => {
      if (err) throw `Database Error!`

      callback(results.rows)
    })
  },
  paginate(params) {
    const { filter, limit, offset, callback } = params

    let query = '',
      filterQuery = '',
      totalQuery = `(
        SELECT count(*) FROM students
      ) AS total`
    
    if(filter){

      filterQuery = `
      WHERE students.name ILIKE '%${filter}%'
      OR students.email ILIKE '%${filter}%'     
      `

      totalQuery = `(
        SELECT count(*) FROM students
        ${filterQuery}
        ) AS total`
    }

    query = `
    SELECT students.*, ${totalQuery}
    FROM students
    ${filterQuery}
    LIMIT $1 OFFSET $2
    `

    db.query(query, [limit, offset], (err, results) => {
      if(err) throw `Database Error! ${err}` 

      callback(results.rows)
    })
  }
}