import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import HomePage from './pages/HomePage';

function App() {
  
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Navigate to='/' replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/*" element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default App;
