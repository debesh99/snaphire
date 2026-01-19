import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/auth/Login';
import Signup from './pages/auth/SignUp';
import JobFeed from './pages/JobFeed';
import PostJob from './pages/PostJob';
import ViewApplicants from './pages/ViewApplicants';
import JobDetails from './pages/JobDetails';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/jobs" element={<JobFeed />} />
        <Route path="/post-job" element={<PostJob />} />
        <Route path="/jobs/:jobId/applicants" element={<ViewApplicants />} />
        <Route path="/jobs/:id" element={<JobDetails />} />
      </Routes>
    </Router>
  );
}

export default App;