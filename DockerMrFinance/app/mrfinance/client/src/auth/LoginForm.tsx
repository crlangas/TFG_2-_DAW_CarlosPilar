import axios from "axios";
import { useState } from "react";
import { AutenticationModal } from "./AuthenticationModal";

type Props = {
  onBack: () => void;
  onSuccess: (user: any) => void;
};

export default function LoginForm({ onBack, onSuccess }: Props) {
  //toda la logica del login
  //aqui guarda los fatos de email pass...
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Estado para el modal 2FA
  const [modal2fa, setModal2fa] = useState(false);
  const [email2fa, setEmail2fa] = useState("");

  //funcion handleSubmit que se ejecuta al hacer submit en el form de login
  const handleSubmit = (evento: React.FormEvent) => {
    //evita que se recargue la pagina
    evento.preventDefault();
    setError("");

    //peticion axios al backend
    axios
      .post("/api/login", { email, password })
      .then((res) => {
        if (res.data.success && res.data.requires2fa) {
          // El servidor ha enviado el código al correo → abrir modal 2FA
          setEmail2fa(res.data.email);
          setModal2fa(true);
        } else if (res.data.success) {
          // Login directo sin 2FA
          onSuccess(res.data.user);
        } else {
          setError(res.data.message);
        }
      })
      .catch((err) => {
        console.error(err);
        setError("No se pudo iniciar sesion porfavor vuelve a intentarlo");
      });
  };

  // Cancelar 2FA → volver al formulario limpio
  function handleCancel2fa() {
    setModal2fa(false);
    setEmail2fa("");
    setPassword("");
    setError("");
  }

  return (
    <>
      <div className="loginForm">
        <form onSubmit={handleSubmit}>
          <h2 style={{ fontSize: "150%" }}>Iniciar sesión</h2>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <input
            type="email"
            placeholder="Email"
            value={email}
            //aqui recoje el valor de el input y lo guarda con la funcion setEmail
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Entrar</button>
          <button type="button" onClick={onBack}>
            Volver
          </button>
        </form>
      </div>

      {/* Modal de verificación 2FA */}
      <AutenticationModal
        open={modal2fa}
        email={email2fa}
        onSuccess={(user) => {
          setModal2fa(false);
          onSuccess(user);
        }}
        onCancel={handleCancel2fa}
      />
    </>
  );
}