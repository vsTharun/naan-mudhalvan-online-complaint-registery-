import React, { useState, useEffect } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Dropdown from 'react-bootstrap/Dropdown';
import Alert from 'react-bootstrap/Alert';
import Footer from '../common/FooterC';
import axios from 'axios';

const AccordionAdmin = () => {
  const [complaintList, setComplaintList] = useState([]);
  const [agentList, setAgentList] = useState([]);

  useEffect(() => {
    const getComplaints = async () => {
      try {
        const response = await axios.get('http://localhost:8000/status');
        setComplaintList(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getComplaints();

    const getAgentsRecords = async () => {
      try {
        const response = await axios.get('http://localhost:8000/AgentUsers');
        setAgentList(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getAgentsRecords();
  }, []);

  const handleSelection = async (agentId, complaintId, status, agentName) => {
    try {
      await axios.get(`http://localhost:8000/AgentUsers/${agentId}`);
      const assignedComplaint = { agentId, complaintId, status, agentName };

      await axios.post('http://localhost:8000/assignedComplaints', assignedComplaint);
      const updatedComplaintList = complaintList.filter((complaint) => complaint.id !== complaintId);
      setComplaintList(updatedComplaintList);
      alert(`Complaint assigned to Agent ${agentName}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="admin-container">
      <Accordion alwaysOpen className="mb-4">
        <Accordion.Item eventKey="0">
          <Accordion.Header>Users Complaints</Accordion.Header>
          <Accordion.Body className="bg-light">
            <div className="d-flex flex-wrap justify-content-start">
              {complaintList.length > 0 ? (
                complaintList.map((complaint) => (
                  <Card key={complaint._id} className="complaint-card my-3 mx-2" style={{ width: '18rem' }}>
                    <Card.Body>
                      <Card.Title className="font-weight-bold">{complaint.name}</Card.Title>
                      <div className="complaint-details">
                        <Card.Text><strong>Address:</strong> {complaint.address}</Card.Text>
                        <Card.Text><strong>City:</strong> {complaint.city}</Card.Text>
                        <Card.Text><strong>State:</strong> {complaint.state}</Card.Text>
                        <Card.Text><strong>Pincode:</strong> {complaint.pincode}</Card.Text>
                        <Card.Text><strong>Comment:</strong> {complaint.comment}</Card.Text>
                        <Card.Text><strong>Status:</strong> {complaint.status}</Card.Text>
                      </div>
                      {complaint.status !== "completed" && (
                        <Dropdown>
                          <Dropdown.Toggle variant="outline-primary" className="w-100">
                            Assign Agent
                          </Dropdown.Toggle>
                          <Dropdown.Menu>
                            {agentList.map((agent) => (
                              <Dropdown.Item
                                key={agent._id}
                                onClick={() => handleSelection(agent._id, complaint._id, complaint.status, agent.name)}
                              >
                                {agent.name}
                              </Dropdown.Item>
                            ))}
                          </Dropdown.Menu>
                        </Dropdown>
                      )}
                    </Card.Body>
                  </Card>
                ))
              ) : (
                <Alert variant="info" className="w-100 text-center">
                  <Alert.Heading>No complaints to show</Alert.Heading>
                </Alert>
              )}
            </div>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>Agents</Accordion.Header>
          <Accordion.Body className="bg-light">
            <div className="d-flex flex-wrap justify-content-start">
              {agentList.length > 0 ? (
                agentList.map((agent) => (
                  <Card key={agent._id} className="agent-card my-3 mx-2" style={{ width: '18rem' }}>
                    <Card.Body>
                      <Card.Title className="font-weight-bold">{agent.name}</Card.Title>
                      <Card.Text><strong>Email:</strong> {agent.email}</Card.Text>
                    </Card.Body>
                  </Card>
                ))
              ) : (
                <Alert variant="info" className="w-100 text-center">
                  <Alert.Heading>No agents to show</Alert.Heading>
                </Alert>
              )}
            </div>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

      <Footer />
    </div>
  );
};

export default AccordionAdmin;
