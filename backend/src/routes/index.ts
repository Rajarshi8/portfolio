import { Router } from 'express';
import siteRoutes from './site.js';
import projectRoutes from './projects.js';
import experienceRoutes from './experience.js';
import contactRoutes from './contact.js';
import adminRoutes from './admin.js';

const router = Router();

router.use('/site', siteRoutes);
router.use('/projects', projectRoutes);
router.use('/experience', experienceRoutes);
router.use('/contact', contactRoutes);
router.use('/admin', adminRoutes);

export default router;
