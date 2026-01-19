import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/auth/Login';
import Signup from './pages/auth/SignUp';
import RecruiterFeed from './pages/recruiter/recruiterFeed';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/jobs" element={<RecruiterFeed />} />
        {/* We will add /jobs later */}
      </Routes>
    </Router>
  );
}

export default App;