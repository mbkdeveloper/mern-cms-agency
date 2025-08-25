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
    <>
      {servicesSections?.some((element) => element.visibility) && (
        <Wrapper id="services">
          <div className="whiteBg" style={{ padding: "60px 0" }}>
            {servicesSections.map((section, sectionIdx) => {
              if (!section.visibility) return null; // skip hidden sections
              return (
                <div className="container" key={section._id || sectionIdx}>
                  <HeaderInfo>
                    <h1 className="font40 extraBold">{section.sectionTitle}</h1>
                    <p className="font13" style={{ maxWidth: "700px" }}>
                      {section.sectionDescription}
                    </p>
                  </HeaderInfo>

                  <ServiceBoxRow className="flex">
                    {section.services.map((item, itemIdx) => (
                      <ServiceBoxWrapper key={item._id || itemIdx}>
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
              );
            })}
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
                          <img
                            className="radius8"
                            src={selectedService.details?.media || AddImage2}
                            alt={selectedService.title || null}
                          />
                        </ImgWrapper>
                      </AddLeftInner>
                    </AddLeft>
                    <AddRight>
                      <h4 className="font15 semiBold">
                        {selectedService.details?.subHeading || null}
                      </h4>
                      <h2 className="font40 extraBold">
                        {selectedService.details?.heading || null}
                      </h2>
                      <p className="font12">
                        {selectedService.details?.description || null}
                      </p>
                    </AddRight>
                  </Advertising>
                  <p className="font12 p-3">
                    {selectedService.details?.additionalInfo || null}
                  </p>
                </div>
              )}
            </ModalContent>
          </ModalOverlay>
        </Wrapper>
      )}
    </>
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
  margin-bottom: 50px;
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
