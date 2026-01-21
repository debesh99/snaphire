import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser } from '../../services/ApiService';

const Signup = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'CANDIDATE' // Default value
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            // Calls the Backend Signup Endpoint
            await registerUser(formData);
            alert("Registration Successful! Please Login.");
            navigate('/'); // Redirect to Login page
        } catch (err) {
            alert("Registration failed. Email might already exist.");
        } finally {
            setIsLoading(false); // Stop loading
        }
    };

    return (
        <section className="vh-100" style={{ backgroundColor: '#2C3E50' }}>
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col col-xl-10">
                        <div className="card" style={{ borderRadius: '1rem' }}>
                            <div className="row g-0">
                                {/* Changed Image for Variety (Optional) */}
                                <div className="col-md-6 col-lg-5 d-none d-md-block">
                                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img2.webp"
                                        alt="signup form" className="img-fluid" style={{ borderRadius: '1rem 0 0 1rem', maxWidth: '103%' }} />
                                </div>
                                <div className="col-md-6 col-lg-7 d-flex align-items-center">
                                    <div className="card-body p-4 p-lg-5 text-black">

                                        <form onSubmit={handleSubmit}>
                                            <div className="d-flex align-items-center mb-3 pb-1">
                                                <i className="fas fa-user-plus fa-2x me-3" style={{ color: '#ff6219' }}></i>
                                                <span className="h1 fw-bold mb-0">Join Snaphire</span>
                                            </div>

                                            <h5 className="fw-normal mb-3 pb-3" style={{ letterSpacing: '1px' }}>Create your account</h5>

                                            {/* Name Input */}
                                            <div className="form-outline mb-4">
                                                <input 
                                                    type="text" 
                                                    name="name"
                                                    className="form-control form-control-lg" 
                                                    placeholder="Full Name"
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </div>

                                            {/* Email Input */}
                                            <div className="form-outline mb-4">
                                                <input 
                                                    type="email" 
                                                    name="email"
                                                    className="form-control form-control-lg" 
                                                    placeholder="Email address"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </div>

                                            {/* Password Input */}
                                            <div className="form-outline mb-4">
                                                <input 
                                                    type="password" 
                                                    name="password"
                                                    className="form-control form-control-lg" 
                                                    placeholder="Password"
                                                    value={formData.password}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </div>

                                            {/* Role Selection */}
                                            <div className="form-outline mb-4">
                                                <label className="form-label">I am a:</label>
                                                <select 
                                                    className="form-select form-control-lg" 
                                                    name="role" 
                                                    value={formData.role} 
                                                    onChange={handleChange}
                                                >
                                                    <option value="CANDIDATE">Candidate (Looking for Jobs)</option>
                                                    <option value="RECRUITER">Recruiter (Hiring)</option>
                                                </select>
                                            </div>

                                            <div className="pt-1 mb-4">
                                                <button 
                                                    className="btn btn-dark btn-lg btn-block" 
                                                    type="submit"
                                                    disabled={isLoading}
                                                    style={{ backgroundColor: '#FF6219', border: 'none' }} // Brand Color
                                                >
                                                    {isLoading ? "Signing up..." : "Sign Up"}
                                                </button>
                                            </div>

                                            <p className="mb-5 pb-lg-2" style={{ color: '#393f81' }}>
                                                Already have an account? <Link to="/" style={{ color: '#393f81' }}>Login here</Link>
                                            </p>
                                        </form>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Signup;

