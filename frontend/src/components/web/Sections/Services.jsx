import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import ServiceBox from "../../Elements/ServiceBox";
import { ServiceContext } from "../../../context/ServiceContext";
import AddImage2 from "../../../assets/img/add/add2.png";

// Styled components
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: ${({ visible }) => (visible ? "flex" : "none")};
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: #fff;
  padding: 30px;
  max-width: 900px;
  width: 90%;
  border-radius: 8px;
`;

const ClickableServiceBox = styled.div`
  cursor: pointer;
`;
const CloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 20px;
  background: transparent;
  border: none;
  font-size: 30px;
  cursor: pointer;
  color: #333;
  &:hover {
    color: #000;
  }
`;

export default function Services() {
  const { servicesSections, fetchServiceSections } = useContext(ServiceContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  // Fetch services on mount
  useEffect(() => {
    fetchServiceSections();
  }, [fetchServiceSections]);

  const handleServiceClick = (service) => {
    setSelectedService(service);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedService(null);
  };

  return (
    <Wrapper id="services">
      <div className="whiteBg" style={{ padding: "60px 0" }}>
        {servicesSections
          .filter((element) => element.visibility)
          .map((section, sectionIdx) => (
            <div className="container" key={sectionIdx || section._id}>
              <HeaderInfo>
                <h1 className="font40 extraBold">{section.sectionTitle}</h1>
                <p className="font13" style={{ maxWidth: "700px" }}>
                  {section.sectionDescription}
                </p>
              </HeaderInfo>

              <ServiceBoxRow className="flex">
                {section.services.map((item, itemIdx) => (
                  <ServiceBoxWrapper key={itemIdx || item._id}>
                    <ClickableServiceBox
                      onClick={() => handleServiceClick(item)}
                    >
                      <ServiceBox
                        icon={item.icon}
                        title={item.title}
                        subtitle={item.paragraph}
                      />
                    </ClickableServiceBox>
                  </ServiceBoxWrapper>
                ))}
              </ServiceBoxRow>
            </div>
          ))}
      </div>

      {/* Modal */}
      <ModalOverlay visible={modalVisible} onClick={closeModal}>
        <ModalContent onClick={(e) => e.stopPropagation()}>
          <CloseButton onClick={closeModal}>&times;</CloseButton>
          {selectedService && (
            <div className="lightBg">
              <Advertising className="flexSpaceCenter">
                <AddLeft>
                  <AddLeftInner>
                    <ImgWrapper className="flexCenter">
                      <img className="radius8" src={AddImage2} alt="add" />
                    </ImgWrapper>
                  </AddLeftInner>
                </AddLeft>
                <AddRight>
                  <h4 className="font15 semiBold">A few words about service</h4>
                  <h2 className="font40 extraBold">A Study of Creativity</h2>
                  <p className="font12">
                    What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the
                    printing and typesetting industry. Lorem Ipsum has been the
                    industry's standard dummy text ever since the 1500s, when an
                    unknown printer took a galley of type and scrambled it to
                    make a type specimen book. It has survived not only five
                    centuries, but also the leap into electronic typesetting,
                    remaining essentially unchanged. It was popularised in the
                    1960s with the release of Letraset sheets containing Lorem
                    Ipsum passages, and more recently with desktop publishing
                    software like Aldus PageMaker including versions of Lorem
                    Ipsum.
                  </p>
                </AddRight>
              </Advertising>
              <p className="font12 p-3">
                What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the
                printing and typesetting industry. Lorem Ipsum has been the
                industry's standard dummy text ever since the 1500s, when an
                unknown printer took a galley of type and scrambled it to make a
                type specimen book. It has survived not only five centuries, but
                also the leap into electronic typesetting, remaining essentially
                unchanged. It was popularised in the 1960s with the release of
                Letraset sheets containing Lorem Ipsum passages, and more
                recently with desktop publishing software like Aldus PageMaker
                including versions of Lorem Ipsum.
              </p>
            </div>
          )}
        </ModalContent>
      </ModalOverlay>
    </Wrapper>
  );
}

// Styled components
const Wrapper = styled.section`
  width: 100%;
`;
const HeaderInfo = styled.div`
  @media (max-width: 860px) {
    text-align: center;
  }
`;
const ServiceBoxRow = styled.div`
  @media (max-width: 860px) {
    flex-direction: column;
  }
`;
const ServiceBoxWrapper = styled.div`
  width: 20%;
  margin-right: 5%;
  padding: 80px 0;
  @media (max-width: 860px) {
    width: 100%;
    text-align: center;
    padding: 40px 0;
  }
`;
const Advertising = styled.div`
  padding-top: 100px;
  margin-top: 100px;
  position: relative;
  @media (max-width: 1160px) {
    padding: 60px 0 40px 0;
  }
  @media (max-width: 860px) {
    flex-direction: column;
    padding: 0 0 30px 0;
    margin: 80px 0 0px 0;
  }
`;

const AddLeft = styled.div`
  position: relative;
  width: 50%;
  @media (max-width: 860px) {
    width: 80%;
    order: 2;
    text-align: center;
  }
`;
const AddRight = styled.div`
  padding-right: 13px;
  width: 50%;
  @media (max-width: 860px) {
    width: 80%;
    order: 2;
  }
`;
const AddLeftInner = styled.div`
  width: 100%;
  position: absolute;
  top: -300px;
  left: 0;
  @media (max-width: 1190px) {
    top: -250px;
  }
  @media (max-width: 920px) {
    top: -200px;
  }
  @media (max-width: 860px) {
    position: relative;
    top: -60px;
  }
`;
const ImgWrapper = styled.div`
  width: 100%;
  padding: 0 15%;
  img {
    width: 100%;
    height: auto;
  }
  @media (max-width: 400px) {
    padding: 0;
  }
`;
