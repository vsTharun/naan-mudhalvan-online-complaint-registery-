import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Alert from 'react-bootstrap/Alert';
import { Button } from 'react-bootstrap';
import ChatWindow from '../common/ChatWindow';
import Collapse from 'react-bootstrap/Collapse';

const Status = () => {
  const [toggle, setToggle] = useState({});
  const [statusCompliants, setStatusCompliants] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    const { _id } = user;
    axios.get(`http://localhost:8000/status/${_id}`)
      .then((res) => {
        setStatusCompliants(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleToggle = (complaintId) => {
    setToggle((prevState) => ({
      ...prevState,
      [complaintId]: !prevState[complaintId],
    }));
  };

  return (
    <div className="status-container p-4">
      {statusCompliants.length > 0 ? (
        <div className="d-flex flex-wrap justify-content-start">
          {statusCompliants.map((complaint) => {
            const open = toggle[complaint._id] || false;
            return (
              <Card key={complaint._id} className="status-card my-3 mx-2" style={{ width: '18rem' }}>
                <Card.Body>
                  <Card.Title className="font-weight-bold">{complaint.name}</Card.Title>
                  <Card.Text><strong>Address:</strong> {complaint.address}</Card.Text>
                  <Card.Text><strong>City:</strong> {complaint.city}</Card.Text>
                  <Card.Text><strong>State:</strong> {complaint.state}</Card.Text>
                  <Card.Text><strong>Pincode:</strong> {complaint.pincode}</Card.Text>
                  <Card.Text><strong>Comment:</strong> {complaint.comment}</Card.Text>
                  <Card.Text><strong>Status:</strong> {complaint.status}</Card.Text>
                  <Button
                    variant="outline-success"
                    className="mb-3 w-100"
                    onClick={() => handleToggle(complaint._id)}
                    aria-controls={`collapse-${complaint._id}`}
                    aria-expanded={open}
                  >
                    {open ? 'Hide Messages' : 'View Messages'}
                  </Button>
                  <Collapse in={open}>
                    <div id={`collapse-${complaint._id}`}>
                      <Card body className="chat-card p-3">
                        <ChatWindow key={complaint._id} complaintId={complaint._id} name={complaint.name} />
                      </Card>
                    </div>
                  </Collapse>
                </Card.Body>
              </Card>
            );
          })}
        </div>
      ) : (
        <Alert variant="info" className="text-center">
          <Alert.Heading>No complaints to show</Alert.Heading>
        </Alert>
      )}
    </div>
  );
};

export default Status;
