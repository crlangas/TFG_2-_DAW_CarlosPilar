import axios from "axios"; //Import de axios para realizar las peticiones a node js
import { useState } from "react";

type Props = {
  onBack: () => void;
  //Funcion on sucess que se ejecuta cuando el registro es valido
  onSuccess: (user: any) => void;
};

export default function RegisterForm({ onBack, onSuccess }: Props) {
  //logica de recogida de datos y evento submit
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nombre, setNombre] = useState("");
  const [error, setError] = useState("");

  //funcion handle Submit, esta se ejecuta a la vez
  const handleSubmit = (evento: React.FormEvent) => {
    evento.preventDefault();
    setError("");

    //peticion axios al backend
    axios
      .post("/api/register", { email, password, nombre })
      .then((res) => {
        if (res.data.success) {
          console.log("Register of new user OK:", res.data.user);
          onSuccess(res.data.user);
        } else {
          setError(res.data.message);
        }
      })
      .catch((err) => {
        const mensaje = err.response?.data?.message;
        console.error(err);
        setError(mensaje || "Error al registrarse");
      });
  };
  return (
    //formulario de login
    <div className="loginForm">
      <form action="" onSubmit={handleSubmit}>
        <h2 style={{ fontSize: "150%" }}>Crear cuenta</h2>
        {/* muestra un error si no creas la cuenta correctamente */}
        {error && <p style={{ color: "red" }}>{error}</p>}
        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          //evento que va guardando los datos mientras vas escribiendo
          onChange={(e) => setNombre(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Registrarse</button>
        {/* boton para volver atras */}
        <button onClick={onBack}>Volver</button>
      </form>
    </div>
  );
}
