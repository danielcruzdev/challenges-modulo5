const { age, date, fixSchool } = require("../../lib/utils");
const Students = require("../models/Students")
const Intl = require("intl");


module.exports = {
  index(req, res) {

    let { filter, page, limit } = req.query

    page = page || 1
    limit = limit || 2
    let offset = limit * (page - 1)

    const params = {
      filter,
      page,
      limit,
      offset,
      callback(students){
        const pagination = {
          total: Math.ceil(students[0].total / limit),
          page
        }
        return res.render('students/index' , { students, pagination, filter });
        
      }   
    } 
    
    Students.paginate(params)
    
  },
  create(req, res) {

    Students.teachersSelectOptions((options) => {
      return res.render('students/create', { teacherOptions: options });
    })
  },
  post(req, res) {
    const keys = Object.keys(req.body);

    for (key of keys) {
      if (req.body[key] == "") {
        return res.send("Por favor preencha todos os campos!");
      }
    }

    Students.create(req.body, (student) => {
      return res.redirect(`/students/${student.id}`)
    })
    

  },
  show(req, res) { 

    Students.find(req.params.id, (student) => {
      if(!student) return res.send("Student Not Found!")

      student.age = age(student.birth)
      student.year = fixSchool(student.year)
      student.created_at = date(student.created_at).format

      return res.render("students/show", { student })
    })

  },
  edit(req, res) {  
    
    Students.find(req.params.id, (student) => {
      if(!student) return res.send("Student Not Found!")

      student.birth = date(student.birth).iso

      Students.teachersSelectOptions((options) => {
        return res.render('students/edit', { student, teacherOptions: options });
      })
    })
  },
  put(req, res) { 

    const keys = Object.keys(req.body);

    for (key of keys) {
      if (req.body[key] == "") {
        return res.send("Por favor preencha todos os campos!");
      }
    }

    Students.update(req.body, () => {
      return res.redirect(`/students/${req.body.id}`)
    })
  },
  delete(req, res) {
    Students.delete(req.body.id, () => {
      return res.redirect(`/students`)
    })
   }
}