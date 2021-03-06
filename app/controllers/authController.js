const { User } = require('../models');
const bcrypt = require('bcryptjs');

module.exports = {
  signin(req, res) {
    res.render('auth/signin');
  },
  signup(req, res) {
    res.render('auth/signup');
  },
  async register(req, res) {
    try {
      const { email } = req.body;
      if (await User.findOne({ where: { email } })) {
        req.flash('error', 'E-mail já cadastrado');
        return res.redirect('back');
      }
      const password = await bcrypt.hash(req.body.password, 5);
      await User.create({ ...req.body, password });
      req.flash('sucess', 'Usuário cadastrado com sucesso');

      return res.redirect('/');
    } catch (err) {
      return err;
    }
  },

  async authenticate(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });

      if (!user) {
        req.flash('error', 'O usuário não existe');
        return res.redirect('back');
      }
      if (!await bcrypt.compare(password, user.password)) {
        req.flash('error', 'Senha incorreta');
        return res.redirect('back');
      }
      req.session.user = user;
      return req.session.save(() => {
        res.redirect('app/dashboard');
      });
    } catch (err) {
      return err;
    }
  },
  signout(req, res) {
    return req.session.destroy(() => {
      res.redirect('/');
    });
  },
};
