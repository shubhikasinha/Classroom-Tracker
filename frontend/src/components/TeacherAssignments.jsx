import { useState, useEffect } from 'react';
import axios from 'axios';
import { FiPlus, FiEye, FiCalendar, FiAward, FiUsers, FiFile, FiChevronLeft, FiBookOpen, FiClipboard, FiInbox } from 'react-icons/fi';

const TeacherAssignments = ({ user }) => {
    const [classes, setClasses] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [assignments, setAssignments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    // View states
    const [view, setView] = useState('list'); // 'list', 'create', 'submissions'
    const [selectedClass, setSelectedClass] = useState('');
    const [selectedAssignment, setSelectedAssignment] = useState(null);
    const [submissions, setSubmissions] = useState([]);

    // Create form
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        subject_id: '',
        class_id: '',
        due_date: '',
        max_marks: 100
    });

    // Grading
    const [gradingId, setGradingId] = useState(null);
    const [gradeValue, setGradeValue] = useState('');
    const [feedbackValue, setFeedbackValue] = useState('');

    useEffect(() => {
        fetchClasses();
        fetchSubjects();
    }, []);

    useEffect(() => {
        if (selectedClass) {
            fetchAssignments(selectedClass);
        }
    }, [selectedClass]);

    const fetchClasses = async () => {
        try {
            const response = await axios.get('http://localhost:8081/api/teacher/classes');
            const correctedClasses = response.data.map(cls => {
                if (cls.id === 1) return { ...cls, name: 'CSE A' };
                if (cls.id === 2) return { ...cls, name: 'CSE B' };
                return cls;
            });
            setClasses(correctedClasses);
        } catch (err) {
            console.error('Error fetching classes:', err);
        }
    };

    const fetchSubjects = async () => {
        try {
            const response = await axios.get('http://localhost:8081/api/teacher/subjects');
            const correctedSubjects = response.data.map(subj => {
                if (subj.id === 2) return { ...subj, name: 'OS' };
                if (subj.id === 4) return { ...subj, name: 'Computer Networks' };
                return subj;
            });
            setSubjects(correctedSubjects);
        } catch (err) {
            console.error('Error fetching subjects:', err);
        }
    };

    const fetchAssignments = async (classId) => {
        try {
            setLoading(true);
            const response = await axios.get(`http://localhost:8081/api/assignments/class/${classId}`);
            setAssignments(response.data);
        } catch (err) {
            console.error('Error fetching assignments:', err);
            setError('Failed to load assignments.');
        } finally {
            setLoading(false);
        }
    };

    const handleCreateAssignment = async (e) => {
        e.preventDefault();
        if (!formData.title || !formData.subject_id || !formData.class_id || !formData.due_date) {
            setError('Please fill in all required fields');
            return;
        }

        try {
            setError('');
            await axios.post('http://localhost:8081/api/assignments/create', {
                ...formData,
                created_by: user.id
            });
            setSuccess('Assignment created successfully!');
            setFormData({ title: '', description: '', subject_id: '', class_id: '', due_date: '', max_marks: 100 });
            setView('list');
            if (formData.class_id) {
                setSelectedClass(formData.class_id);
                fetchAssignments(formData.class_id);
            }
            setTimeout(() => setSuccess(''), 3000);
        } catch (err) {
            console.error('Error creating assignment:', err);
            setError('Failed to create assignment.');
        }
    };

    const viewSubmissions = async (assignment) => {
        try {
            setLoading(true);
            const response = await axios.get(`http://localhost:8081/api/assignments/${assignment.id}/submissions`);
            setSelectedAssignment(response.data.assignment);
            setSubmissions(response.data.submissions);
            setView('submissions');
        } catch (err) {
            console.error('Error fetching submissions:', err);
            setError('Failed to load submissions.');
        } finally {
            setLoading(false);
        }
    };

    const handleGrade = async (submissionId) => {
        if (gradeValue === '' || gradeValue === undefined) {
            setError('Please enter a grade');
            return;
        }

        try {
            setError('');
            await axios.post('http://localhost:8081/api/assignments/grade', {
                submissionId,
                grade: parseInt(gradeValue),
                feedback: feedbackValue
            });
            setSuccess('Grade saved successfully!');
            setGradingId(null);
            setGradeValue('');
            setFeedbackValue('');
            // Refresh submissions
            if (selectedAssignment) {
                const response = await axios.get(`http://localhost:8081/api/assignments/${selectedAssignment.id}/submissions`);
                setSubmissions(response.data.submissions);
            }
            setTimeout(() => setSuccess(''), 3000);
        } catch (err) {
            console.error('Error grading:', err);
            setError('Failed to save grade.');
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric', month: 'short', day: 'numeric'
        });
    };

    return (
        <div className="assignments-container">
            {success && <div className="assignment-success">{success}</div>}
            {error && <div className="assignment-error">{error}</div>}

            {/* LIST VIEW */}
            {view === 'list' && (
                <>
                    <div className="assignments-header">
                        <h2 className="assignments-title">Assignments</h2>
                        <button className="create-assignment-btn" onClick={() => setView('create')}>
                            <FiPlus /> Create Assignment
                        </button>
                    </div>

                    {/* Class filter */}
                    <div className="class-filter">
                        <label>Select Class:</label>
                        <select
                            className="form-control filter-select"
                            value={selectedClass}
                            onChange={(e) => setSelectedClass(e.target.value)}
                        >
                            <option value="">-- Select Class --</option>
                            {classes.map(cls => (
                                <option key={cls.id} value={cls.id}>{cls.name}</option>
                            ))}
                        </select>
                    </div>

                    {loading ? (
                        <div className="assignments-loading">Loading...</div>
                    ) : selectedClass && assignments.length === 0 ? (
                        <div className="assignments-empty">
                            <div className="empty-icon"><FiClipboard /></div>
                            <h3>No Assignments Yet</h3>
                            <p>Create your first assignment for this class!</p>
                        </div>
                    ) : (
                        <div className="assignments-list">
                            {assignments.map(assignment => (
                                <div className="assignment-card" key={assignment.id}>
                                    <div className="assignment-card-header">
                                        <div className="assignment-card-title-row">
                                            <h3 className="assignment-card-title">{assignment.title}</h3>
                                            <span className="assignment-submissions-count">
                                                <FiUsers /> {assignment.submission_count}/{assignment.total_students} submitted
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
                                    <div className="assignment-card-actions">
                                        <button className="view-submissions-btn" onClick={() => viewSubmissions(assignment)}>
                                            <FiEye /> View Submissions
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </>
            )}

            {/* CREATE VIEW */}
            {view === 'create' && (
                <div className="create-assignment-form">
                    <button className="back-btn" onClick={() => setView('list')}>
                        <FiChevronLeft /> Back to Assignments
                    </button>
                    <h2 className="assignments-title">Create New Assignment</h2>

                    <form onSubmit={handleCreateAssignment}>
                        <div className="form-group">
                            <label>Title *</label>
                            <input
                                type="text"
                                className="form-control"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                placeholder="Assignment title"
                            />
                        </div>

                        <div className="form-group">
                            <label>Description</label>
                            <textarea
                                className="form-control textarea"
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                placeholder="Describe the assignment..."
                                rows={4}
                            ></textarea>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label>Class *</label>
                                <select
                                    className="form-control"
                                    value={formData.class_id}
                                    onChange={(e) => setFormData({ ...formData, class_id: e.target.value })}
                                >
                                    <option value="">-- Select Class --</option>
                                    {classes.map(cls => (
                                        <option key={cls.id} value={cls.id}>{cls.name}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="form-group">
                                <label>Subject *</label>
                                <select
                                    className="form-control"
                                    value={formData.subject_id}
                                    onChange={(e) => setFormData({ ...formData, subject_id: e.target.value })}
                                >
                                    <option value="">-- Select Subject --</option>
                                    {subjects.map(subj => (
                                        <option key={subj.id} value={subj.id}>{subj.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label>Due Date *</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    value={formData.due_date}
                                    onChange={(e) => setFormData({ ...formData, due_date: e.target.value })}
                                />
                            </div>

                            <div className="form-group">
                                <label>Max Marks</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    value={formData.max_marks}
                                    onChange={(e) => setFormData({ ...formData, max_marks: e.target.value })}
                                    min="1"
                                />
                            </div>
                        </div>

                        <button type="submit" className="submit-assignment-btn">
                            <FiPlus /> Create Assignment
                        </button>
                    </form>
                </div>
            )}

            {/* SUBMISSIONS VIEW */}
            {view === 'submissions' && selectedAssignment && (
                <div className="submissions-view">
                    <button className="back-btn" onClick={() => setView('list')}>
                        <FiChevronLeft /> Back to Assignments
                    </button>

                    <div className="submission-assignment-info">
                        <h2 className="assignments-title">{selectedAssignment.title}</h2>
                        <div className="assignment-card-meta">
                            <span className="meta-item"><FiBookOpen /> {selectedAssignment.subject_name}</span>
                            <span className="meta-item"><FiCalendar /> Due: {formatDate(selectedAssignment.due_date)}</span>
                            <span className="meta-item"><FiAward /> Max: {selectedAssignment.max_marks} marks</span>
                        </div>
                    </div>

                    {submissions.length === 0 ? (
                        <div className="assignments-empty">
                            <div className="empty-icon"><FiInbox /></div>
                            <h3>No Submissions Yet</h3>
                            <p>No students have submitted this assignment yet.</p>
                        </div>
                    ) : (
                        <div className="submissions-list">
                            <div className="table-container">
                                <table className="submissions-table">
                                    <thead>
                                        <tr>
                                            <th>Student</th>
                                            <th>File</th>
                                            <th>Submitted</th>
                                            <th>Grade</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {submissions.map(sub => (
                                            <tr key={sub.id}>
                                                <td><strong>{sub.student_name}</strong></td>
                                                <td>
                                                    {sub.file_name ? (
                                                        <a
                                                            href={`http://localhost:8081/uploads/${sub.file_path}`}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="file-link"
                                                        >
                                                            <FiFile /> {sub.file_name}
                                                        </a>
                                                    ) : (
                                                        <span className="no-file">No file</span>
                                                    )}
                                                </td>
                                                <td>{formatDate(sub.submitted_at)}</td>
                                                <td>
                                                    {sub.grade !== null && sub.grade !== undefined ? (
                                                        <span className="graded-badge">{sub.grade}/{selectedAssignment.max_marks}</span>
                                                    ) : (
                                                        <span className="not-graded">Not graded</span>
                                                    )}
                                                </td>
                                                <td>
                                                    {gradingId === sub.id ? (
                                                        <div className="grading-inline">
                                                            <input
                                                                type="number"
                                                                className="grade-input"
                                                                placeholder="Grade"
                                                                value={gradeValue}
                                                                onChange={(e) => setGradeValue(e.target.value)}
                                                                min="0"
                                                                max={selectedAssignment.max_marks}
                                                            />
                                                            <input
                                                                type="text"
                                                                className="feedback-input"
                                                                placeholder="Feedback (optional)"
                                                                value={feedbackValue}
                                                                onChange={(e) => setFeedbackValue(e.target.value)}
                                                            />
                                                            <button className="save-grade-btn" onClick={() => handleGrade(sub.id)}>Save</button>
                                                            <button className="cancel-grade-btn" onClick={() => { setGradingId(null); setGradeValue(''); setFeedbackValue(''); }}>✕</button>
                                                        </div>
                                                    ) : (
                                                        <button
                                                            className="grade-btn"
                                                            onClick={() => {
                                                                setGradingId(sub.id);
                                                                setGradeValue(sub.grade !== null ? sub.grade.toString() : '');
                                                                setFeedbackValue(sub.feedback || '');
                                                            }}
                                                        >
                                                            <FiAward /> {sub.grade !== null ? 'Edit Grade' : 'Grade'}
                                                        </button>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default TeacherAssignments;
