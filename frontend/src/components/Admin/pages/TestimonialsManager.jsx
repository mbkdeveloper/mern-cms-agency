import { useState, useContext, useEffect } from "react";
import { Card, Button, ListGroup, Modal, Form, Spinner } from "react-bootstrap";
import { TestimonialContext } from "../../../context/TestimonialContext";

const TestimonialManager = () => {
  const {
    testimonialsSections,
    fetchTestimonialsSections,
    addTestimonialsSection,
    updateTestimonialsSection,
    removeTestimonialsSection,
    addTestimonialItem,
    updateTestimonialItem,
    removeTestimonialItem,
  } = useContext(TestimonialContext);

  const [loading, setLoading] = useState(true);
  const [editingSection, setEditingSection] = useState(null);
  const [showSectionModal, setShowSectionModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [showItemModal, setShowItemModal] = useState(false);

  useEffect(() => {
    (async () => {
      await fetchTestimonialsSections();
      setLoading(false);
    })();
  }, [fetchTestimonialsSections]);

  // ---- Section Modals ----
  const openSectionModal = (idx = null) => {
    setEditingSection({
      idx,
      data:
        idx === null
          ? { sectionTitle: "", sectionDescription: "", visibility: false } // ✅ default visible
          : {
              sectionTitle: testimonialsSections[idx].sectionTitle,
              sectionDescription: testimonialsSections[idx].sectionDescription,
              visibility: testimonialsSections[idx].visibility ?? true,
            },
    });
    setShowSectionModal(true);
  };

  const saveSection = async () => {
    const { idx, data } = editingSection;
    if (!data.sectionTitle.trim() || !data.sectionDescription.trim()) return;
    const success =
      idx === null
        ? await addTestimonialsSection(data)
        : await updateTestimonialsSection(testimonialsSections[idx]._id, data);
    if (success) {
      setShowSectionModal(false);
      await fetchTestimonialsSections();
    }
  };

  const deleteSection = async (idx) => {
    if (!window.confirm("Delete this section?")) return;
    const success = await removeTestimonialsSection(
      testimonialsSections[idx]._id
    );
    if (success) await fetchTestimonialsSections();
  };

  const toggleSectionVisibility = async (idx) => {
    const section = testimonialsSections[idx];
    const success = await updateTestimonialsSection(section._id, {
      ...section,
      visibility: !section.visibility,
    });
    if (success) await fetchTestimonialsSections();
  };

  // ---- Item Modals ----
  const openItemModal = (sectionIdx, itemIdx = null) => {
    setEditingItem({
      sectionIdx,
      itemIdx,
      data:
        itemIdx === null
          ? { writer: "", paragraph: "", visibility: false } // ✅ default visible
          : {
              writer:
                testimonialsSections[sectionIdx].testimonials[itemIdx].writer,
              paragraph:
                testimonialsSections[sectionIdx].testimonials[itemIdx]
                  .paragraph,
              visibility:
                testimonialsSections[sectionIdx].testimonials[itemIdx]
                  .visibility ?? true,
            },
    });
    setShowItemModal(true);
  };

  const saveItem = async () => {
    const { sectionIdx, itemIdx, data } = editingItem;
    if (!data.writer.trim() || !data.paragraph.trim()) return;
    const sectionId = testimonialsSections[sectionIdx]._id;
    const success =
      itemIdx === null
        ? await addTestimonialItem(sectionId, data)
        : await updateTestimonialItem(
            sectionId,
            testimonialsSections[sectionIdx].testimonials[itemIdx]._id,
            data
          );
    if (success) {
      setShowItemModal(false);
      await fetchTestimonialsSections();
    }
  };

  const deleteItem = async (sectionIdx, itemIdx) => {
    if (!window.confirm("Delete this testimonial?")) return;
    const success = await removeTestimonialItem(
      testimonialsSections[sectionIdx]._id,
      testimonialsSections[sectionIdx].testimonials[itemIdx]._id
    );
    if (success) await fetchTestimonialsSections();
  };

  if (loading)
    return (
      <div className="text-center py-5">
        <Spinner animation="border" />
      </div>
    );

  return (
    <>
      <div className="mb-3">
        <Button variant="primary" onClick={() => openSectionModal()}>
          + Add Section
        </Button>
      </div>

      {testimonialsSections.map((section, sectionIdx) => (
        <Card key={section._id} className="mb-4">
          <Card.Header className="d-flex justify-content-between align-items-center">
            <div style={{ maxWidth: "800px" }}>
              <h5>
                {section.sectionTitle}{" "}
                <small className="text-muted">
                  ({section.visibility ? "Visible" : "Hidden"})
                </small>
              </h5>
              <small className="text-muted">{section.sectionDescription}</small>
            </div>
            <div>
              <Button
                size="sm"
                variant={section.visibility ? "warning" : "dark"}
                className="me-2"
                onClick={() => toggleSectionVisibility(sectionIdx)}
              >
                {section.visibility ? "Hide" : "Show"}
              </Button>
              <Button
                size="sm"
                className="me-2"
                onClick={() => openSectionModal(sectionIdx)}
              >
                Edit
              </Button>
              <Button
                size="sm"
                variant="success"
                className="me-2"
                onClick={() => openItemModal(sectionIdx)}
              >
                Add Item
              </Button>
              <Button
                size="sm"
                variant="danger"
                onClick={() => deleteSection(sectionIdx)}
              >
                Delete
              </Button>
            </div>
          </Card.Header>
          <ListGroup variant="flush">
            {section.testimonials.map((item, itemIdx) => (
              <ListGroup.Item
                key={item._id || itemIdx}
                className="d-flex justify-content-between"
              >
                <div style={{ maxWidth: "800px" }}>
                  <strong>{item.writer}</strong>
                  <p className="mb-0">{item.paragraph}</p>
                </div>
                <div>
                  <Button
                    variant="outline-primary"
                    size="sm"
                    className="me-2"
                    onClick={() => openItemModal(sectionIdx, itemIdx)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => deleteItem(sectionIdx, itemIdx)}
                  >
                    Delete
                  </Button>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Card>
      ))}

      {/* Section Modal */}
      <Modal
        show={showSectionModal}
        onHide={() => setShowSectionModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {editingSection?.idx === null ? "Add Section" : "Edit Section"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {editingSection && (
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Section Title</Form.Label>
                <Form.Control
                  type="text"
                  value={editingSection.data.sectionTitle}
                  onChange={(e) =>
                    setEditingSection((p) => ({
                      ...p,
                      data: { ...p.data, sectionTitle: e.target.value },
                    }))
                  }
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Section Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={editingSection.data.sectionDescription}
                  onChange={(e) =>
                    setEditingSection((p) => ({
                      ...p,
                      data: { ...p.data, sectionDescription: e.target.value },
                    }))
                  }
                />
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowSectionModal(false)}
          >
            Cancel
          </Button>
          <Button variant="primary" onClick={saveSection}>
            {editingSection?.idx === null ? "Add" : "Save"}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Item Modal */}
      <Modal
        show={showItemModal}
        onHide={() => setShowItemModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {editingItem?.itemIdx === null
              ? "Add Testimonial"
              : "Edit Testimonial"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {editingItem && (
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Writer</Form.Label>
                <Form.Control
                  type="text"
                  value={editingItem.data.writer}
                  onChange={(e) =>
                    setEditingItem((p) => ({
                      ...p,
                      data: { ...p.data, writer: e.target.value },
                    }))
                  }
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Paragraph</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={editingItem.data.paragraph}
                  onChange={(e) =>
                    setEditingItem((p) => ({
                      ...p,
                      data: { ...p.data, paragraph: e.target.value },
                    }))
                  }
                />
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowItemModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={saveItem}>
            {editingItem?.itemIdx === null ? "Add" : "Save"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default TestimonialManager;
