const { Project, Section } = require('../models');

module.exports = {
  async store(req, res) {
    try {
      const project = await Project.create({ ...req.body, UserId: req.session.user.id });
      req.flash('success', 'Projeto criado com sucesso');
      return res.redirect(`/app/projects/${project.id}`);
    } catch (err) {
      return res.send(err);
    }
  },
  async show(req, res) {
    try {
      const project = await Project.findById(req.params.id);
      const sections = await Section.findAll({
        where: {
          ProjectId: project.id,
        },
      });
      return res.render('project', { project, sections, user: req.session.user.name });
    } catch (err) {
      return res.send(err);
    }
  },
  async destroy(req, res) {
    try {
      await Project.destroy({ where: { id: req.params.id } });
      req.flash('success', 'Projeto deletado com sucesso');
      return res.redirect('/app/dashboard');
    } catch (err) {
      return res.send(err);
    }
  },
};
