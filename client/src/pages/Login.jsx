import axios from "axios";
import { useState } from "react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const submit = async (e) => {
    e.preventDefault();
    await axios.post(`${API_URL}/api/inquiries`, form);
    alert("Inquiry sent");
  };

  return (
    <form onSubmit={submit} className="max-w-xl mx-auto p-10 space-y-4">
      <input placeholder="Name" onChange={e=>setForm({...form,name:e.target.value})} />
      <input placeholder="Email" onChange={e=>setForm({...form,email:e.target.value})} />
      <textarea placeholder="Message" onChange={e=>setForm({...form,message:e.target.value})} />
      <button className="bg-green-600 text-white px-4 py-2">Send</button>
    </form>
  );
};

export default Contact;
