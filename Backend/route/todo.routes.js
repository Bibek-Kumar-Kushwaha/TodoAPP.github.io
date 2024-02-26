import express from 'express';
import todoController from "../controllers/getTodo.js";

const router = express.Router();

router.get('/tasks', todoController.todoControl);
router.get('/tasks/:id', todoController.todoControl);
router.post('/tasks', todoController.todoControlPost);
router.delete('/tasks/:id', todoController.todoDelete);
router.put('/tasks/:id', todoController.todoUpdate);

export default router;
