import { BrowserRouter as BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/auth/Login';
import Signup from './pages/auth/SignUp';
import JobFeed from './pages/JobFeed';
import PostJob from './pages/PostJob';
import ViewApplicants from './pages/ViewApplicants';
import JobDetails from './pages/JobDetails';
import PrivateRoutes from './utils/PrivateRoutes';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* PUBLIC ROUTES */}
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* PROTECTED ROUTES (Logged in Users Only) */}
        <Route element={<PrivateRoutes />}> 
            <Route path="/jobs" element={<JobFeed />} />
        </Route>

        {/* RECRUITER ONLY ROUTES */}
        <Route element={<PrivateRoutes allowedRoles={["RECRUITER"]} />}>
            <Route path="/post-job" element={<PostJob />} />
            <Route path="/jobs/:jobId/applicants" element={<ViewApplicants />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;