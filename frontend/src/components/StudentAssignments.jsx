import { useState, useEffect } from 'react';
import axios from 'axios';
import { FiUpload, FiCheck, FiClock, FiAward, FiFile, FiCalendar, FiBookOpen, FiInbox } from 'react-icons/fi';

const StudentAssignments = ({ user }) => {
    const [assignments, setAssignments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [uploadingId, setUploadingId] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);

    useEffect(() => {
        fetchAssignments();
    }, [user.id]);

    const fetchAssignments = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`http://localhost:8081/api/assignments/student/${user.id}`);
            setAssignments(response.data);
        } catch (err) {
            console.error('Error fetching assignments:', err);
            setError('Failed to load assignments.');
        } finally {
            setLoading(false);
        }
    };

    const handleFileSelect = (e, assignmentId) => {
        setSelectedFile(e.target.files[0]);
        setUploadingId(assignmentId);
    };

    const handleSubmit = async (assignmentId) => {
        if (!selectedFile) {
            setError('Please select a file to upload');
            return;
        }

        const formData = new FormData();
        formData.append('file', selectedFile);
        formData.append('assignment_id', assignmentId);
        formData.append('student_id', user.id);

        try {
            setError('');
            await axios.post('http://localhost:8081/api/assignments/submit', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setSuccess('Assignment submitted successfully!');
            setSelectedFile(null);
            setUploadingId(null);
            fetchAssignments();
            setTimeout(() => setSuccess(''), 3000);
        } catch (err) {
            console.error('Error submitting assignment:', err);
            setError('Failed to submit assignment.');
        }
    };

    const getStatusInfo = (assignment) => {
        if (assignment.grade !== null && assignment.grade !== undefined) {
            return { label: 'Graded', className: 'status-graded', icon: <FiAward /> };
        }
        if (assignment.submission_id) {
            return { label: 'Submitted', className: 'status-submitted', icon: <FiCheck /> };
        }
        const now = new Date();
        const due = new Date(assignment.due_date);
        if (due < now) {
            return { label: 'Overdue', className: 'status-overdue', icon: <FiClock /> };
        }
        return { label: 'Pending', className: 'status-pending', icon: <FiClock /> };
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric', month: 'short', day: 'numeric'
        });
    };

    if (loading) {
        return <div className="assignments-loading">Loading assignments...</div>;
    }

    return (
        <div className="assignments-container">
            <h2 className="assignments-title">My Assignments</h2>

            {success && <div className="assignment-success">{success}</div>}
            {error && <div className="assignment-error">{error}</div>}

            {assignments.length === 0 ? (
                <div className="assignments-empty">
                    <div className="empty-icon"><FiInbox /></div>
                    <h3>No Assignments Yet</h3>
                    <p>Your teachers haven't posted any assignments. Check back later!</p>
                </div>
            ) : (
                <div className="assignments-list">
                    {assignments.map((assignment) => {
                        const status = getStatusInfo(assignment);
                        return (
                            <div className="assignment-card" key={assignment.id}>
                                <div className="assignment-card-header">
                                    <div className="assignment-card-title-row">
                                        <h3 className="assignment-card-title">{assignment.title}</h3>
                                        <span className={`assignment-status ${status.className}`}>
                                            {status.icon} {status.label}
                                        </span>
                                    </div>
                                    <div className="assignment-card-meta">
                                        <span className="meta-item"><FiBookOpen /> {assignment.subject_name}</span>
                                        <span className="meta-item"><FiCalendar /> Due: {formatDate(assignment.due_date)}</span>
                                        <span className="meta-item"><FiAward /> Max: {assignment.max_marks} marks</span>
                                    </div>
                                </div>

                                {assignment.description && (
                                    <p className="assignment-card-desc">{assignment.description}</p>
                                )}

                                {/* Grade display */}
                                {assignment.grade !== null && assignment.grade !== undefined && (
                                    <div className="grade-display">
                                        <div className="grade-score">
                                            <span className="grade-number">{assignment.grade}</span>
                                            <span className="grade-total">/ {assignment.max_marks}</span>
                                        </div>
                                        {assignment.feedback && (
                                            <div className="grade-feedback">
                                                <strong>Feedback:</strong> {assignment.feedback}
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* Submission info */}
                                {assignment.submission_id && assignment.file_name && (
                                    <div className="submission-info">
                                        <FiFile /> <span>Submitted: {assignment.file_name}</span>
                                        {assignment.submitted_at && (
                                            <span className="submission-time"> on {formatDate(assignment.submitted_at)}</span>
                                        )}
                                    </div>
                                )}

                                {/* Upload section */}
                                {(assignment.grade === null || assignment.grade === undefined) && (
                                    <div className="upload-section">
                                        <label className="upload-label" htmlFor={`file-${assignment.id}`}>
                                            <FiUpload />
                                            <span>{assignment.submission_id ? 'Re-upload' : 'Upload Assignment'}</span>
                                        </label>
                                        <input
                                            type="file"
                                            id={`file-${assignment.id}`}
                                            className="upload-input"
                                            onChange={(e) => handleFileSelect(e, assignment.id)}
                                            accept=".pdf,.doc,.docx,.txt,.zip,.rar,.jpg,.jpeg,.png,.pptx,.xlsx"
                                        />
                                        {uploadingId === assignment.id && selectedFile && (
                                            <div className="upload-preview">
                                                <span className="file-name">{selectedFile.name}</span>
                                                <button className="submit-upload-btn" onClick={() => handleSubmit(assignment.id)}>
                                                    Submit
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default StudentAssignments;
