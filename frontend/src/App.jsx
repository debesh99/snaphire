import { BrowserRouter as BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/auth/Login';
import Signup from './pages/auth/SignUp';
import JobFeed from './pages/JobFeed';
import PostJob from './pages/PostJob';
import ViewApplicants from './pages/ViewApplicants';
import JobDetails from './pages/JobDetails';
import PrivateRoutes from './utils/PrivateRoutes';
import NotFound from './components/NotFound';

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
            <Route path="/jobs/:id" element={<JobDetails />} />
        </Route>

        {/* RECRUITER ONLY ROUTES */}
        <Route element={<PrivateRoutes allowedRoles={["RECRUITER"]} />}>
            <Route path="/post-job" element={<PostJob />} />
            <Route path="/jobs/:jobId/applicants" element={<ViewApplicants />} />
        </Route>

        <Route path="*" element={<NotFound />} /> // 404 Page
      </Routes>
    </BrowserRouter>
  );
}

export default App;