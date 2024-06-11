import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Questionnaire from './pages/questionnaire';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Questionnaire />}/> 
      </Routes>
    </Router> 
  );
}

export default App;
