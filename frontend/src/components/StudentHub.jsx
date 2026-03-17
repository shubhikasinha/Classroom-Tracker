import { useState } from 'react';
import StudentDashboard from './StudentDashboard';
import StudentAssignments from './StudentAssignments';
import { FiCheckCircle, FiBookOpen, FiLogOut } from 'react-icons/fi';

const StudentHub = ({ user, onLogout }) => {
    const [activeTab, setActiveTab] = useState('attendance');

    return (
        <div className="hub-container">
            {/* Hub Header */}
            <div className="hub-header">
                <div className="hub-header-left">
                    <span className="hub-logo">CT</span>
                    <div className="hub-user-info">
                        <span className="hub-user-name">Welcome, {user.name}</span>
                        <span className="hub-user-role">Student</span>
                    </div>
                </div>
                <button className="hub-logout-btn" onClick={onLogout}>
                    <FiLogOut /> Logout
                </button>
            </div>

            {/* Tab Navigation */}
            <div className="hub-tabs">
                <button
                    className={`hub-tab ${activeTab === 'attendance' ? 'active' : ''}`}
                    onClick={() => setActiveTab('attendance')}
                >
                    <FiCheckCircle />
                    <span>Attendance</span>
                </button>
                <button
                    className={`hub-tab ${activeTab === 'assignments' ? 'active' : ''}`}
                    onClick={() => setActiveTab('assignments')}
                >
                    <FiBookOpen />
                    <span>Assignments</span>
                </button>
            </div>

            {/* Tab Content */}
            <div className="hub-content">
                {activeTab === 'attendance' && (
                    <StudentDashboard user={user} onLogout={onLogout} isEmbedded={true} />
                )}
                {activeTab === 'assignments' && (
                    <StudentAssignments user={user} />
                )}
            </div>
        </div>
    );
};

export default StudentHub;
