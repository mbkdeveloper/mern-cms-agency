import React, { useState, useEffect, useContext } from "react";
import { GalerieContext } from "./../../../context/GalerieContext";
import {
  Table,
  Button,
  Modal,
  Form,
  Image,
  Toast,
  Spinner,
} from "react-bootstrap";

const GalerieManager = () => {
  const { galerie, fetchGalerie, addGalerie, editGalerie, deleteGalerie } =
    useContext(GalerieContext);
  const [showPreview, setShowPreview] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [currentItem, setCurrentItem] = useState({
    identifiant: "",
    image: "",
    alt: "",
  });
  const [isEdit, setIsEdit] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [showToast, setShowToast] = useState(false);

  // Fetch galerie on mount
  useEffect(() => {
    (async () => {
      await fetchGalerie();
      setLoading(false);
    })();
  }, [fetchGalerie]);

  // Open Add Modal
  const handleAdd = () => {
    setIsEdit(false);
    setCurrentItem({ identifiant: "", image: "", alt: "" });
    setShowModal(true);
  };

  // Open Edit Modal
  const handleEdit = (item) => {
    setIsEdit(true);
    setCurrentItem(item);
    setShowModal(true);
  };

  // Save changes
  const handleSave = async () => {
    let success;
    if (isEdit) {
      success = await editGalerie(currentItem._id, currentItem);
    } else {
      success = await addGalerie(currentItem);
    }
    if (success) {
      setToastMsg(`Image ${isEdit ? "updated" : "added"} successfully`);
      setShowToast(true);
    }
    setShowModal(false);
  };

  // Delete
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this image?")) {
      const success = await deleteGalerie(id);
      if (success) {
        setToastMsg("Image deleted successfully");
        setShowToast(true);
      }
    }
  };
  const handlePreview = (img) => {
    setPreviewImage(img);
    setShowPreview(true);
  };
  // Copy path to clipboard
  const handleCopy = (path) => {
    navigator.clipboard.writeText(path);
    setToastMsg(`Copied: ${path}`);
    setShowToast(true);
  };

  return (
    <div className="p-3">
      <h3>Galerie</h3>
      <Button variant="primary" onClick={handleAdd} className="mb-3">
        Add Image
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
              <th>Identifiant</th>
              <th>Alt</th>
              <th>Image Path (click to copy)</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(galerie) &&
              galerie.map((item, index) => (
                <tr key={item._id || item.identifiant || index}>
                  <td>
                    <Image
                      src={item.image || null}
                      alt={item.alt || null}
                      thumbnail
                      width={80}
                      style={{ cursor: "pointer" }}
                      onClick={() => handlePreview(item.image)}
                    />
                  </td>
                  <td>{item.identifiant || null}</td>
                  <td>{item.alt || null}</td>
                  <td
                    onClick={() => handleCopy(item.image)}
                    style={{ cursor: "pointer", color: "blue" }}
                  >
                    {item.image}
                  </td>
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
          <Modal.Title>{isEdit ? "Edit Image" : "Add Image"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Identifiant</Form.Label>
              <Form.Control
                type="text"
                value={currentItem.identifiant || null}
                onChange={(e) =>
                  setCurrentItem({ ...currentItem, identifiant: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Image Path</Form.Label>
              <Form.Control
                type="file"
                name="image"
                accept="image/*"
                onChange={(e) =>
                  setCurrentItem({ ...currentItem, image: e.target.files[0] })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Alt Text</Form.Label>
              <Form.Control
                type="text"
                value={currentItem.alt || null}
                onChange={(e) =>
                  setCurrentItem({ ...currentItem, alt: e.target.value })
                }
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
      <Modal
        show={showPreview}
        onHide={() => setShowPreview(false)}
        centered
        size="lg"
      >
        <Modal.Body className="text-center">
          <Image src={previewImage || null} alt="Preview" fluid />
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

export default GalerieManager;
