import { useState, useEffect } from 'react';
import axios from 'axios';

const StudentDashboard = ({ user, onLogout, isEmbedded = false }) => {
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState('');
  const [attendanceData, setAttendanceData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [summary, setSummary] = useState([]);

  // Fetch subjects when component mounts
  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        // Use port 8081
        const response = await axios.get('http://localhost:8081/api/student/subjects');

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

    const fetchAttendanceSummary = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/api/student/attendance/summary/${user.id}?t=${new Date().getTime()}`);
        console.log('Raw summary data:', response.data);

        // Apply name corrections
        const correctedSummary = response.data.map(item => {
          if (item.subject_id === 2) return { ...item, subject_name: 'OS' };
          if (item.subject_id === 4) return { ...item, subject_name: 'Computer Networks' };
          return item;
        });

        console.log('Corrected summary data:', correctedSummary);
        setSummary(correctedSummary);
      } catch (err) {
        console.error('Error fetching attendance summary:', err);
      }
    };

    fetchSubjects();
    fetchAttendanceSummary();
  }, [user.id]);

  // Handle subject selection
  const handleSubjectChange = (e) => {
    setSelectedSubject(e.target.value);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedSubject) {
      setError('Please select a subject');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await axios.get(
        `http://localhost:8081/api/student/attendance/${user.id}/subject/${selectedSubject}?t=${new Date().getTime()}`
      );

      // Apply name correction to the response
      let correctedData = { ...response.data };
      if (selectedSubject === '2') {
        correctedData.subject = 'OS';
      } else if (selectedSubject === '4') {
        correctedData.subject = 'Computer Networks';
      }

      setAttendanceData(correctedData);
    } catch (err) {
      console.error('Error fetching attendance data:', err);
      setError('Failed to load attendance data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Add a refresh function
  const refreshData = () => {
    fetchSubjects();
    fetchAttendanceSummary();
    setSelectedSubject('');
    setAttendanceData(null);
    setError('');
  };

  // Add a force refresh function
  const forceRefresh = () => {
    // Clear existing data
    setSubjects([]);
    setSummary([]);
    setAttendanceData(null);

    // Fetch fresh data with cache-busting
    const timestamp = new Date().getTime();

    // Fetch subjects
    axios.get(`http://localhost:8081/api/student/subjects?t=${timestamp}`)
      .then(response => {
        setSubjects(response.data);
      })
      .catch(err => {
        console.error('Error refreshing subjects:', err);
      });

    // Fetch attendance summary
    axios.get(`http://localhost:8081/api/student/attendance/summary/${user.id}?t=${timestamp}`)
      .then(response => {
        setSummary(response.data);
      })
      .catch(err => {
        console.error('Error refreshing attendance summary:', err);
      });
  };

  // Format date for display
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="dashboard-container">
      {!isEmbedded && (
        <div className="dashboard-header">
          <div className="user-info">
            <span className="user-name">Welcome, {user.name}</span>
            <span className="user-role">Student</span>
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
      )}

      <h2>Attendance Dashboard</h2>

      {/* Subject Selection Form */}
      <form onSubmit={handleSubmit}>
        <div className="form-row p-8">
          <div className="form-group ">
            <label className="pb-4 " htmlFor="subject">Select Subject</label>
            <select
              id="subject"
              className="form-control"
              value={selectedSubject}
              onChange={handleSubjectChange}
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
          <div className="form-group" style={{ alignSelf: 'flex-end' }}>
            <button type="submit" className="btn maa va" disabled={loading}>
              {loading ? 'Loading...' : 'View Attendance'}
            </button>
          </div>
        </div>
        {error && <p className="error-message">{error}</p>}
      </form>

      {/* Attendance Summary */}
      <div className="attendance-summary-section">
        <h3>Attendance Summary</h3>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Subject</th>
                <th>Hours Present</th>
                <th>Total Hours</th>
                <th>Percentage</th>
              </tr>
            </thead>
            <tbody>
              {summary.map((item) => (
                <tr key={item.subject_id}>
                  <td>{item.subject_name}</td>
                  <td>{item.hours_present || 0}</td>
                  <td>{item.total_hours || 0}</td>
                  <td>
                    {item.total_hours ? Math.round((item.hours_present / item.total_hours) * 100) : 0}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detailed Attendance Records */}
      {attendanceData && (
        <div className="calendar-container pt-10 pl-5 pr-5 pb-10">
          <h3>Attendance for {attendanceData.subject}</h3>

          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Hours</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {attendanceData.attendance.map((record, index) => (
                  <tr key={index}>
                    <td>{formatDate(record.date)}</td>
                    <td>{record.hours}</td>
                    <td>
                      <span className={record.status === 'present' ? 'status-present' : 'status-absent'}>
                        {record.status === 'present' ? 'Present' : 'Absent'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="attendance-summary">
            <p>
              Total Attendance:
              <span className="attendance-percentage p-2">
                {attendanceData.summary.attendedHours}/{attendanceData.summary.totalHours}
                ({attendanceData.summary.percentage}%)
              </span>
              &nbsp;&nbsp;
              <h5
                className={`p-5 font-bold ${attendanceData.summary.percentage < 75 ? 'text-red-700' : 'text-green-700'
                  }`}
              >
                {attendanceData.summary.percentage < 75
                  ? 'Low attendance, be regular!'
                  : 'Right on track'}
              </h5>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentDashboard; 