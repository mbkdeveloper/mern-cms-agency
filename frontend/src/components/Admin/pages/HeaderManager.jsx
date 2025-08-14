import { useState, useEffect, useContext } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Image,
  Toast,
  Spinner,
} from "react-bootstrap";
import { HeaderContext } from "./../../../context/HeaderContext";
const HeaderManager = () => {
  const { headers, fetchHeaders, addHeader, editHeader, deleteHeader } =
    useContext(HeaderContext);

  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [currentItem, setCurrentItem] = useState({
    title: "",
    paragraph: "",
    image: "",
  });
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    (async () => {
      await fetchHeaders();
      setLoading(false);
    })();
  }, [fetchHeaders]);

  const handleAdd = () => {
    setIsEdit(false);
    setCurrentItem({ title: "", paragraph: "", image: "" });
    setShowModal(true);
  };

  const handleEdit = (item) => {
    setIsEdit(true);
    setCurrentItem(item);
    setShowModal(true);
  };

  const handleSave = async () => {
    let success;
    if (isEdit) {
      success = await editHeader(currentItem._id, currentItem);
    } else {
      success = await addHeader(currentItem);
    }
    if (success) {
      setToastMsg(`Header ${isEdit ? "updated" : "added"} successfully`);
      setShowToast(true);
    }
    setShowModal(false);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this header?")) {
      const success = await deleteHeader(id);
      if (success) {
        setToastMsg("Header deleted successfully");
        setShowToast(true);
      }
    }
  };

  const handlePreview = (img) => {
    setPreviewImage(img);
    setShowPreview(true);
  };

  // When image file selected
  const handleFileChange = (e) => {
    setCurrentItem({ ...currentItem, image: e.target.files[0] });
  };

  return (
    <div className="p-3">
      <Button variant="primary" onClick={handleAdd} className="mb-3">
        Add Header
      </Button>

      {loading ? (
        <div className="text-center py-5">
          <Spinner animation="border" />
        </div>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Preview (Click to open)</th>
              <th>Title</th>
              <th>Paragraph</th>
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(headers) &&
              headers.map((item, index) => (
                <tr key={item._id || index}>
                  <td>
                    <Image
                      src={item.image || null}
                      alt={item.title || null}
                      thumbnail
                      width={80}
                      style={{ cursor: "pointer" }}
                      onClick={() => handlePreview(item.image)}
                    />
                  </td>
                  <td>{item.title}</td>
                  <td>{item.paragraph}</td>
                  <td>{item.image}</td>
                  <td>
                    <Button
                      variant="warning"
                      size="sm"
                      onClick={() => handleEdit(item)}
                    >
                      Edit
                    </Button>{" "}
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDelete(item._id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      )}

      {/* Add/Edit Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{isEdit ? "Edit Header" : "Add Header"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="headerTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={currentItem.title}
                onChange={(e) =>
                  setCurrentItem({ ...currentItem, title: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="headerParagraph">
              <Form.Label>Paragraph</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={currentItem.paragraph}
                onChange={(e) =>
                  setCurrentItem({ ...currentItem, paragraph: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="headerImage">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="file"
                name="image"
                accept="image/*"
                onChange={handleFileChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleSave}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Preview Modal */}
      <Modal
        show={showPreview}
        onHide={() => setShowPreview(false)}
        centered
        size="lg"
      >
        <Modal.Body className="text-center">
          <Image src={previewImage} alt="Preview" fluid />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowPreview(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Toast */}
      <Toast
        show={showToast}
        onClose={() => setShowToast(false)}
        delay={2000}
        autohide
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          backgroundColor: "#28a745",
          color: "white",
        }}
      >
        <Toast.Body>{toastMsg}</Toast.Body>
      </Toast>
    </div>
  );
};

export default HeaderManager;
