import React, { useState } from "react";

interface UserFormProps {
  onSubmit: (name: string, role: string) => void;
}

const UserForm: React.FC<UserFormProps> = ({ onSubmit }) => {
  const [name, setName] = useState("");
  const [role, setRole] = useState("spectator"); // Valor inicial como "spectator"

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(name, role);
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#000", // Fundo preto
        padding: "20px",
        borderRadius: "10px",
        maxWidth: "400px",
        margin: "auto",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.4)",
      }}
    >
      <label
        style={{
          color: "#fff",
          fontSize: "18px",
          marginBottom: "15px",
          width: "90%",
        }}
      >
        Seu nome:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          placeholder="Digite seu nome"
          style={{
            marginTop: "8px",
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #fff",
            width: "100%",
            backgroundColor: "#333",
            color: "#fff",
          }}
        />
      </label>

      <fieldset
        style={{
          marginBottom: "20px",
          border: "none",
          color: "#fff",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <legend
          style={{
            color: "#fff",
            fontSize: "18px",
            marginBottom: "10px",
          }}
        >
          Escolha seu papel:
        </legend>

        <label
          style={{
            marginBottom: "10px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <input
            type="radio"
            value="spectator"
            checked={role === "spectator"}
            onChange={(e) => setRole(e.target.value)}
            style={{ marginRight: "10px" }}
          />
          <span style={{ color: "#fff" }}>Spectator</span>
        </label>

        <label
          style={{
            marginBottom: "10px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <input
            type="radio"
            value="developer"
            checked={role === "developer"}
            onChange={(e) => setRole(e.target.value)}
            style={{ marginRight: "10px" }}
          />
          <span style={{ color: "#fff" }}>Developer</span>
        </label>

        <label style={{ display: "flex", alignItems: "center" }}>
          <input
            type="radio"
            value="qa"
            checked={role === "qa"}
            onChange={(e) => setRole(e.target.value)}
            style={{ marginRight: "10px" }}
          />
          <span style={{ color: "#fff" }}>QA</span>
        </label>
      </fieldset>

      <button
        type="submit"
        style={{
          padding: "12px",
          borderRadius: "5px",
          border: "none",
          backgroundColor: "#28a745",
          color: "#fff",
          fontSize: "16px",
          cursor: "pointer",
          transition: "background-color 0.3s ease",
        }}
        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#218838")}
        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#28a745")}
      >
        Entrar
      </button>
    </form>
  );
};

export default UserForm;
