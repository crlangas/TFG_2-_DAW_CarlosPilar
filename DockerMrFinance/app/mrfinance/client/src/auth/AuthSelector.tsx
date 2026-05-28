type Props = {
  onSelect: (view: "login" | "register") => void
}

export default function AuthSelector({ onSelect }: Props) {
  return (
    // muestra los botones de login y registrar, cada uno te lleva a una vista 
    <div className="loginForm">
      <button onClick={() => onSelect("login")}>Iniciar sesión</button>
      <button onClick={() => onSelect("register")}>Crear cuenta</button>
    </div>
  )
}