import { useState, useEffect, useContext } from "react";
import {
  Card,
  ListGroup,
  Button,
  Modal,
  Form,
  Image,
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
    visibility: true,
  });
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
    setCurrentItem({ title: "", paragraph: "", image: "", visibility: true });
    setShowModal(true);
  };

  const handleEdit = (item) => {
    setIsEdit(true);
    setCurrentItem(item);
    setShowModal(true);
  };

  const handleSave = async () => {
    if (isEdit) await editHeader(currentItem._id, currentItem);
    else await addHeader(currentItem);

    setShowModal(false);
    await fetchHeaders();
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this header?")) {
      await deleteHeader(id);
      await fetchHeaders();
    }
  };

  const handlePreview = (img) => {
    setPreviewImage(img);
    setShowPreview(true);
  };

  const toggleVisibility = async (item) => {
    await editHeader(item._id, { ...item, visibility: !item.visibility });
    await fetchHeaders();
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
        headers.map((item, index) => (
          <Card key={item._id || index} className="mb-3">
            <Card.Header className="d-flex justify-content-between align-items-start flex-wrap">
              <div style={{ display: "flex", alignItems: "center" }}>
                {item.image && (
                  <Image
                    src={item.image || null}
                    alt={item.title}
                    thumbnail
                    width={80}
                    height={80}
                    className="me-3"
                    style={{ cursor: "pointer" }}
                    onClick={() => handlePreview(item.image)}
                  />
                )}
                <div style={{ maxWidth: "800px" }}>
                  <h5 className="mb-1">
                    {item.title}{" "}
                    <small className="text-muted">
                      ({item.visibility ? "Visible" : "Hidden"})
                    </small>
                  </h5>

                  <p className="mb-1">{item.paragraph}</p>
                </div>
              </div>
              <div className="mt-2">
                <Button
                  size="sm"
                  variant={item.visibility ? "warning" : "dark"}
                  className="me-2 mb-1"
                  onClick={() => toggleVisibility(item)}
                >
                  {item.visibility ? "Hide" : "Show"}
                </Button>
                <Button
                  variant="info"
                  size="sm"
                  className="me-2 mb-1"
                  onClick={() => handleEdit(item)}
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  className="mb-1"
                  onClick={() => handleDelete(item._id)}
                >
                  Delete
                </Button>
              </div>
            </Card.Header>

            <ListGroup variant="flush">
              {/* You can add more ListGroup.Item here if you have extra properties */}
            </ListGroup>
          </Card>
        ))
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
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                type="text"
                name="image"
                value={currentItem.image}
                onChange={(e) =>
                  setCurrentItem({ ...currentItem, image: e.target.value })
                }
                placeholder="Enter image URL (optional)"
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
    </div>
  );
};

export default HeaderManager;
