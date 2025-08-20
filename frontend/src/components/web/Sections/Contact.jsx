import React from "react";
import styled from "styled-components";
import useContact from "../../../hooks/useContact"; // adjust path if needed
import ContactImg1 from "../../../assets/img/contact-1.png";
import ContactImg2 from "../../../assets/img/contact-2.png";
import ContactImg3 from "../../../assets/img/contact-3.png";

export default function Contact() {
  const { register, handleSubmit, onSubmit, errors, status } = useContact();

  return (
    <Wrapper id="contact">
      <div className="lightBg">
        <div className="container">
          <HeaderInfo>
            <h1 className="font40 extraBold">Let's get in touch</h1>
            <p className="font13">
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
              nonumy eirmod tempor invidunt ut <br />
              labore et dolore magna aliquyam erat, sed diam voluptua.
            </p>
          </HeaderInfo>
          <div className="row" style={{ paddingBottom: "30px" }}>
            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
              <Form id="contactForm" onSubmit={handleSubmit(onSubmit)}>
                <label className="font13">Full name:</label>
                <input
                  type="text"
                  {...register("name")}
                  className="font20"
                />
                {errors.name && (
                  <ErrorMsg>{errors.name.message}</ErrorMsg>
                )}

                <label className="font13">Email:</label>
                <input
                  type="email"
                  {...register("email")}
                  className="font20"
                />
                {errors.email && (
                  <ErrorMsg>{errors.email.message}</ErrorMsg>
                )}

                <label className="font13">Subject:</label>
                <input
                  type="text"
                  {...register("subject")}
                  className="font20"
                />
                {errors.subject && (
                  <ErrorMsg>{errors.subject.message}</ErrorMsg>
                )}

                <label className="font13">Message:</label>
                <textarea
                  {...register("message")}
                  className="font20"
                />
                {errors.message && (
                  <ErrorMsg>{errors.message.message}</ErrorMsg>
                )}

              </Form>
                <SumbitWrapper className="flex">
                  <ButtonInput
                  form="contactForm" 
                    type="submit"
                    value={status.loading ? "Sending..." : "Send Message"}
                    className="pointer animate radius8"
                    disabled={status.loading}
                    style={{ maxWidth: "220px" }}
                  />
                </SumbitWrapper>
              {status.message && (
                <p
                  style={{
                    marginTop: "10px",
                    color: status.message.includes("successfully")
                      ? "green"
                      : "red",
                  }}
                >
                  {status.message}
                </p>
              )}
            </div>
            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 flex">
              <div style={{ width: "50%" }} className="flexNullCenter flexColumn">
                <ContactImgBox>
                  <img src={ContactImg1} alt="office" className="radius6" />
                </ContactImgBox>
                <ContactImgBox>
                  <img src={ContactImg2} alt="office" className="radius6" />
                </ContactImgBox>
              </div>
              <div style={{ width: "50%" }}>
                <div style={{ marginTop: "100px" }}>
                  <img src={ContactImg3} alt="office" className="radius6" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  width: 100%;
`;
const HeaderInfo = styled.div`
  padding: 70px 0 30px 0;
  @media (max-width: 860px) {
    text-align: center;
  }
`;
const Form = styled.form`
  padding: 70px 0 30px 0;
  input,
  textarea {
    width: 100%;
    background-color: transparent;
    border: 0px;
    outline: none;
    box-shadow: none;
    border-bottom: 1px solid #707070;
    height: 30px;
    margin-bottom: 10px;
  }
  textarea {
    min-height: 100px;
  }
  @media (max-width: 860px) {
    padding: 30px 0;
  }
`;
const ButtonInput = styled.input`
  border: 1px solid #7620ff;
  background-color: #7620ff;
  width: 100%;
  padding: 15px;
  outline: none;
  color: #fff;
  :hover {
    background-color: #580cd2;
    border: 1px solid #7620ff;
    color: #fff;
  }
  @media (max-width: 991px) {
    margin: 0 auto;
  }
`;
const ContactImgBox = styled.div`
  max-width: 180px;
  align-self: flex-end;
  margin: 10px 30px 10px 0;
`;
const SumbitWrapper = styled.div`
  @media (max-width: 991px) {
    width: 100%;
    margin-bottom: 50px;
  }
`;
const ErrorMsg = styled.p`
  color: red;
  font-size: 12px;
  margin: -5px 0 10px 0;
`;
