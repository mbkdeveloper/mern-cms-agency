import React, { useState, useContext, useEffect } from "react";
import {
  Card,
  Button,
  ListGroup,
  Modal,
  Form,
  Spinner,
  Image,
} from "react-bootstrap";
import { StoreContext } from "../../store/StoreContext";

const ServicesManager = () => {
  const {
    servicesSections,
    fetchServiceSections,
    addServiceSection,
    updateServiceSection,
    removeServiceSection,
    addServiceItem,
    updateServiceItem, // Optional if you add edit item API
    removeServiceItem,
    API_BASE,
  } = useContext(StoreContext);

  // Loading state for fetch
  const [loading, setLoading] = useState(true);

  // Section modal state
  const [editingSection, setEditingSection] = useState(null);
  const [showSectionModal, setShowSectionModal] = useState(false);

  // Item modal state
  const [editingItem, setEditingItem] = useState(null);
  const [showItemModal, setShowItemModal] = useState(false);

  // Fetch on mount
  useEffect(() => {
    (async () => {
      await fetchServiceSections();
      setLoading(false);
    })();
  }, [fetchServiceSections]);

  // Open Section modal (for add or edit)
  const openSectionModal = (sectionIdx = null) => {
    if (sectionIdx === null) {
      setEditingSection({
        sectionIdx: null,
        data: { sectionTitle: "", sectionDescription: "" },
      });
    } else {
      const sec = servicesSections[sectionIdx];
      setEditingSection({
        sectionIdx,
        data: {
          sectionTitle: sec.sectionTitle,
          sectionDescription: sec.sectionDescription,
        },
      });
    }
    setShowSectionModal(true);
  };

  // Save section (add or update)
  const saveSection = async () => {
    const { sectionIdx, data } = editingSection;
    if (!data.sectionTitle.trim() || !data.sectionDescription.trim()) {
      alert("Please fill all fields.");
      return;
    }
    let success;
    if (sectionIdx === null) {
      success = await addServiceSection(data);
    } else {
      const id = servicesSections[sectionIdx]._id;
      success = await updateServiceSection(id, data);
    }
    if (success) setShowSectionModal(false);
    
      await fetchServiceSections();
  };

  // Delete section
  const deleteSection = async (sectionIdx) => {
    if (
      window.confirm("Are you sure you want to delete this entire section?")
    ) {
      const id = servicesSections[sectionIdx]._id;
      const success = await removeServiceSection(id);
      await fetchServiceSections();
      if (!success) alert("Failed to delete section");
    }
  };

  // Open Item modal (add/edit)
  const openItemModal = (sectionIdx, itemIdx = null) => {
    if (itemIdx === null) {
      setEditingItem({
        sectionIdx,
        itemIdx: null,
        data: { icon: "", title: "", paragraph: "" },
      });
    } else {
      const item = servicesSections[sectionIdx].services[itemIdx];
      setEditingItem({
        sectionIdx,
        itemIdx,
        data: { icon: item.icon, title: item.title, paragraph: item.paragraph },
      });
    }
    setShowItemModal(true);
  };

  const saveItem = async () => {
    const { sectionIdx, itemIdx, data } = editingItem;
    if (!data.icon.trim() || !data.title.trim() || !data.paragraph.trim()) {
      alert("Please fill all fields.");
      return;
    }
    const sectionId = servicesSections[sectionIdx]._id;
    let success = false;

    if (itemIdx === null) {
      // Add new item
      success = await addServiceItem(sectionId, data);
    } else {
      // Update existing item
      const itemId = servicesSections[sectionIdx].services[itemIdx]._id;
      success = await updateServiceItem(sectionId, itemId, data);
    }

    if (success) setShowItemModal(false);
  };

  // Delete item
  const deleteItem = async (sectionIdx, itemIdx) => {
    if (window.confirm("Delete this service item?")) {
      const sectionId = servicesSections[sectionIdx]._id;
      const itemId = servicesSections[sectionIdx].services[itemIdx]._id;
      const success = await removeServiceItem(sectionId, itemId);
      if (!success) alert("Failed to delete item");
    }
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" />
      </div>
    );
  }

  return (
    <>
      {/* Add Section Button */}
      <div className="mb-3">
        <Button variant="primary" onClick={() => openSectionModal()}>
          + Add Section
        </Button>
      </div>

      {servicesSections.map((section, sectionIdx) => (
        <Card key={section._id} className="mb-4">
          <Card.Header className="d-flex justify-content-between align-items-center">
            <div style={{maxWidth:"800px"}}>
              <h5>{section.sectionTitle}</h5>
              <small className="text-muted">{section.sectionDescription}</small>
            </div>
            <div>
              <Button
                variant="secondary"
                size="sm"
                className="me-2"
                onClick={() => openSectionModal(sectionIdx)}
              >
                Edit Section
              </Button>
              <Button
                variant="success"
                size="sm"
                className="me-2"
                onClick={() => openItemModal(sectionIdx)}
              >
                Add Item
              </Button>
              <Button
                variant="danger"
                size="sm"
                onClick={() => deleteSection(sectionIdx)}
              >
                Delete Section
              </Button>
            </div>
          </Card.Header>

          <ListGroup variant="flush">
            {section.services.map((item, itemIdx) => (
              <ListGroup.Item
                key={item._id || itemIdx}
                className="d-flex align-items-center justify-content-between"
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Image
                    src={API_BASE + item.icon}
                    alt={item.title}
                    width={80}
                  />
                  <div style={{maxWidth:"800px", marginLeft:"25px"}}>
                    <strong>{item.title}</strong>
                    <p className="mb-0">{item.paragraph}</p>
                  </div>
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
            {editingSection?.sectionIdx === null
              ? "Add Section"
              : "Edit Section"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {editingSection && (
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Section Title</Form.Label>
                <Form.Control
                  type="text"
                  name="sectionTitle"
                  value={editingSection.data.sectionTitle}
                  onChange={(e) =>
                    setEditingSection((prev) => ({
                      ...prev,
                      data: { ...prev.data, sectionTitle: e.target.value },
                    }))
                  }
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Section Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="sectionDescription"
                  value={editingSection.data.sectionDescription}
                  onChange={(e) =>
                    setEditingSection((prev) => ({
                      ...prev,
                      data: {
                        ...prev.data,
                        sectionDescription: e.target.value,
                      },
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
            {editingSection?.sectionIdx === null ? "Add" : "Save Changes"}
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
              ? "Add Service Item"
              : "Edit Service Item"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {editingItem && (
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Icon (path)</Form.Label>
                <Form.Control
                  type="text"
                  name="icon"
                  value={editingItem.data.icon}
                  onChange={(e) =>
                    setEditingItem((prev) => ({
                      ...prev,
                      data: { ...prev.data, icon: e.target.value },
                    }))
                  }
                  placeholder="e.g. bi bi-globe"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  value={editingItem.data.title}
                  onChange={(e) =>
                    setEditingItem((prev) => ({
                      ...prev,
                      data: { ...prev.data, title: e.target.value },
                    }))
                  }
                  placeholder="Service title"
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Paragraph</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="paragraph"
                  value={editingItem.data.paragraph}
                  onChange={(e) =>
                    setEditingItem((prev) => ({
                      ...prev,
                      data: { ...prev.data, paragraph: e.target.value },
                    }))
                  }
                  placeholder="Service description"
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
            {editingItem?.itemIdx === null ? "Add" : "Save Changes"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ServicesManager;
