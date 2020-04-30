const { date } = require('../../lib/utils')
const db = require('../../config/db')

module.exports = {
  all(callback) {
    db.query(`SELECT * 
    FROM teachers
    ORDER BY name ASC`, (err, results) => {
      if(err) throw `Database Error! ${err}`

      callback(results.rows)
    })
  },
  create(data, callback) {

    const query = `
      INSERT INTO teachers (
        avatar_url,
        name,
        birth,
        schooling,
        type_class,
        services,
        created_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING id
    `

    const values = [
      data.avatar_url,
      data.name,
      date(data.birth).iso,
      data.schooling,
      data.type_class,
      data.services,
      date(Date.now()).iso
    ]

    db.query(query, values, (err, results) => {
      if(err) throw `Database Error! ${err}`
      
      callback(results.rows[0])
    })


  },
  find(id, callback) {
    db.query(`
    SELECT * 
    FROM teachers 
    WHERE id = $1`, [id], (err, results) => {
      if(err) throw `Database Error! ${err}`
      callback(results.rows[0])
    })
  },
  update(data, callback) {
    const query = `
    UPDATE teachers SET 
      avatar_url=($1),
      name=($2),
      birth=($3),
      schooling=($4),
      type_class=($5),
      services=($6)
    WHERE id = $7
    `

    const values = [
      data.avatar_url,
      data.name,
      date(data.birth).iso,
      data.schooling,
      data.type_class,
      data.services,
      data.id
    ]

    db.query(query, values, (err, results) => {
      if(err) throw `Database Error! ${err}`

      callback()
    })
  },
  delete(id, callback) {
    db.query(`
      DELETE FROM teachers
      WHERE id = $1`, [id], (err) => {
        if(err) throw `Database Error! ${err}`
        
        return callback()
    })
  }
}