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

const Profile = () => {
  const { userProfile, API_BASE, updateProfile, deleteProfile } =
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
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (userProfile) {
      setFormData({
        name: userProfile.name,
        email: userProfile.email,
        photo: userProfile.photo,
        password: userProfile.password,
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
    const result = await updateProfile(formData);
    setMessage(result.message);
    if (result.success) {
      setEditing(false);
    }
  };

  const handleDelete = async () => {
    const result = await deleteProfile();
    if (result.success) {
      alert(result.message);
    } else {
      alert(result.message || "Failed to delete profile.");
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
              src={
                formData.photo instanceof File
                  ? URL.createObjectURL(formData.photo)
                  : API_BASE + formData.photo
              }
              roundedCircle
              alt={formData.name}
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
                    <div className="password-wrapper">
                      <Form.Control
                        id="password"
                        type={showPassword ? "text" : "password"}
                        name="password"
                        onChange={handleChange}
                        value={formData.password}
                        placeholder="Your Password"
                      />
                      <button
                        type="button"
                        className="password-toggle"
                        aria-label="Toggle password visibility"
                        onClick={() => setShowPassword((prev) => !prev)}
                      >
                        <span
                          className={`eye-icon ${
                            showPassword ? "show-password" : ""
                          }`}
                        />
                      </button>
                    </div>
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
