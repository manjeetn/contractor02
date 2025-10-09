
import express from 'express';
import Project from '../models/Project.js';
import { authMiddleware, roleMiddleware } from '../middleware/authMiddleware.js';
const router = express.Router();

router.post('/', authMiddleware, roleMiddleware(['admin','sub-admin']), async (req, res) => {
  try {
    const { projectName, client, serviceType, startDate, deadline, status, totalAmount } = req.body;

    if (!projectName || !client?.name || !client?.address || !serviceType || !startDate || !deadline) {
      return res.status(400).json({ message: 'Missing required project or client fields' });
    }
    if (!totalAmount) {
  return res.status(400).json({ message: 'Total amount is required' });
}

    const newProject = new Project({
      projectName,
      client,
      serviceType,
      startDate,
      deadline,
      status: status || 'Not started',
      totalAmount,
    });

    await newProject.save();
    res.status(201).json(newProject);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/', authMiddleware , roleMiddleware(['admin','sub-admin']), async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error); 
    res.status(500).json({ message: 'Server error' });
  }
});


router.get('/:id', authMiddleware, roleMiddleware(['admin', 'sub-admin']), async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.json(project);
  } catch (error) {
    console.error('Error fetching project:', error);  
    res.status(500).json({ message: 'Server error' });
  }
});


router.put('/:id', authMiddleware, roleMiddleware(['admin', 'sub-admin']), async (req, res) => {
  try {
    const updatedProject = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedProject) return res.status(404).json({ message: 'Project not found' });
    res.json(updatedProject);
  } catch (error) {
    console.error('Error updating project:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.delete('/:id', authMiddleware, roleMiddleware(['admin','sub-admin']), async (req, res) => {
  try {
    const deleted = await Project.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Project not found' });
    res.json({ message: 'Project deleted' });
  } catch (error) {
     console.error('Error deleting project:', error);
    res.status(500).json({ message: 'Server error' });
  }
});




export default router;


