const express = require('express');
const authMiddleware = require('./middlewares/auth');
const authController = require('./controllers/authController');
const dashboardController = require('./controllers/dashboardController');
const projectController = require('./controllers/projectController');
const sectionController = require('./controllers/sectionController');

const routes = express.Router();
routes.use((req, res, next) => {
  res.locals.flashSuccess = req.flash('success');
  res.locals.flashError = req.flash('error');
  next();
});

routes.get('/', authController.signin);
routes.get('/signin', authController.signin);
routes.get('/signup', authController.signup);
routes.get('/signout', authController.signout);
routes.post('/register', authController.register);
routes.post('/authenticate', authController.authenticate);

routes.use('/app', authMiddleware);
routes.get('/app/dashboard', dashboardController.index);

routes.post('/app/projects/create', projectController.store);
routes.get('/app/projects/:id', projectController.show);
routes.delete('/app/projects/:id', projectController.destroy);

routes.post('/app/projects/:projectId/sections/create', sectionController.store);
routes.get('/app/projects/:projectId/sections/:sectionId', sectionController.show);
routes.put('/app/projects/:projectId/sections/:sectionId', sectionController.update);
routes.delete('/app/projects/:projectId/sections/:sectionId', sectionController.destroy);

module.exports = routes;
