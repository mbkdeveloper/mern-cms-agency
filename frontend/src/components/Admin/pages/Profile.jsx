import React, { useContext, useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Image,
  Form,
  Button,
  Alert,
} from "react-bootstrap";
import { StoreContext } from "../../store/StoreContext";
import axios from "axios";

const Profile = () => {
  const { token, userProfile, setUserProfile, logout, API, API_BASE } =
    useContext(StoreContext);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    photo: "",
    password: "",
    confirmPassword: "",
  });
  const [editing, setEditing] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (userProfile) {
      setFormData({
        name: userProfile.name,
        email: userProfile.email,
        photo: userProfile.photo,
        password: "",
        confirmPassword: "",
      });
    }
  }, [userProfile]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "photo" && files && files[0]) {
      setFormData({ ...formData, photo: files[0] }); // store the file
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleUpdate = async () => {
    if (formData.password && formData.password !== formData.confirmPassword) {
      return setMessage("Passwords do not match.");
    }

    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("email", formData.email);
      if (formData.photo) data.append("photo", formData.photo);
      if (formData.password) data.append("password", formData.password);

      const res = await axios.put(API.updateProfile, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.data.success) {
        setUserProfile(res.data.user);
        setEditing(false);
        setMessage("Profile updated successfully.");
      }
    } catch (err) {
      console.error(err.message);
      setMessage("Failed to update profile.");
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete your profile?"))
      return;

    try {
      const res = await axios.delete(API.deleteProfile, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data.success) {
        alert("Profile deleted. You have been logged out.");
        logout();
      }
    } catch (err) {
      console.error(err.message);
      alert("Failed to delete profile.");
    }
  };

  if (!userProfile) return <div>Loading profile...</div>;

  return (
    <Container className="mt-4">
      <h1>Profile Settings</h1>
      <hr />

      {message && <Alert variant="info">{message}</Alert>}

      <Row>
        <Col md={6}>
          <div className="text-center">
            <Image
              src={API_BASE + formData.photo}
              roundedCircle
              alt={API_BASE + formData.photo}
              width={150}
              height={150}
            />
            <Form.Control
              type="file"
              name="photo"
              accept="image/*"
              onChange={handleChange}
              disabled={!editing}
            />
          </div>
        </Col>

        <Col md={6}>
          <h3>Personal Info</h3>
          <Form>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={3}>
                Name
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={!editing}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={3}>
                Email
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={!editing}
                />
              </Col>
            </Form.Group>

            {editing && (
              <>
                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm={3}>
                    Password
                  </Form.Label>
                  <Col sm={9}>
                    <Form.Control
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm={3}>
                    Confirm Password
                  </Form.Label>
                  <Col sm={9}>
                    <Form.Control
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                    />
                  </Col>
                </Form.Group>
              </>
            )}

            <Form.Group as={Row} className="mb-3">
              <Col sm={{ span: 9, offset: 3 }}>
                {!editing ? (
                  <Button onClick={() => setEditing(true)}>Edit</Button>
                ) : (
                  <>
                    <Button
                      variant="success"
                      onClick={handleUpdate}
                      className="me-2"
                    >
                      Save
                    </Button>
                    <Button
                      variant="secondary"
                      onClick={() => setEditing(false)}
                    >
                      Cancel
                    </Button>
                  </>
                )}
                <Button
                  variant="danger"
                  className="ms-3"
                  onClick={handleDelete}
                >
                  Delete Profile
                </Button>
              </Col>
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
