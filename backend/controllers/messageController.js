// controllers/messageController.js
import Message from "../models/messageModel.js";
import nodemailer from "nodemailer";

export const sendMessage = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Save in MongoDB
    const newMessage = await Message.create(req.body);

    // Send email using Gmail SMTP
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS
      }
    });

    await transporter.sendMail({
      from: `"${name}" <${email}>`,
      to: process.env.GMAIL_USER, // Your email
      subject: `New Contact: ${subject}`,
      text: message,
      html: `<p><strong>Name:</strong> ${name}</p>
             <p><strong>Email:</strong> ${email}</p>
             <p><strong>Subject:</strong> ${subject}</p>
             <p>${message}</p>`
    });

    res.status(201).json({ success: true, message: "Message sent successfully!" });
  } catch (error) {
    console.error("Send Message Error:", error);
    res.status(500).json({ error: "Server error, try again later." });
  }
};
