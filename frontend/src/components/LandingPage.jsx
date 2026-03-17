import { useNavigate } from 'react-router-dom';
import { FiCheckCircle, FiBookOpen, FiAward, FiArrowRight, FiActivity, FiUsers, FiStar } from 'react-icons/fi';

const LandingPage = () => {
    const navigate = useNavigate();

    const features = [
        {
            icon: <FiCheckCircle />,
            title: 'Attendance Tracking',
            description: 'Mark and monitor student attendance across all subjects with detailed summaries and percentage tracking.'
        },
        {
            icon: <FiBookOpen />,
            title: 'Assignment Management',
            description: 'Create, distribute, and collect assignments digitally. Students can upload their work seamlessly.'
        },
        {
            icon: <FiAward />,
            title: 'Grading System',
            description: 'Grade submissions and provide feedback. Students can track their grades and improve performance.'
        }
    ];

    return (
        <div className="landing-page">
            {/* Navbar */}
            <nav className="landing-nav">
                <div className="landing-nav-brand">

                    <img src="logo.png" alt="" className='h-12' />
                </div>
                <button className="nav-login-btn" onClick={() => navigate('/login')}>
                    Login <FiArrowRight />
                </button>
            </nav>

            {/* Hero Section */}
            <section className="landing-hero">
                <div className="hero-content">
                    <div className="hero-badge">Comprehensive Classroom Management</div>
                    <h1 className="hero-title">
                        <span className="hero-title-line">Classroom</span>
                        <span className="hero-title-line gradient-text">Tracker</span>
                    </h1>
                    <p className="hero-subtitle">
                        A unified platform for managing attendance, distributing assignments, and grading submissions efficiently.
                    </p>
                    <div className="hero-actions">
                        <button className="hero-btn primary" onClick={() => navigate('/login')}>
                            Get Started <FiArrowRight />
                        </button>
                    </div>
                    <div className="hero-stats">
                        <div className="hero-stat">
                            <span className="stat-number">100+</span>
                            <span className="stat-label">Students</span>
                        </div>
                        <div className="stat-divider"></div>
                        <div className="hero-stat">
                            <span className="stat-number">4</span>
                            <span className="stat-label">Subjects</span>
                        </div>
                        <div className="stat-divider"></div>
                        <div className="hero-stat">
                            <span className="stat-number">2</span>
                            <span className="stat-label">Classes</span>
                        </div>
                    </div>
                </div>
                <div className="hero-visual">
                    <div className="hero-card card-1">
                        <div className="card-icon"><FiActivity /></div>
                        <div className="card-label">Attendance Metrics</div>
                        <div className="card-value">95%</div>
                    </div>
                    <div className="hero-card card-2">
                        <div className="card-icon"><FiBookOpen /></div>
                        <div className="card-label">Active Assignments</div>
                        <div className="card-value">12</div>
                    </div>
                    <div className="hero-card card-3">
                        <div className="card-icon"><FiStar /></div>
                        <div className="card-label">Average Performance</div>
                        <div className="card-value">A+</div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="landing-features">
                <div className="features-header">
                    <h2 className="features-title">Core Capabilities</h2>
                    <p className="features-subtitle">A robust toolset designed for academic institutions</p>
                </div>
                <div className="features-grid">
                    {features.map((feature, index) => (
                        <div className="feature-card" key={index} style={{ animationDelay: `${index * 0.15}s` }}>
                            <div className="feature-icon">{feature.icon}</div>
                            <h3 className="feature-title">{feature.title}</h3>
                            <p className="feature-description">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Footer */}
            <footer className="landing-footer">
                <p>© {new Date().getFullYear()} Classroom Tracker. Developed for Academic Excellence.</p>
            </footer>
        </div>
    );
};

export default LandingPage;
