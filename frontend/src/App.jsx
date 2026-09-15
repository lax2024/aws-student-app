import { useEffect, useState } from 'react'
import './App.css'

const API = '/api/students/'

function App() {
  const [page, setPage] = useState('dashboard')
  const [students, setStudents] = useState([])
  const [form, setForm] = useState({
    name: '',
    email: '',
    course: 'MCA',
    age: ''
  })
  const [editingId, setEditingId] = useState(null)
  const [search, setSearch] = useState('')

  const loadStudents = () => {
    fetch(API)
      .then(res => res.json())
      .then(data => setStudents(data))
  }

  useEffect(() => {
    loadStudents()
  }, [])

  const saveStudent = async (e) => {
    e.preventDefault()

    const url = editingId ? `${API}${editingId}/` : API
    const method = editingId ? 'PUT' : 'POST'

    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    })

    setForm({ name: '', email: '', course: 'MCA', age: '' })
    setEditingId(null)
    loadStudents()
    setPage('students')
  }

  const deleteStudent = async (id) => {
    if (!confirm('Delete this student?')) return

    await fetch(`${API}${id}/`, {
      method: 'DELETE'
    })

    loadStudents()
  }

  const editStudent = (student) => {
    setForm({
      name: student.name,
      email: student.email,
      course: student.course || 'MCA',
      age: student.age || ''
    })
    setEditingId(student.id)
    setPage('add')
  }

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(search.toLowerCase()) ||
    student.email.toLowerCase().includes(search.toLowerCase()) ||
    (student.course || '').toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="app">

      <aside className="sidebar">
        <h1>🎓 StudentHub</h1>

        <button onClick={() => setPage('dashboard')}>📊 Dashboard</button>
        <button onClick={() => setPage('students')}>👨‍🎓 Students</button>
        <button onClick={() => {
          setEditingId(null)
          setForm({ name: '', email: '', course: 'MCA', age: '' })
          setPage('add')
        }}>➕ Add Student</button>
        <button onClick={() => setPage('aws')}>☁️ AWS Architecture</button>
      </aside>

      <main className="content">

        {page === 'dashboard' && (
          <>
            <h2>Dashboard</h2>
            <p className="subtitle">Student Management Platform</p>

            <div className="stats">
              <div className="stat">
                <span>Total Students</span>
                <strong>{students.length}</strong>
              </div>

              <div className="stat">
                <span>Courses</span>
                <strong>
                  {[...new Set(students.map(s => s.course))].length}
                </strong>
              </div>

              <div className="stat">
                <span>Average Age</span>
                <strong>
                  {students.length
                    ? Math.round(
                        students.reduce((sum, s) => sum + (s.age || 0), 0) /
                        students.length
                      )
                    : 0}
                </strong>
              </div>
            </div>

            <div className="panel">
              <h3>Recent Students</h3>

              {students.slice(-5).reverse().map(student => (
                <div className="student-row" key={student.id}>
                  <div>
                    <strong>{student.name}</strong>
                    <small>{student.email}</small>
                  </div>
                  <span>{student.course}</span>
                </div>
              ))}
            </div>
          </>
        )}

        {page === 'students' && (
          <>
            <div className="page-header">
              <div>
                <h2>Students</h2>
                <p className="subtitle">Manage all students</p>
              </div>

              <button className="primary" onClick={() => {
                setEditingId(null)
                setForm({ name: '', email: '', course: 'MCA', age: '' })
                setPage('add')
              }}>
                + Add Student
              </button>
            </div>

            <input
              className="search"
              placeholder="Search students..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />

            <div className="panel">
              {filteredStudents.map(student => (
                <div className="student-card" key={student.id}>
                  <div>
                    <h3>{student.name}</h3>
                    <p>{student.email}</p>
                    <p>{student.course} • Age {student.age}</p>
                  </div>

                  <div className="actions">
                    <button onClick={() => editStudent(student)}>
                      Edit
                    </button>

                    <button className="danger" onClick={() => deleteStudent(student.id)}>
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {page === 'add' && (
          <>
            <h2>{editingId ? 'Edit Student' : 'Add Student'}</h2>
            <p className="subtitle">
              {editingId ? 'Update student information' : 'Add a new student'}
            </p>

            <form className="form" onSubmit={saveStudent}>
              <label>Name</label>
              <input
                required
                value={form.name}
                onChange={e => setForm({...form, name: e.target.value})}
                placeholder="Student name"
              />

              <label>Email</label>
              <input
                required
                type="email"
                value={form.email}
                onChange={e => setForm({...form, email: e.target.value})}
                placeholder="student@example.com"
              />

              <label>Course</label>
              <select
                value={form.course}
                onChange={e => setForm({...form, course: e.target.value})}
              >
                <option>MCA</option>
                <option>BCA</option>
                <option>BSc Computer Science</option>
                <option>MBA</option>
              </select>

              <label>Age</label>
              <input
                required
                type="number"
                value={form.age}
                onChange={e => setForm({...form, age: e.target.value})}
                placeholder="Age"
              />

              <button className="primary" type="submit">
                {editingId ? 'Update Student' : 'Add Student'}
              </button>
            </form>
          </>
        )}

        {page === 'aws' && (
          <>
            <h2>AWS Architecture</h2>
            <p className="subtitle">Cloud infrastructure powering StudentHub</p>

            <div className="aws-grid">
              <div>⚛️ <strong>React</strong><small>Frontend</small></div>
              <div>🌐 <strong>Nginx</strong><small>Web Server / Reverse Proxy</small></div>
              <div>🐍 <strong>Django</strong><small>REST API</small></div>
              <div>🚀 <strong>Gunicorn</strong><small>Application Server</small></div>
              <div>🖥️ <strong>EC2</strong><small>Application Hosting</small></div>
              <div>🗄️ <strong>RDS MySQL</strong><small>Database</small></div>
              <div>🪣 <strong>S3</strong><small>Static Hosting</small></div>
              <div>λ <strong>Lambda</strong><small>Serverless Function</small></div>
              <div>🔐 <strong>IAM</strong><small>Access Control</small></div>
            </div>
          </>
        )}

      </main>
    </div>
  )
}

export default App
