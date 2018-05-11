const { Project } = require('../models');

module.exports = {
  async index(req, res) {
    try {
      const projects = await Project.findAll({
        where: {
          UserId: req.session.user.id,
        },
      });
      return res.render('dashboard', { projects, user: req.session.user.name });
    } catch (err) {
      return res.send(err);
    }
  },
};
