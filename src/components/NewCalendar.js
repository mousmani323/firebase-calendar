import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { v4 as uuidv4 } from "uuid";

const NewCalendar = () => {
  const [events, setEvents] = useState([]);
  const [modalData, setModalData] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: "",
    location: "",
    description: "",
  });
  const [editedEvent, setEditedEvent] = useState({});
  const [editEvent, setEditEvent] = useState(null);

  const calendarContainerStyle = {
    maxWidth: "500px",
    margin: "0 auto",
    padding: "20px",
    borderRadius: "5px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
  };

  // Styling for the title in the view modal
  const titleStyle = {
    fontWeight: "bold",
    fontSize: "18px",
    marginBottom: "5px",
  };
  // Handle when the user clicks on a date to add an event
  const handleDateClick = (arg) => {
    setShowAddModal(true);
    setNewEvent({
      title: "",
      location: "",
      description: "",
      start: arg.dateStr,
      end: arg.dateStr,
      allDay: true,
    });
  };

  const generateUniqueId = () => {
    return uuidv4();
  };

  const handleCloseAddModal = () => {
    setShowAddModal(false);
  };

  const handleSaveEvent = () => {
    if (newEvent.title && newEvent.start && newEvent.end) {
      addEvent(
        newEvent.title,
        newEvent.location,
        newEvent.description,
        newEvent.start,
        newEvent.end
      );
      setShowAddModal(false);
    }
  };

  const handleEdit = () => {
    if (modalData) {
      setEditedEvent({ ...modalData?.extendedProps });
      setShowEditModal(true); // Open the edit modal
      setModalData(null); // Close the view modal
    }
  };

  // Handle when the user closes the edit modal without saving
  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setEditedEvent({}); // Reset the editedEvent to an empty object
  };

  const handleSaveChanges = () => {
    if (editEvent) {
      setEvents((prevEvents) =>
        prevEvents.map((event) =>
          event.id === editEvent.id
            ? { ...event, ...editedEvent, id: event.id } // Ensure to keep the original ID
            : event
        )
      );
      setShowEditModal(false);
      setEditEvent(null);
    }
  };

  // Handle when the user clicks on an event to view the modal
  const handleEventClick = (arg) => {
    setModalData(arg.event);
    setEditEvent(arg.event); // Set editEvent to the current event object
    setEditedEvent({ ...arg.event.extendedProps }); // Set editedEvent to the current event's extendedProps
  };
  // Handle when the user clicks on the Delete button inside the modal
  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      if (modalData?.id) {
        setEvents((prevEvents) =>
          prevEvents.filter((event) => event.id !== modalData.id)
        );
      }
      setModalData(null);
    }
  };

  const addEvent = (title, location, description, start, end) => {
    const newEvent = {
      id: generateUniqueId(),
      title,
      location,
      description,
      start,
      end,
      allDay: true,
    };
    setEvents((prevEvents) => [...prevEvents, newEvent]);
  };

  const handleDateRangeSelect = (arg) => {
    setShowAddModal(true);
    setNewEvent({
      title: "",
      description: "",
      start: arg.startStr,
      end: arg.endStr,
      allDay: true,
    });
  };

  return (
    <>
      <h2 className="d-flex justify-content-center m-4">Calendar Component</h2>
      <div style={calendarContainerStyle} >
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          initialView="dayGridMonth"
          selectable={true}
          editable={true}
          events={events}
          dateClick={handleDateClick}
          eventClick={handleEventClick}
          select={handleDateRangeSelect}
          height={"400px"}
        />
        {/* Add Event Modal */}
        <Modal show={showAddModal} onHide={handleCloseAddModal} centered>
          <Modal.Header closeButton>
            <Modal.Title>Add Event</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formTitle">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter title"
                  value={newEvent.title}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, title: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group controlId="formLocation">
                <Form.Label>Location</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter location"
                  value={newEvent.location}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, location: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group controlId="formDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Enter description"
                  value={newEvent.description}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, description: e.target.value })
                  }
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseAddModal}>
              Close
            </Button>
            <Button variant="primary" onClick={handleSaveEvent}>
              Save
            </Button>
          </Modal.Footer>
        </Modal>
        ;{/* Edit Event Modal */}
        <Modal show={showEditModal} onHide={handleCloseEditModal} centered>
          <Modal.Header closeButton>
            <Modal.Title>Edit Event</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formEditTitle">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter title"
                  value={editedEvent?.title}
                  onChange={(e) =>
                    setEditedEvent({ ...editedEvent, title: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group controlId="formEditLocation">
                <Form.Label>Location</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter location"
                  value={editedEvent?.location}
                  onChange={(e) =>
                    setEditedEvent({ ...editedEvent, location: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group controlId="formEditDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Enter description"
                  value={editedEvent?.description}
                  onChange={(e) =>
                    setEditedEvent({
                      ...editedEvent,
                      description: e.target.value,
                    })
                  }
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseEditModal}>
              Close
            </Button>
            <Button variant="primary" onClick={handleSaveChanges}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
        ;
        <Modal
          show={modalData !== null}
          onHide={() => setModalData(null)}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title style={titleStyle}>{modalData?.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p style={{ fontWeight: "bold" }}>Title:</p>
            <p>{modalData?.title}</p>
            <p style={{ fontWeight: "bold" }}>Location:</p>
            <p>{modalData?.extendedProps?.location}</p>
            <p style={{ fontWeight: "bold" }}>Description:</p>
            <p>{modalData?.extendedProps?.description}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleEdit}>
              Edit
            </Button>
            <Button variant="danger" onClick={handleDelete}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
        ; ;
      </div>
    </>
  );
};

export default NewCalendar;
