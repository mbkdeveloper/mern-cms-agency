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
import { ServiceContext } from "../../../context/ServiceContext";

const ServicesManager = () => {
  const {
    servicesSections,
    fetchServiceSections,
    addServiceSection,
    updateServiceSection,
    removeServiceSection,
    addServiceItem,
    updateServiceItem,
    removeServiceItem,
    addServiceItemDetails,
    updateServiceItemDetails,
    removeServiceItemDetails,
  } = useContext(ServiceContext);

  const [loading, setLoading] = useState(true);

  // Section Modal
  const [editingSection, setEditingSection] = useState(null);
  const [showSectionModal, setShowSectionModal] = useState(false);

  // Item Modal
  const [editingItem, setEditingItem] = useState(null);
  const [showItemModal, setShowItemModal] = useState(false);

  // Detail Modal
  const [editingDetail, setEditingDetail] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  // Fetch all sections on mount
  useEffect(() => {
    (async () => {
      await fetchServiceSections();
      setLoading(false);
    })();
  }, [fetchServiceSections]);

  // -------------------------------
  // Section Functions
  // -------------------------------
  const openSectionModal = (sectionIdx = null) => {
    if (sectionIdx === null) {
      setEditingSection({
        sectionIdx: null,
        data: { sectionTitle: "", sectionDescription: "", visibility: true },
      });
    } else {
      const sec = servicesSections[sectionIdx];
      setEditingSection({
        sectionIdx,
        data: {
          sectionTitle: sec.sectionTitle,
          sectionDescription: sec.sectionDescription,
          visibility: sec.visibility ?? true,
        },
      });
    }
    setShowSectionModal(true);
  };

  const saveSection = async () => {
    const { sectionIdx, data } = editingSection;
    if (!data.sectionTitle.trim() || !data.sectionDescription.trim())
      return alert("Please fill all fields.");
    let success =
      sectionIdx === null
        ? await addServiceSection(data)
        : await updateServiceSection(servicesSections[sectionIdx]._id, data);
    if (success) setShowSectionModal(false);
    await fetchServiceSections();
  };

  const toggleSectionVisibility = async (sectionIdx) => {
    const sec = servicesSections[sectionIdx];
    await updateServiceSection(sec._id, {
      ...sec,
      visibility: !sec.visibility,
    });
    await fetchServiceSections();
  };

  const deleteSection = async (sectionIdx) => {
    if (window.confirm("Delete this section?")) {
      await removeServiceSection(servicesSections[sectionIdx]._id);
      await fetchServiceSections();
    }
  };

  // -------------------------------
  // Item Functions
  // -------------------------------
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
    if (!data.icon.trim() || !data.title.trim() || !data.paragraph.trim())
      return alert("Please fill all fields.");
    const sectionId = servicesSections[sectionIdx]._id;
    const success =
      itemIdx === null
        ? await addServiceItem(sectionId, data)
        : await updateServiceItem(
            sectionId,
            servicesSections[sectionIdx].services[itemIdx]._id,
            data
          );
    if (success) setShowItemModal(false);
    await fetchServiceSections();
  };

  const deleteItem = async (sectionIdx, itemIdx) => {
    if (!window.confirm("Delete this item?")) return;
    const sectionId = servicesSections[sectionIdx]._id;
    const itemId = servicesSections[sectionIdx].services[itemIdx]._id;
    await removeServiceItem(sectionId, itemId);
    await fetchServiceSections();
  };

  // -------------------------------
  // Detail Functions
  // -------------------------------
  const openDetailModal = (sectionIdx, itemIdx) => {
    const item = servicesSections[sectionIdx].services[itemIdx];
    setEditingDetail({
      sectionIdx,
      itemIdx,
      data: item.details || {
        heading: "",
        subHeading: "",
        description: "",
        additionalInfo: "",
        media: "",
      },
    });
    setShowDetailModal(true);
  };

  const saveDetail = async () => {
    const { sectionIdx, itemIdx, data } = editingDetail;
    const sectionId = servicesSections[sectionIdx]._id;
    const itemId = servicesSections[sectionIdx].services[itemIdx]._id;
    const success = data._id
      ? await updateServiceItemDetails(sectionId, itemId, data)
      : await addServiceItemDetails(sectionId, itemId, data);
    if (success) setShowDetailModal(false);
    await fetchServiceSections();
  };

  const deleteDetail = async (sectionIdx, itemIdx) => {
    if (!window.confirm("Delete this detail?")) return;
    const sectionId = servicesSections[sectionIdx]._id;
    const itemId = servicesSections[sectionIdx].services[itemIdx]._id;
    await removeServiceItemDetails(sectionId, itemId);
    await fetchServiceSections();
  };

  // -------------------------------
  // Render
  // -------------------------------
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

      {servicesSections.map((section, sectionIdx) => (
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
                variant={section.visibility ? "warning" : "success"}
                className="me-2"
                onClick={() => toggleSectionVisibility(sectionIdx)}
              >
                {section.visibility ? "Hide" : "Show"}
              </Button>
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
                className="d-flex flex-column"
              >
                <div className="d-flex align-items-center justify-content-between">
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Image
                      src={item.icon || null}
                      alt={item.title || null}
                      width={80}
                    />
                    <div style={{ maxWidth: "800px", marginLeft: "25px" }}>
                      <strong>{item.title}</strong>
                      <p className="mb-0">{item.paragraph}</p>
                    </div>
                  </div>
                  <div>
                  {item.details ? null : (

                    <Button
                      variant="success"
                      size="sm"
                      onClick={() => openDetailModal(sectionIdx, itemIdx)}
                    >
                      + Add Details
                    </Button>
                  )}
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
                </div>

                <div className="mt-3 ps-5">
                  {item.details ? (
                    <ListGroup.Item
                      key={item.details._id || itemIdx}
                      className="d-flex flex-column"
                    >
                      <div className="d-flex align-items-center justify-content-between">
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <Image
                            src={item.details.media || null}
                            alt={item.details.title || null}
                            width={80}
                          />
                          <div
                            style={{ maxWidth: "800px", marginLeft: "25px" }}
                          >
                            <strong>{item.details.heading}</strong><br/>
                            <em>({item.details.subHeading})</em>
                            <p className="mb-0">{item.details.description}</p>
                            <small>{item.details.additionalInfo}</small>
                          </div>
                        </div>
                        <div>
                          <Button
                            variant="success"
                            size="sm"
                            className="me-2"
                            onClick={() => openDetailModal(sectionIdx, itemIdx)}
                          >
                            Edit Details
                          </Button>
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() => deleteDetail(sectionIdx, itemIdx)}
                          >
                            Delete Details
                          </Button>
                        </div>
                      </div>
                    </ListGroup.Item>
                  ) : null}
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
                  value={editingSection.data.sectionTitle}
                  onChange={(e) =>
                    setEditingSection((prev) => ({
                      ...prev,
                      data: { ...prev.data, sectionTitle: e.target.value },
                    }))
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Section Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
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
              <Form.Group>
                <Form.Check
                  type="switch"
                  id="visibility-switch"
                  label="Visible"
                  checked={editingSection.data.visibility}
                  onChange={(e) =>
                    setEditingSection((prev) => ({
                      ...prev,
                      data: { ...prev.data, visibility: e.target.checked },
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
                <Form.Label>Icon (URL or path)</Form.Label>
                <Form.Control
                  type="text"
                  value={editingItem.data.icon}
                  onChange={(e) =>
                    setEditingItem((prev) => ({
                      ...prev,
                      data: { ...prev.data, icon: e.target.value },
                    }))
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  value={editingItem.data.title}
                  onChange={(e) =>
                    setEditingItem((prev) => ({
                      ...prev,
                      data: { ...prev.data, title: e.target.value },
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
                    setEditingItem((prev) => ({
                      ...prev,
                      data: { ...prev.data, paragraph: e.target.value },
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
            {editingItem?.itemIdx === null ? "Add" : "Save Changes"}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Detail Modal */}
      <Modal
        show={showDetailModal}
        onHide={() => setShowDetailModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {editingDetail?.data._id
              ? "Edit Service Detail"
              : "Add Service Detail"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {editingDetail && (
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Heading</Form.Label>
                <Form.Control
                  type="text"
                  value={editingDetail.data.heading}
                  onChange={(e) =>
                    setEditingDetail((prev) => ({
                      ...prev,
                      data: { ...prev.data, heading: e.target.value },
                    }))
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Sub Heading</Form.Label>
                <Form.Control
                  type="text"
                  value={editingDetail.data.subHeading}
                  onChange={(e) =>
                    setEditingDetail((prev) => ({
                      ...prev,
                      data: { ...prev.data, subHeading: e.target.value },
                    }))
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={editingDetail.data.description}
                  onChange={(e) =>
                    setEditingDetail((prev) => ({
                      ...prev,
                      data: { ...prev.data, description: e.target.value },
                    }))
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Additional Info</Form.Label>
                <Form.Control
                  type="text"
                  value={editingDetail.data.additionalInfo}
                  onChange={(e) =>
                    setEditingDetail((prev) => ({
                      ...prev,
                      data: { ...prev.data, additionalInfo: e.target.value },
                    }))
                  }
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Media (URL)</Form.Label>
                <Form.Control
                  type="text"
                  value={editingDetail.data.media}
                  onChange={(e) =>
                    setEditingDetail((prev) => ({
                      ...prev,
                      data: { ...prev.data, media: e.target.value },
                    }))
                  }
                />
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDetailModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={saveDetail}>
            {editingDetail?.data._id ? "Save Changes" : "Add Detail"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ServicesManager;
