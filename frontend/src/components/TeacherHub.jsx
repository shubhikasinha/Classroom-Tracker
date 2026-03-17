import { useState } from 'react';
import TeacherDashboard from './TeacherDashboard';
import TeacherAssignments from './TeacherAssignments';
import { FiCheckCircle, FiBookOpen, FiLogOut } from 'react-icons/fi';

const TeacherHub = ({ user, onLogout }) => {
    const [activeTab, setActiveTab] = useState('attendance');

    return (
        <div className="hub-container">
            {/* Hub Header */}
            <div className="hub-header">
                <div className="hub-header-left">
                    <img src="logo.png" alt="CT Logo" className="hub-logo-img" />
                    <div className="hub-user-info">
                        <span className="hub-user-name">Welcome, {user.name}</span>
                        <span className="hub-user-role">Teacher</span>
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
                    <TeacherDashboard user={user} onLogout={onLogout} isEmbedded={true} />
                )}
                {activeTab === 'assignments' && (
                    <TeacherAssignments user={user} />
                )}
            </div>
        </div>
    );
};

export default TeacherHub;
