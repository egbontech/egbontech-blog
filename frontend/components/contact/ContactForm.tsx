"use client";
import axios from "@/axios";
import React, { useState } from "react";

interface InputState {
  name: string;
  subject: string;
  email: string;
  error_list: {
    name: string;
    subject: string;
    email: string;
  }; // Assuming error_list can be an array of any type
}

const ContactForm = () => {
  const [messageError, setMessageError] = useState("");
  const [buttonLoading, setButtonLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [input, setInput] = useState<InputState>({
    name: "",
    subject: "",
    email: "",
    error_list: {
      name: "",
      subject: "",
      email: "",
    },
  });

  const generateEmptyErrorList = (errorList: any) => {
    const emptyErrorList: any = {};
    Object.keys(errorList).forEach((key) => {
      emptyErrorList[key] = "";
    });
    return emptyErrorList;
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.persist();
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleDesc = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value; // Access the value of the textarea
    setMessage(newText);
  };

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setButtonLoading(true);

    const data = {
      name: input.name,
      subject: input.subject,
      email: input.email,
      message: message,
    };

    try {
      axios
        .post("new-message", data)
        .then((res) => {
          if (res.data?.status === 200) {
            setInput({
              ...input,
              subject: "",
              name: "",
              email: "",
              error_list: generateEmptyErrorList(input.error_list),
            });
            setMessage("");
            setSuccessMessage("Message sent");
            setTimeout(() => {
              setSuccessMessage("");
            }, 4000);
          } else {
            setInput({ ...input, error_list: res.data.error });
            setMessageError(res.data?.error.message);
          }
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setButtonLoading(false);
        });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form className="form-container" onSubmit={submitForm}>
      <h2>Get in touch</h2>
      <div className="input-container">
        <input
          type="text"
          placeholder="Name"
          value={input.name}
          onChange={handleInput}
          name="name"
        />
        <p style={{ fontSize: ".8rem", color: "#dc143c" }}>
          {input.error_list.name}
        </p>
      </div>
      <div className="input-container">
        <input
          type="text"
          placeholder="Subject"
          value={input.subject}
          onChange={handleInput}
          name="subject"
        />
        <p style={{ fontSize: ".8rem", color: "#dc143c" }}>
          {input.error_list.subject}
        </p>
      </div>
      <div className="input-container">
        <input
          type="text"
          placeholder="Email(optional)"
          value={input.email}
          onChange={handleInput}
          name="email"
        />
        <p style={{ fontSize: ".8rem", color: "#dc143c" }}>
          {input.error_list.email}
        </p>
      </div>
      <div className="input-container">
        <textarea
          id=""
          placeholder="Message"
          value={message}
          onChange={handleDesc}
        ></textarea>
        <p style={{ fontSize: ".8rem", color: "#dc143c" }}>{messageError}</p>
      </div>
      <div className="button-container">
        {buttonLoading ? (
          <button>Sending...</button>
        ) : (
          <button>Send Message</button>
        )}
      </div>
      <p style={{ color: "green" }}>{successMessage}</p>
    </form>
  );
};

export default ContactForm;
