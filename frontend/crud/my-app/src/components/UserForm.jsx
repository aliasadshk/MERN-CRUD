/* eslint-disable react/prop-types */
import { useState } from "react";

const UserForm = ({ addUser }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email) return alert("❌ Name and Email are required!");
    addUser({ name, email });
    setName("");
    setEmail("");
  };

  return (
    <form className="d-flex gap-2 mb-3" onSubmit={handleSubmit}>
      <input
        type="text"
        className="form-control"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="email"
        className="form-control"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button className="btn btn-primary">Add User</button>
    </form>
  );
};

export default UserForm;
