import { useState } from "react";
import "./login.css";
import "./App.css";
import AuthSelector from "./auth/AuthSelector";
import LoginForm from "./auth/LoginForm";
import RegisterForm from "./auth/RegisterForm";
import Dashboard from "./dashboard/main";

type View = "selector" | "login" | "register" | "dashboard";

function LoginPage() {
  const [view, setView] = useState<View>("selector");
  const [user, setUser] = useState<any>(null);

  // Función que se ejecuta cuando el login o registro es exitoso y muestra la vista del dash board
  const handleSuccess = (userData: any) => {
    setUser(userData);
    setView("dashboard");
  };

  // Si estamos en el dashboard, mostramos solo el dashboard
  if (view === "dashboard") {
    return (
      <Dashboard
        user={user}
        onLogout={() => {
          setUser(null);
          setView("selector");
        }}
      />
    );
  }

  return (
    <>
      <main>
        <div id="cuerpo">
          {/* el class name s es una media query con taiwind para ocultar el lado negro en movil y tablet */}
          <div className="hidden! lg:flex!">
            <h1>Hello Thrifty</h1>
            <h2>¿Estás preparado para mejorar tu economía?</h2>
          </div>
          <div className="w-full! lg:w-[50%]!">
            <p>Create una cuenta o inicia sesión</p>
            <p>¿Estás preparado para mejorar tu economía de manera gratuita?</p>
            {view === "selector" && <AuthSelector onSelect={setView} />}
            {view === "login" && (
              <LoginForm
                onBack={() => setView("selector")}
                onSuccess={handleSuccess}
              />
            )}
            {view === "register" && (
              <RegisterForm
                onBack={() => setView("selector")}
                onSuccess={handleSuccess}
              />
            )}

            <p id="ayuda">
              Si olvidatste tu contraseña o tienes cualquier problema y no eres
              dueno de esta instalación contacta a noreply.mrfinance@gmail.com
            </p>
          </div>
        </div>
      </main>
    </>
  );
}

export default LoginPage;
