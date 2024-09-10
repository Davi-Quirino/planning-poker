import React, { useState } from "react";

interface UserFormProps {
  onSubmit: (name: string, role: string) => void;
}

const UserForm: React.FC<UserFormProps> = ({ onSubmit }) => {
  const [name, setName] = useState("");
  const [role, setRole] = useState("developer");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(name, role);
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: "flex", flexDirection: "column" }}
    >
      <label style={{ marginBottom: "10px" }}>
        Seu nome:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={{ marginLeft: "10px" }}
        />
      </label>
      <label style={{ marginBottom: "10px" }}>
        Role:
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          style={{ marginLeft: "10px" }}
        >
          <option value="developer">Developer</option>
          <option value="qa">QA</option>
          <option value="spectator">Spectator</option>
        </select>
      </label>
      <button type="submit">Entrar</button>
    </form>
  );
};

export default UserForm;
