import React from 'react';
import Input from './Component/Input';
import Edit from './Component/Edit';
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <div className="max-w-xl mx-auto mt-10 px-4">
      <h1 className="font-bold text-center text-4xl p-3">TODO APP</h1>
     
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<Input />} />
          <Route path="/Input" element={<Input />} />
          <Route path="/Edit/:id" element={<Edit />} />
        </Routes>
      </BrowserRouter>
      
    </div>
  );
}
