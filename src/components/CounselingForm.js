import React from "react";
import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import bgimage from "../images/bgimage.jpg"

const CounselingForm = () => {
  const initialValues = {
    name: "",
    email: "",
    phone: "",
    timeZone: "",
    iam: "individual",
    services: [],
    message: "",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    phone: Yup.string().required("Phone number is required"),
    timeZone: Yup.string().required("Time Zone is required"),
    services: Yup.array()
      .min(1, "Select at least one service")
      .required("Select your desired services"),
    message: Yup.string().required("Message is required"),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    // Replace this with your form submission logic

    console.log(values);
    setSubmitting(false);
  };
  const hasCheckedCheckbox = (array) => {
    return array && array.length > 0;
  };

  return (
    <div
    style={{
        background: `url(${bgimage})`, // Replace with your background image path
        backgroundSize: "cover",
        minHeight: "100vh",
        width: "100%",
        color: "#3e6a9f",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
            background: "#fff",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            width: "70%",
            margin: "30px 0",
          }}
      >
        <Container>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting ,isValid,setFieldValue, dirty , values }) => (
              <Form>
                <h2 className="m-4 d-flex justify-content-center">Let's Discuss</h2>
                <Row>
                  <Col md={6}>
                    <div className="mb-3">
                      <label htmlFor="name" className="form-label">
                        Name
                      </label>
                      <Field
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        placeholder="Enter you name"
                      />
                      <ErrorMessage
                        name="name"
                        component="div"
                        className="text-danger"
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="email" className="form-label">
                        Email
                      </label>
                      <Field
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        placeholder="Enter you email"
                      />
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="text-danger"
                      />
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="mb-3">
                      <label htmlFor="phone" className="form-label">
                        Phone Number
                      </label>
                      <Field
                        type="text"
                        className="form-control"
                        id="phone"
                        name="phone"
                        placeholder="Enter you phone number"
                      />
                      <ErrorMessage
                        name="phone"
                        component="div"
                        className="text-danger"
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="timeZone" className="form-label">
                        Time Zone
                      </label>
                      <Field
                        type="text"
                        className="form-control"
                        id="timeZone"
                        name="timeZone"
                        placeholder = "Enter your time zone here"
                      />
                      <ErrorMessage
                        name="timeZone"
                        component="div"
                        className="text-danger"
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="iam" className="form-label">
                        I am
                      </label>
                      <Field
                        as="select"
                        className="form-control"
                        id="iam"
                        name="iam"
                      >
                        <option value="individual">Individual</option>
                        <option value="company">Company</option>
                      </Field>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col md={12}>
                    <div className="mb-3">
                      <label>Choose your desired services</label>
                      <div>
                        <Form.Check 
                           type="checkbox"
                           name="services"
                           value="Training"
                          label="Training"
                        />
                        <Form.Check 
                          type="checkbox"
                          label="Recruitment"
                          name="services"
                            value="Recruitment"
                        />
                        <Form.Check 
                          type="checkbox"
                          label="Resource Outsourcing"
                          name="services"
                          value="Resource Outsourcing"
                        />
                        <Form.Check 
                          type="checkbox"
                          label="Counseling"
                          name="services"
                            value="Counseling"
                        />
                      </div>
                      <ErrorMessage
                        name="services"
                        component="div"
                        className="text-danger"
                      />
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col md={12}>
                    <div className="mb-3">
                      <label htmlFor="message" className="form-label">
                        Message
                      </label>
                      <Field
                        as="textarea"
                        className="form-control"
                        id="message"
                        name="message"
                        rows={4}
                      />
                      <ErrorMessage
                        name="message"
                        component="div"
                        className="text-danger"
                      />
                    </div>
                  </Col>
                </Row>
                <div className="text-center">
                <Button type="submit" disabled={
                      isSubmitting ||
                      !(isValid && dirty && hasCheckedCheckbox(values.services))
                    }>
                  Submit
                </Button>
              </div>
              </Form>
            )}
          </Formik>
        </Container>
      </div>
    </div>
  );
};

export default CounselingForm;
