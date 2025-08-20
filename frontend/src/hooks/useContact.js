// src/hooks/useContact.js
import { useState } from "react";
import axios from "axios";
import { ContactApi } from "../api/contact";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// ✅ Validation schema
const schema = yup.object().shape({
  name: yup.string().required("Full name is required"),
  email: yup.string().email("Invalid email format").required("Email is required"),
  subject: yup.string().required("Subject is required"),
  message: yup.string().min(10, "Message must be at least 10 characters").required("Message is required"),
});

export default function useContact() {
  const [status, setStatus] = useState({ loading: false, message: "" });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  // Submit logic
  const onSubmit = async (data) => {
    setStatus({ loading: true, message: "Sending..." });
    try {
      const res = await axios.post(ContactApi.contact, data);
      setStatus({ loading: false, message: res.data.message });
      reset();
    } catch (err) {
      setStatus({
        loading: false,
        message: err.response?.data?.error || "Something went wrong",
      });
    }
  };

  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
    status,
  };
}
