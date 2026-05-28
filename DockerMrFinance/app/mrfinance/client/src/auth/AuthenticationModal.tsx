import axios from "axios";
import { useEffect, useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// ─── Tipos ───────────────────────────────────────────────────────────────────

type Props = {
  /** Si es true el modal está abierto */
  open: boolean;
  /** Email del usuario que está verificando */
  email: string;
  /** Llamada cuando el código es correcto, recibe el objeto user */
  onSuccess: (user: any) => void;
  /** Llamada cuando se agotan los 3 intentos o se cierra */
  onCancel: () => void;
};

const MAX_INTENTOS = 3;
const LONGITUD_CODIGO = 4;

// ─── Componente ──────────────────────────────────────────────────────────────

export function AutenticationModal({
  open,
  email,
  onSuccess,
  onCancel,
}: Props) {
  // Estado del código: array de 4 dígitos individuales
  const [digitos, setDigitos] = useState<string[]>(
    Array(LONGITUD_CODIGO).fill("")
  );
  const [intentosRestantes, setIntentosRestantes] = useState(MAX_INTENTOS);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [shake, setShake] = useState(false);
  const [bloqueado, setBloqueado] = useState(false);

  // Refs para los inputs (focus automático)
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Reiniciar estado cuando el modal se abre
  useEffect(() => {
    if (open) {
      setDigitos(Array(LONGITUD_CODIGO).fill(""));
      setIntentosRestantes(MAX_INTENTOS);
      setError("");
      setLoading(false);
      setShake(false);
      setBloqueado(false);
      // Foco al primer input tras montar
      setTimeout(() => inputRefs.current[0]?.focus(), 100);
    }
  }, [open]);

  // ── Lógica de inputs ──────────────────────────────────────────────────────

  function handleDigito(index: number, valor: string) {
    // Solo dígitos
    if (!/^\d*$/.test(valor)) return;

    const nuevo = [...digitos];
    nuevo[index] = valor.slice(-1); // máximo un carácter
    setDigitos(nuevo);

    // Avanzar al siguiente input si hay valor
    if (valor && index < LONGITUD_CODIGO - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    // Verificar automáticamente cuando se rellena el último dígito
    if (index === LONGITUD_CODIGO - 1 && valor) {
      handleVerificar([...nuevo]);
    }
  }

  function handleKeyDown(index: number, e: React.KeyboardEvent) {
    if (e.key === "Backspace" && !digitos[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    if (e.key === "ArrowRight" && index < LONGITUD_CODIGO - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  }

  // Pegar código completo desde el portapapeles
  function handlePaste(e: React.ClipboardEvent) {
    const pegado = e.clipboardData.getData("text").replace(/\D/g, "");
    if (pegado.length === LONGITUD_CODIGO) {
      e.preventDefault();
      const nuevo = pegado.split("").slice(0, LONGITUD_CODIGO);
      setDigitos(nuevo);
      inputRefs.current[LONGITUD_CODIGO - 1]?.focus();
      handleVerificar(nuevo);
    }
  }

  // ── Lógica de verificación ────────────────────────────────────────────────

  async function handleVerificar(codigoArr: string[] = digitos) {
    const codigo = codigoArr.join("");
    if (codigo.length < LONGITUD_CODIGO) {
      setError("Introduce los 4 dígitos del código.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await axios.post("/api/verify-2fa", { email, codigo });

      if (res.data.success) {
        onSuccess(res.data.user);
      }
      // El servidor actual siempre devuelve 401 en fallo,
      // así que el else aquí es de seguridad por si cambia el comportamiento
    } catch (err: any) {
      if (err.response?.status === 401 || err.response?.status === 400) {
        // Código incorrecto o expirado → bajar el contador
        const nuevosIntentos = intentosRestantes - 1;
        setIntentosRestantes(nuevosIntentos);

        // Efecto de agitar al poner mal el código.
        setShake(true);
        setTimeout(() => setShake(false), 500);

        // Limpiar inputs y volver al foco inicial
        setDigitos(Array(LONGITUD_CODIGO).fill(""));
        setTimeout(() => inputRefs.current[0]?.focus(), 50);

        if (nuevosIntentos <= 0) {
          setBloqueado(true);
          setError("Has agotado los 3 intentos. Vuelve a iniciar sesión.");
          setTimeout(() => onCancel(), 2000);
        } else {
          setError(
            err.response?.data?.message ||
              `Código incorrecto. Te quedan ${nuevosIntentos} intento${nuevosIntentos === 1 ? "" : "s"}.`
          );
        }
      } else {
        // Error de red real (sin respuesta del servidor)
        setError("Error de conexión. Inténtalo de nuevo.");
      }
    } finally {
      setLoading(false);
    }
  }

  // ── Render ────────────────────────────────────────────────────────────────

  const codigoCompleto = digitos.every((d) => d !== "");

  return (
    <Dialog open={open} onOpenChange={(o) => { if (!o && !loading && !bloqueado) onCancel(); }}>
      <DialogContent className="sm:max-w-sm select-none">
        {/* ── Cabecera ── */}
        <DialogHeader className="items-center text-center gap-3">
          {/* Icono de escudo */}
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-7 w-7 text-primary"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
          </div>

          <DialogTitle className="text-xl font-semibold">
            Verificación en dos pasos
          </DialogTitle>
          <DialogDescription className="text-sm leading-relaxed">
            Hemos enviado un código de{" "}
            <strong>{LONGITUD_CODIGO} dígitos</strong> a{" "}
            <span className="font-medium text-foreground">{email}</span>.
            Introdúcelo para continuar.
          </DialogDescription>
        </DialogHeader>

        {/* ── Inputs de dígitos ── */}
        <div
          className={`flex justify-center gap-3 py-2 transition-transform ${
            shake ? "animate-[shake_0.4s_ease-in-out]" : ""
          }`}
          style={
            shake
              ? {
                  animation: "shake 0.4s ease-in-out",
                }
              : {}
          }
        >
          {digitos.map((digito, i) => (
            <input
              key={i}
              ref={(el) => {
                inputRefs.current[i] = el;
              }}
              id={`codigo-digito-${i}`}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digito}
              disabled={loading || bloqueado}
              onChange={(e) => handleDigito(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              onPaste={handlePaste}
              className={[
                "h-14 w-12 rounded-xl border-2 bg-background text-center text-2xl font-bold",
                "outline-none transition-all duration-150",
                "focus:border-primary focus:ring-2 focus:ring-primary/20",
                digito
                  ? "border-primary/60 text-primary"
                  : "border-border text-foreground",
                loading || bloqueado ? "cursor-not-allowed opacity-50" : "",
              ].join(" ")}
            />
          ))}
        </div>

        {/* ── Indicador de intentos ── */}
        <div className="flex items-center justify-center gap-2">
          {Array.from({ length: MAX_INTENTOS }).map((_, i) => (
            <div
              key={i}
              className={[
                "h-2 w-2 rounded-full transition-all duration-300",
                i < intentosRestantes
                  ? "bg-primary scale-100"
                  : "bg-muted-foreground/30 scale-75",
              ].join(" ")}
            />
          ))}
          <span className="ml-1 text-xs text-muted-foreground">
            {intentosRestantes === MAX_INTENTOS
              ? `${MAX_INTENTOS} intentos`
              : `${intentosRestantes} intento${intentosRestantes === 1 ? "" : "s"} restante${intentosRestantes === 1 ? "" : "s"}`}
          </span>
        </div>

        {/* ── Mensaje de error ── */}
        {error && (
          <p
            className={[
              "rounded-lg px-3 py-2 text-center text-sm font-medium",
              bloqueado
                ? "bg-red-300/20 text-red-600"
                : "bg-amber-50 text-amber-700 dark:bg-red-200/20 dark:text-red-600",
            ].join(" ")}
          >
            {error}
          </p>
        )}

        {/* ── Botones ── */}
        <div className="flex flex-col gap-2">
          <button
            id="btn-verificar"
            type="button"
            disabled={!codigoCompleto || loading || bloqueado}
            onClick={() => handleVerificar()}
            className="w-full rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg
                  className="h-4 w-4 animate-spin"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8z"
                  />
                </svg>
                Verificando…
              </span>
            ) : (
              "Verificar código"
            )}
          </button>

          <button
            id="btn-cancelar-2fa"
            type="button"
            disabled={loading}
            onClick={onCancel}
            className="w-full rounded-xl px-4 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted disabled:cursor-not-allowed"
          >
            Cancelar y volver al inicio
          </button>
        </div>
      </DialogContent>

      {/* Animación shake inline */}
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20%       { transform: translateX(-6px); }
          40%       { transform: translateX(6px); }
          60%       { transform: translateX(-4px); }
          80%       { transform: translateX(4px); }
        }
      `}</style>
    </Dialog>
  );
}
