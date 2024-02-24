import express from 'express';
import todoModel from "../models/todo.model.js";

class todoController {
  static todoControl = async (req, res) => {
    try {
      const todos = await todoModel.find();
      res.json(todos);  
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static todoControlPost = async (req, res) => {
    const todo = new todoModel({
      title: req.body.title,
      note: req.body.note
    });
    
   

    try {
      const newTodo = await todo.save();
      res.status(201).json(newTodo);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }



  static todoDelete = async (req, res) => {
    try {
      await todoModel.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
      res.status(404).json({ message: 'Task not found' });
    }
  }

  static todoUpdate = async (req,res) => {
    try {
      await todoModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.status(200).json({ message: 'Task Updated successfully' });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}

export default todoController;
