const { age, date, graduation } = require("../../lib/utils");
const Intl = require("intl");


module.exports = {
  home(req, res) {
    return res.redirect('/teachers');
  },
  index(req, res) {
    return res.render('teachers/index');
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

    return;
  },
  show(req, res) { 
    return
  },
  edit(req, res) { 
    return
  },
  put(req, res) { 

    const keys = Object.keys(req.body);

    for (key of keys) {
      if (req.body[key] == "") {
        return res.send("Por favor preencha todos os campos!");
      }
    }

    return
  },
  delete(req, res) {
    return
   },
}
