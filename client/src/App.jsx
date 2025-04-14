import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import Todo from "./Component/Todo";
import UserLogin from './Component/UserLogin';
import ProtectedRoute from './Component/ProtectedRoute';

function App() {
  return (
    <Router>
        <Routes>
        <Route path="/" element={<UserLogin />} /> 
        <Route element={<ProtectedRoute />}>
           <Route path="/todo" element={<Todo />} />
        </Route>
        </Routes>
    </Router>

  );
}

export default App;
