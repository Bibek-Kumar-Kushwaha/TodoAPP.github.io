import mongoose from "mongoose";

//defining schema
const todoSchema = new mongoose.Schema({
  title: String,
  note: String,
});

const todoModel = mongoose.model('Todo', todoSchema);
//Todo means -> collection name 
export default todoModel;