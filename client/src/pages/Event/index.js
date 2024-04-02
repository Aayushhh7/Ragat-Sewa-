import { Card, Col, Row, message, Modal } from "antd";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { GetEvent } from "../../apicalls/events";
import { SetLoading } from "../../redux/loadersSlice";
import Navbar from "../../components/Navbar";

function BloodDonationEvents() {
  const [data, setData] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const dispatch = useDispatch();

  const getData = async () => {
    try {
      dispatch(SetLoading(true)); // Show loading state
      const response = await GetEvent();
      if (response.success) {
        setData(response.data); // Update state with fetched data
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    } finally {
      dispatch(SetLoading(false)); // Hide loading state
    }
  };

  useEffect(() => {
    getData(); // Fetch data when component mounts
  }, []);

  const handleCardClick = (event) => {
    setSelectedEvent(event);
  };

  const closeModal = () => {
    setSelectedEvent(null);
  };

  return (
    <div>
      {" "}
      <Navbar />
      <div className='flex justify-start my-3 mx-12'>
        <Row gutter={[16, 16]} style={{ height: "100%" }}>
          {data.map((event) => (
            <Col span={24} md={12} lg={8} key={event._id}>
              <Card
                className='rounded-lg shadow-md hover:shadow-lg transition duration-300'
                hoverable
                title={event.eventName}
                onClick={() => handleCardClick(event)}
                style={{ height: "100%" }}
              >
                <p>
                  <strong>Date:</strong> {event.eventDate}
                </p>
                <p>
                  <strong>Time:</strong> {event.eventTime}
                </p>
                <p>
                  <strong>Venue:</strong> {event.eventVenue}
                </p>
                <p>
                  <strong>Contact:</strong> {event.contact}
                </p>
                <p>
                  <strong>Description:</strong> {event.description}
                </p>
              </Card>
            </Col>
          ))}
        </Row>
        {/* Modal to show event details */}
        <Modal
          title={selectedEvent?.eventName}
          visible={!!selectedEvent}
          onCancel={closeModal}
          footer={null}
        >
          {selectedEvent && (
            <div>
              <p>
                <strong>Date:</strong> {selectedEvent.eventDate}
              </p>
              <p>
                <strong>Time:</strong> {selectedEvent.eventTime}
              </p>
              <p>
                <strong>Venue:</strong> {selectedEvent.eventVenue}
              </p>
              <p>
                <strong>Contact:</strong> {selectedEvent.contact}
              </p>
              <p>
                <strong>Description:</strong> {selectedEvent.description}
              </p>
            </div>
          )}
        </Modal>
      </div>
    </div>
  );
}

export default BloodDonationEvents;
