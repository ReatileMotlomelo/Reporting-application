import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import api from '../services/api';

const ReportForm = () => {
  const [classes, setClasses] = useState([]);
  const [formData, setFormData] = useState({
    class_id: '',
    week: '',
    date: '',
    present_students: '',
    venue: '',
    time: '',
    topic: '',
    outcomes: '',
    recommendations: '',
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await api.get('/courses/view');
        setClasses(response.data);
      } catch (err) {
        console.error('Error fetching classes');
      }
    };
    fetchClasses();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/reports/create', formData);
      setMessage('Report submitted successfully');
    } catch (err) {
      setMessage('Submission failed');
    }
  };

  return (
    <Container>
      <h2>Submit Report</h2>
      {message && <Alert variant="info">{message}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Class</Form.Label>
          <Form.Control as="select" name="class_id" value={formData.class_id} onChange={handleChange} required>
            <option value="">Select Class</option>
            {classes.map(cls => (
              <option key={cls.id} value={cls.id}>{cls.name}</option>
            ))}
          </Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Week</Form.Label>
          <Form.Control type="text" name="week" value={formData.week} onChange={handleChange} required />
        </Form.Group>
        <Form.Group>
          <Form.Label>Date</Form.Label>
          <Form.Control type="date" name="date" value={formData.date} onChange={handleChange} required />
        </Form.Group>
        <Form.Group>
          <Form.Label>Present Students</Form.Label>
          <Form.Control type="number" name="present_students" value={formData.present_students} onChange={handleChange} required />
        </Form.Group>
        <Form.Group>
          <Form.Label>Venue</Form.Label>
          <Form.Control type="text" name="venue" value={formData.venue} onChange={handleChange} required />
        </Form.Group>
        <Form.Group>
          <Form.Label>Time</Form.Label>
          <Form.Control type="text" name="time" value={formData.time} onChange={handleChange} required />
        </Form.Group>
        <Form.Group>
          <Form.Label>Topic</Form.Label>
          <Form.Control as="textarea" name="topic" value={formData.topic} onChange={handleChange} required />
        </Form.Group>
        <Form.Group>
          <Form.Label>Outcomes</Form.Label>
          <Form.Control as="textarea" name="outcomes" value={formData.outcomes} onChange={handleChange} required />
        </Form.Group>
        <Form.Group>
          <Form.Label>Recommendations</Form.Label>
          <Form.Control as="textarea" name="recommendations" value={formData.recommendations} onChange={handleChange} />
        </Form.Group>
        <Button type="submit">Submit</Button>
      </Form>
    </Container>
  );
};

export default ReportForm;
