import React from "react";
import styled from "styled-components";
import useContact from "../../../hooks/useContact";

export default function Contact() {
  const { register, handleSubmit, onSubmit, errors, status } = useContact();

  return (
    <Wrapper id="contact">
      <div className="lightBg">
        <div className="container">
          <HeaderInfo>
            <h1 className="font40 extraBold">Let's get in touch</h1>
            <p className="font13" style={{ maxWidth: "700px" }}>
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
              nonumy eirmod tempor invidunt ut <br />
              labore et dolore magna aliquyam erat, sed diam voluptua.
            </p>
          </HeaderInfo>
          <div className="row" style={{ paddingBottom: "30px" }}>
            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
              <Form id="contactForm" onSubmit={handleSubmit(onSubmit)}>
                <label className="font13">Full name:</label>
                <input type="text" {...register("name")} className="font20" />
                {errors.name && <ErrorMsg>{errors.name.message}</ErrorMsg>}

                <label className="font13">Email:</label>
                <input type="email" {...register("email")} className="font20" />
                {errors.email && <ErrorMsg>{errors.email.message}</ErrorMsg>}

                <label className="font13">Subject:</label>
                <input type="text" {...register("subject")} className="font20" />
                {errors.subject && (
                  <ErrorMsg>{errors.subject.message}</ErrorMsg>
                )}

                <label className="font13">Message:</label>
                <textarea {...register("message")} className="font20" />
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
                <MapFrame
                  title="map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3277.81099337283!2d10.7792828!3d34.760353699999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1301d294e24298a7%3A0x9b66c8f1ae65dd0b!2sINNOVATION%202!5e0!3m2!1sfr!2stn!4v1756051215082!5m2!1sfr!2stn"
                  loading="lazy"
                />
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}

/* Styled Components */
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

/* --- Pretty Map --- */
const MapFrame = styled.iframe`
  width: 100%;
  height: 450px;
  border: none;
  border-radius: 20px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.02);
  }

  @media (max-width: 768px) {
    height: 300px;
  }
`;
