const { age, date, graduation } = require("../../lib/utils");
const Teachers = require('../models/Teacher')
const Intl = require("intl");


module.exports = {
  index(req, res) {
    const { filter } = req.query

    if(filter) {
      Teachers.findBy(filter, (teachers) => {
        return res.render('teachers/index' , { teachers, filter });
      })
    }
    else {
      Teachers.all((teachers) => {
        return res.render('teachers/index' , { teachers });
      })
    }
  },
  create(req, res) {
    return res.render('teachers/create');
  },
  post(req, res) {
    const keys = Object.keys(req.body);

    for (key of keys) {
      if (req.body[key] == "") {
        return res.send("Por favor preencha todos os campos!");
      }
    }

    Teachers.create(req.body, (teacher) => {
      return res.redirect(`/teachers/${teacher.id}`)
    })
    

  },
  show(req, res) { 

    Teachers.find(req.params.id, (teacher) => {
      if(!teacher) return res.send("Teacher Not Found!")

      teacher.age = age(teacher.birth)
      teacher.services = teacher.services.split(",")
      teacher.schooling = graduation(teacher.schooling)
      teacher.created_at = date(teacher.created_at).format

      return res.render("teachers/show", { teacher })
    })

  },
  edit(req, res) {  
    
    Teachers.find(req.params.id, (teacher) => {
      if(!teacher) return res.send("Teacher Not Found!")

      teacher.birth = date(teacher.birth).iso

      return res.render("teachers/edit", { teacher })
    })
  },
  put(req, res) { 

    const keys = Object.keys(req.body);

    for (key of keys) {
      if (req.body[key] == "") {
        return res.send("Por favor preencha todos os campos!");
      }
    }

    Teachers.update(req.body, () => {
      return res.redirect(`/teachers/${req.body.id}`)
    })
  },
  delete(req, res) {
    Teachers.delete(req.body.id, () => {
      return res.redirect(`/teachers`)
    })
   },
  home(req, res) {
    return res.redirect('/teachers');
  }
}