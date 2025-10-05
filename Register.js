import React, { useState } from 'react';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import api from '../services/api';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');
  const [faculty, setFaculty] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/auth/register', { username, password, role, faculty });
      setMessage('Registration successful');
    } catch (err) {
      setMessage('Registration failed');
    }
  };

  return (
    <Container>
      <h2>Register</h2>
      {message && <Alert variant="info">{message}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </Form.Group>
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </Form.Group>
        <Form.Group>
          <Form.Label>Role</Form.Label>
          <Form.Control as="select" value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="student">Student</option>
            <option value="lecturer">Lecturer</option>
            <option value="prl">Principal Lecturer</option>
            <option value="pl">Program Leader</option>
          </Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Faculty</Form.Label>
          <Form.Control type="text" value={faculty} onChange={(e) => setFaculty(e.target.value)} />
        </Form.Group>
        <Button type="submit">Register</Button>
      </Form>
    </Container>
  );
};

export default Register;
