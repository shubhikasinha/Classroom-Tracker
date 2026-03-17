import { useState, useEffect } from 'react';
import axios from 'axios';

const TeacherDashboard = ({ user, onLogout }) => {
  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [hours, setHours] = useState(1);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [step, setStep] = useState(1); // 1: Form, 2: Mark Attendance, 3: Confirmation

  // New state for attendance records
  const [viewMode, setViewMode] = useState('mark'); // 'mark' or 'view'
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [selectedViewClass, setSelectedViewClass] = useState('');
  const [selectedViewSubject, setSelectedViewSubject] = useState('');
  const [selectedViewDate, setSelectedViewDate] = useState('');
  const [loadingRecords, setLoadingRecords] = useState(false);

  // Set today's date as default when component mounts
  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];
    setSelectedDate(formattedDate);
    setSelectedViewDate(formattedDate);

    // Fetch classes and subjects
    fetchClasses();
    fetchSubjects();

    // Add event listener to refresh data when window gains focus
    const handleFocus = () => {
      fetchClasses();
      fetchSubjects();
    };

    window.addEventListener('focus', handleFocus);

    // Clean up event listener
    return () => {
      window.removeEventListener('focus', handleFocus);
    };
  }, []);

  // Fetch classes
  const fetchClasses = async () => {
    try {
      // Use port 8081
      const response = await axios.get('http://localhost:8081/api/teacher/classes');

      // Apply name corrections
      const correctedClasses = response.data.map(cls => {
        if (cls.id === 1) return { ...cls, name: 'CSE A' };
        if (cls.id === 2) return { ...cls, name: 'CSE B' };
        return cls;
      });

      setClasses(correctedClasses);
    } catch (err) {
      console.error('Error fetching classes:', err);
      setError('Failed to load classes. Please try again later.');
    }
  };

  // Fetch subjects
  const fetchSubjects = async () => {
    try {
      // Use port 8081
      const response = await axios.get('http://localhost:8081/api/teacher/subjects');

      // Apply name corrections
      const correctedSubjects = response.data.map(subj => {
        if (subj.id === 2) return { ...subj, name: 'OS' };
        if (subj.id === 4) return { ...subj, name: 'Computer Networks' };
        return subj;
      });

      setSubjects(correctedSubjects);
    } catch (err) {
      console.error('Error fetching subjects:', err);
      setError('Failed to load subjects. Please try again later.');
    }
  };

  // Fetch students by class
  const fetchStudents = async (classId) => {
    setLoading(true);
    try {
      // Update port to 8081
      const response = await axios.get(`http://localhost:8081/api/teacher/class/${classId}/students`);

      // Add 'present' property to each student (default: true)
      const studentsWithAttendance = response.data.students.map(student => ({
        ...student,
        present: true
      }));

      setStudents(studentsWithAttendance);
      setStep(2);
    } catch (err) {
      console.error('Error fetching students:', err);
      setError('Failed to load students. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form
    if (!selectedClass || !selectedSubject || !selectedDate || !hours) {
      setError('Please fill in all fields');
      return;
    }

    setError('');
    fetchStudents(selectedClass);
  };

  // Toggle student attendance
  const toggleAttendance = (studentId) => {
    setStudents(students.map(student =>
      student.id === studentId ? { ...student, present: !student.present } : student
    ));
  };

  // Submit attendance
  const submitAttendance = async () => {
    setLoading(true);
    setError('');

    try {
      // Update port to 8081
      const response = await axios.post('http://localhost:8081/api/teacher/attendance/mark', {
        classId: selectedClass,
        subjectId: selectedSubject,
        date: selectedDate,
        hours: parseInt(hours),
        students,
        teacherId: user.id
      });

      setSuccess(`Attendance marked successfully! ${response.data.presentCount} out of ${response.data.totalCount} students present.`);
      setStep(3);
    } catch (err) {
      console.error('Error marking attendance:', err);
      setError('Failed to mark attendance. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Reset form
  const resetForm = () => {
    setSelectedClass('');
    setSelectedSubject('');
    const today = new Date();
    setSelectedDate(today.toISOString().split('T')[0]);
    setHours(1);
    setStudents([]);
    setError('');
    setSuccess('');
    setStep(1);
  };

  // New function to fetch attendance records
  const fetchAttendanceRecords = async () => {
    if (!selectedViewClass || !selectedViewSubject || !selectedViewDate) {
      setError('Please select class, subject, and date to view attendance');
      return;
    }

    setLoadingRecords(true);
    setError('');

    try {
      // This endpoint needs to be implemented in your backend
      const response = await axios.get(`http://localhost:8081/api/teacher/attendance/view`, {
        params: {
          classId: selectedViewClass,
          subjectId: selectedViewSubject,
          date: selectedViewDate
        }
      });

      setAttendanceRecords(response.data);
    } catch (err) {
      console.error('Error fetching attendance records:', err);
      setError('Failed to load attendance records. Please try again later.');
    } finally {
      setLoadingRecords(false);
    }
  };

  // Format date for display
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Refresh data while preserving changes
  const refreshData = () => {
    // Store current class and subject names
    const classNames = {};
    const subjectNames = {};

    classes.forEach(cls => {
      classNames[cls.id] = cls.name;
    });

    subjects.forEach(subj => {
      subjectNames[subj.id] = subj.name;
    });

    // Fetch fresh data
    const fetchWithPreservation = async () => {
      try {
        setLoading(true);

        // Fetch classes
        const classesResponse = await axios.get(`http://localhost:8081/api/teacher/classes`);

        // Preserve class names
        const updatedClasses = classesResponse.data.map(cls => ({
          ...cls,
          name: classNames[cls.id] || cls.name
        }));

        setClasses(updatedClasses);

        // Fetch subjects
        const subjectsResponse = await axios.get(`http://localhost:8081/api/teacher/subjects`);

        // Preserve subject names
        const updatedSubjects = subjectsResponse.data.map(subj => ({
          ...subj,
          name: subjectNames[subj.id] || subj.name
        }));

        setSubjects(updatedSubjects);

        setSuccess('Data refreshed successfully');

        // Clear success message after 3 seconds
        setTimeout(() => {
          setSuccess('');
        }, 3000);
      } catch (err) {
        console.error('Error refreshing data:', err);
        setError('Failed to refresh data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchWithPreservation();
  };

  // Add a force refresh function
  const forceRefresh = () => {
    // Clear existing data
    setClasses([]);
    setSubjects([]);

    // Fetch fresh data with cache-busting
    const timestamp = new Date().getTime();

    // Fetch classes
    axios.get(`http://localhost:8081/api/teacher/classes?t=${timestamp}`)
      .then(response => {
        console.log('Refreshed classes:', response.data);
        setClasses(response.data);
      })
      .catch(err => {
        console.error('Error refreshing classes:', err);
      });

    // Fetch subjects
    axios.get(`http://localhost:8081/api/teacher/subjects?t=${timestamp}`)
      .then(response => {
        console.log('Refreshed subjects:', response.data);
        setSubjects(response.data);
      })
      .catch(err => {
        console.error('Error refreshing subjects:', err);
      });

    setSuccess('Data refreshed successfully');
    setTimeout(() => setSuccess(''), 3000);
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div className="user-info">
          <span className="user-name">Welcome, {user.name}</span>
          <span className="user-role">Teacher</span>
        </div>
        <div>
          {/* <button 
            className="btn" 
            onClick={forceRefresh}
            style={{ marginRight: '10px', backgroundColor: '#e74c3c' }}
          >
            Force Refresh Data
          </button> */}
          <button className="btn logout-btn dash" onClick={onLogout}>
            Logout
          </button>
        </div>
      </div>

      <h2 className='text-xl font-bold'>Attendance Management</h2>

      {success && <p className="success-message" style={{ color: 'green', marginBottom: '15px' }}>{success}</p>}
      {error && <p className="error-message" style={{ color: 'red', marginBottom: '15px' }}>{error}</p>}

      {/* Toggle between marking and viewing attendance */}
      <div className="view-toggle" style={{ marginBottom: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
        <button
          className={`ma ${viewMode === 'mark' ? 'btn-active' : ''}`}
          onClick={() => setViewMode('mark')}
          style={{ marginRight: '10px', backgroundColor: viewMode === 'mark' ? '#640852' : '#95a5a6', borderRadius: '5px' }}
        >
          Mark Attendance
        </button>
        <button
          className={`ma ${viewMode === 'view' ? 'btn-active' : ''}`}
          onClick={() => setViewMode('view')}
          style={{ backgroundColor: viewMode === 'view' ? '#640852' : '#95a5a6', borderRadius: '5px' }}
        >
          View Attendance
        </button>
      </div>

      {/* Mark Attendance Section */}
      {viewMode === 'mark' && (
        <>
          {step === 1 && (
            <div className="attendance-form">
              <h3 className='p-5 '>Select Class and Subject</h3>

              <form onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="class">Class</label>
                    <select
                      id="class"
                      className="form-control am"
                      value={selectedClass}
                      onChange={(e) => setSelectedClass(e.target.value)}
                      disabled={loading}
                    >
                      <option value="">-- Select Class --</option>
                      {classes.map((cls) => (
                        <option key={cls.id} value={cls.id}>
                          {cls.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="subject">Subject</label>
                    <select
                      id="subject"
                      className="form-control am"
                      value={selectedSubject}
                      onChange={(e) => setSelectedSubject(e.target.value)}
                      disabled={loading}
                    >
                      <option value="">-- Select Subject --</option>
                      {subjects.map((subject) => (
                        <option key={subject.id} value={subject.id}>
                          {subject.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="date">Date</label>
                    <input
                      type="date"
                      id="date"
                      className="form-control am date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      disabled={loading}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="hours">Number of Hours</label>
                    <select
                      id="hours"
                      className="form-control am hr"
                      value={hours}
                      onChange={(e) => setHours(e.target.value)}
                      disabled={loading}
                    >
                      {[1, 2, 3, 4].map((h) => (
                        <option key={h} value={h}>
                          {h}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="flex justify-center mr-32">
                  <button type="submit" className="btn next" disabled={loading}>
                    {loading ? 'Loading...' : 'Next'}
                  </button>
                </div>
                {error && <p className="error-message">{error}</p>}
              </form>
            </div>
          )}

          {step === 2 && (
            <div className="mark-attendance">
              <h3>Mark Attendance</h3>

              <div className="attendance-info">
                <p>
                  <strong>Class:</strong> {classes.find(c => c.id.toString() === selectedClass)?.name}
                </p>
                <p>
                  <strong>Subject:</strong> {subjects.find(s => s.id.toString() === selectedSubject)?.name}
                </p>
                <p>
                  <strong>Date:</strong> {new Date(selectedDate).toLocaleDateString()}
                </p>
                <p>
                  <strong>Hours:</strong> {hours}
                </p>
              </div>

              <div className="table-container">
                <table>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Attendance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[...students]
                      .sort((a, b) => a.id - b.id)
                      .map((student) => (
                        <tr key={student.id}>
                          <td>{student.id}</td>
                          <td>{student.name}</td>
                          <td>
                            <div className="checkbox-container">
                              <input
                                type="checkbox"
                                id={`student-${student.id}`}
                                checked={student.present}
                                onChange={() => toggleAttendance(student.id)}
                              />
                              <label htmlFor={`student-${student.id}`}>
                                {student.present ? 'Present' : 'Absent'}
                              </label>
                            </div>
                          </td>
                        </tr>
                      ))}

                  </tbody>
                </table>
              </div>

              <div className="button-group flex justify-center mr-28" style={{ marginTop: '20px' }}>
                <button
                  className="btn sa"
                  onClick={() => setStep(1)}
                  disabled={loading}
                  style={{ marginRight: '10px' }}
                >
                  Back
                </button>
                <button
                  className="btn sa"
                  onClick={submitAttendance}
                  disabled={loading}
                >
                  {loading ? 'Submitting...' : 'Submit Attendance'}
                </button>
              </div>

              {error && <p className="error-message">{error}</p>}
            </div>
          )}

          {step === 3 && (
            <div className="confirmation">
              {/* <h3>Attendance Submitted</h3> */}

              {/* {success && <p className="success-message" style={{ color: 'green', marginBottom: '20px' }}>{success}</p>} */}

              <div className="table-container">
                <h4>Present Students</h4>
                <table>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students
                      .filter((s) => s.present)
                      .sort((a, b) => a.id - b.id) // Sort by ID in ascending order
                      .map((student) => (
                        <tr key={student.id}>
                          <td>{student.id}</td>
                          <td>{student.name}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>

              <div className=' flex justify-center'>
                <button
                  className="btn maa"
                  onClick={resetForm}
                  style={{ marginTop: '20px' }}
                >
                  Mark Another Attendance
                </button>
              </div>
            </div>
          )}
        </>
      )}

      {/* View Attendance Section */}
      {viewMode === 'view' && (
        <div className="view-attendance">
          <h3>View Attendance Records</h3>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="view-class">Class</label>
              <select
                id="view-class"
                className="form-control"
                value={selectedViewClass}
                onChange={(e) => setSelectedViewClass(e.target.value)}
                disabled={loadingRecords}
              >
                <option value="">-- Select Class --</option>
                {classes.map((cls) => (
                  <option key={cls.id} value={cls.id}>
                    {cls.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="view-subject">Subject</label>
              <select
                id="view-subject"
                className="form-control"
                value={selectedViewSubject}
                onChange={(e) => setSelectedViewSubject(e.target.value)}
                disabled={loadingRecords}
              >
                <option value="">-- Select Subject --</option>
                {subjects.map((subject) => (
                  <option key={subject.id} value={subject.id}>
                    {subject.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="view-date">Date</label>
              <input
                type="date"
                id="view-date"
                className="form-control"
                value={selectedViewDate}
                onChange={(e) => setSelectedViewDate(e.target.value)}
                disabled={loadingRecords}
              />
            </div>
          </div>
          <div className='flex justify-center'>
            <button
              className="btn maa mr-20"
              onClick={fetchAttendanceRecords}
              disabled={loadingRecords}
              style={{ marginBottom: '20px' }}
            >
              {loadingRecords ? 'Loading...' : 'View Attendance'}
            </button>
          </div>

          {error && <p className="error-message">{error}</p>}

          {attendanceRecords.length > 0 && (
            <div className="table-container">
              <h4>Attendance for {formatDate(selectedViewDate)}</h4>
                <table>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Status</th>
                      <th>Hours</th>
                    </tr>
                  </thead>
                  <tbody>
                    {attendanceRecords
                      .sort((a, b) => a.student_id - b.student_id)
                      .map((record) => (
                        <tr key={record.id}>
                          <td>{record.student_id}</td>
                          <td>{record.student_name}</td>
                          <td>
                            <span
                              className={record.status === 'present' ? 'status-present' : 'status-absent'}
                            >
                              {record.status === 'present' ? 'Present' : 'Absent'}
                            </span>
                          </td>
                          <td>{record.hours}</td>
                        </tr>
                      ))}
                  </tbody>


                </table>

                <div style={{ marginTop: '15px' }}>
                  <p>
                    <strong>Summary:</strong> {attendanceRecords.filter(r => r.status === 'present').length} out of {attendanceRecords.length} students present
                    ({Math.round((attendanceRecords.filter(r => r.status === 'present').length / attendanceRecords.length) * 100)}%)
                  </p>
                </div>
            </div>
          )}

          {attendanceRecords.length === 0 && !loadingRecords && selectedViewClass && selectedViewSubject && selectedViewDate && (
            <p>No attendance records found for the selected criteria.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default TeacherDashboard; 