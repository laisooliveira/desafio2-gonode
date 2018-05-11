const { Section, Project } = require('../models');

module.exports = {
  async store(req, res) {
    try {
      await Section.create({ ...req.body, ProjectId: req.params.projectId });
      return res.redirect('back');
    } catch (err) {
      return res.send(err);
    }
  },

  async update(req, res) {
    try {
      const section = await Section.findById(req.params.sectionId);
      await section.update(req.body);
      req.flash('success', 'Seção atualizada com sucesso');
      return res.redirect(`/app/projects/${req.params.projectId}/sections/${section.id}`);
    } catch (err) {
      return res.send(err);
    }
  },
  async show(req, res) {
    try {
      const section = await Section.findById(req.params.sectionId);
      const sections = await Section.findAll({ where: { ProjectId: req.params.projectId } });
      const project = await Project.findById(req.params.projectId);
      return res.render('section', {
        section, project, sections, user: req.session.user.name,
      });
    } catch (err) {
      return res.send(err);
    }
  },
  async destroy(req, res) {
    try {
      await Section.destroy({ where: { id: req.params.sectionId } });
      req.flash('success', 'Seção deletada com sucesso');
      return res.redirect(`/app/projects/${req.params.projectId}`);
    } catch (err) {
      return res.send(err);
    }
  },
};
