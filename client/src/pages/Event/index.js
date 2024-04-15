import React, { useState, useEffect } from "react";
import { Card, Col, Row, message, Modal, Button, Dropdown, Menu } from "antd";
import { useDispatch } from "react-redux";
import { GetEvent } from "../../apicalls/events";
import { SetLoading } from "../../redux/loadersSlice";
import Navbar from "../../components/Navbar";
import moment from "moment";
import VolunteerRegistrationForm from "../Event/volunteerRegistrationForm";
import { ShareAltOutlined } from "@ant-design/icons";

function BloodDonationEvents() {
  const [data, setData] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showVolunteerForm, setShowVolunteerForm] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();

  const getData = async () => {
    try {
      dispatch(SetLoading(true));
      const response = await GetEvent();
      if (response.success) {
        const sortedData = response.data.sort((a, b) =>
          moment(a.eventDate, "YYYY-MM-DD").diff(
            moment(b.eventDate, "YYYY-MM-DD")
          )
        );
        setData(sortedData);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    } finally {
      dispatch(SetLoading(false));
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const isEventExpired = (event) => {
    const eventDate = moment(event.eventDate, "YYYY-MM-DD");
    const currentDate = moment();
    return eventDate < currentDate;
  };

  const filteredData = data.filter((event) => !isEventExpired(event));

  const handleShareClick = (event) => {
    setSelectedEvent(event);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedEvent(null);
    setShowVolunteerForm(false);
  };

  const handleVolunteerClick = () => {
    setShowVolunteerForm(true);
  };

  const handleSocialMediaClick = (platform) => {
    switch (platform) {
      case "facebook":
        window.open("https://www.facebook.com/", "_blank");
        break;
      case "twitter":
        window.open("https://twitter.com/", "_blank");
        break;
      case "instagram":
        window.open("https://www.instagram.com/", "_blank");
        break;
      default:
        break;
    }
  };

  const shareMenu = (
    <Menu>
      <Menu.Item
        key='facebook'
        onClick={() => handleSocialMediaClick("facebook")}
      >
        Facebook
      </Menu.Item>
      <Menu.Item
        key='twitter'
        onClick={() => handleSocialMediaClick("twitter")}
      >
        Twitter
      </Menu.Item>
      <Menu.Item
        key='instagram'
        onClick={() => handleSocialMediaClick("instagram")}
      >
        Instagram
      </Menu.Item>
    </Menu>
  );

  return (
    <div>
      <Navbar />
      <div className='my-4 mx-12'>
        <h1 className='text-4xl font-bold text-center mb-8 text-primary-color'>
          Upcoming Blood Donation Events
        </h1>
        <Row gutter={[16, 16]} style={{ height: "100%" }}>
          {filteredData.map((event) => (
            <Col span={24} key={event._id}>
              <Card
                className='rounded-lg shadow-md hover:shadow-lg transition duration-300'
                hoverable
                title={event.eventName}
                style={{ height: "100%" }}
                extra={
                  <Dropdown overlay={shareMenu}>
                    <Button icon={<ShareAltOutlined />} />
                  </Dropdown>
                }
                onClick={() => handleShareClick(event)}
              >
                <p>
                  <strong>Organization:</strong> {event.organization}
                </p>
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
                <div style={{ marginTop: "16px", textAlign: "center" }}>
                  <Button
                    type='primary'
                    onClick={handleVolunteerClick}
                    className='rounded bg-primary-color text-white  active:scale-[.98] active:duration-75 transition-all ease-in-out '
                  >
                    I'm interested to be a volunteer
                  </Button>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
        <Modal
          title={selectedEvent?.eventName}
          visible={showModal}
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
        <Modal
          title='Volunteer Registration'
          visible={showVolunteerForm}
          onCancel={closeModal}
          footer={null}
        >
          {showVolunteerForm && (
            <VolunteerRegistrationForm
              title={selectedEvent?.eventName}
              eventId={selectedEvent ? selectedEvent._id : null}
              closeModal={closeModal}
            />
          )}
        </Modal>
      </div>
    </div>
  );
}

export default BloodDonationEvents;
