import axios from "axios";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// ─── Tipos ───────────────────────────────────────────────────────────────────

type Categoria = {
  id: number;
  nombre: string;
};

type Movimiento = {
  id: number;
  tipo: "gasto" | "ingreso";
  monto: number;
  fecha: string;
  id_categoria: number | null;
  concepto: string;
  categoria_nombre?: string;
};

type Props = {
  /** Si es true el modal está abierto */
  open: boolean;
  /** Objeto usuario con id y pass para autenticar las peticiones */
  user: { id: number; pass: string };
  /** Movimiento que se va a editar (se usa para pre-rellenar el formulario) */
  movimiento: Movimiento | null;
  /** Llamada cuando el movimiento se ha guardado correctamente */
  onSuccess: () => void;
  /** Llamada cuando se cancela o se cierra el modal */
  onCancel: () => void;
};

// ─── Componente ──────────────────────────────────────────────────────────────

export function EditarModal({
  open,
  user,
  movimiento,
  onSuccess,
  onCancel,
}: Props) {
  // ── Estado del formulario ─────────────────────────────────────────────────
  const [tipo, setTipo] = useState<"gasto" | "ingreso">("gasto");
  const [monto, setMonto] = useState("");
  const [fecha, setFecha] = useState("");
  const [idCategoria, setIdCategoria] = useState<number | "">("");
  const [concepto, setConcepto] = useState("");

  // ── Estado UI ─────────────────────────────────────────────────────────────
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingCategorias, setLoadingCategorias] = useState(false);
  const [error, setError] = useState("");

  // ── Pre-rellenar formulario cuando se abre el modal ───────────────────────
  useEffect(() => {
    if (open && movimiento) {
      setTipo(movimiento.tipo);
      setMonto(String(movimiento.monto));
      // La fecha viene como ISO string → solo la parte YYYY-MM-DD
      setFecha(movimiento.fecha ? movimiento.fecha.split("T")[0] : "");
      setIdCategoria(movimiento.id_categoria ?? "");
      setConcepto(movimiento.concepto ?? "");
      setError("");
      cargarCategorias();
    }
  }, [open, movimiento]);

  // ── Carga de categorías del usuario ───────────────────────────────────────
  async function cargarCategorias() {
    setLoadingCategorias(true);
    try {
      const res = await axios.post("/api/categorias/list", {
        data: { userId: user.id, pass: user.pass },
      });
      if (res.data.success) {
        setCategorias(res.data.categorias);
      }
    } catch (err) {
      console.error("Error al cargar categorías:", err);
    } finally {
      setLoadingCategorias(false);
    }
  }

  // ── Guardar cambios ───────────────────────────────────────────────────────
  async function handleGuardar() {
    if (!monto || Number(monto) <= 0) {
      setError("El monto debe ser mayor que 0.");
      return;
    }
    if (!fecha) {
      setError("Debes indicar una fecha.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await axios.post("/api/mod-movimiento", {
        userId: user.id,
        pass: user.pass,
        movimientoId: movimiento!.id,
        tipo,
        monto: Number(monto),
        fecha,
        id_categoria: idCategoria !== "" ? idCategoria : null,
        concepto,
      });

      if (res.data.success) {
        onSuccess();
      }
    } catch (err: any) {
      setError(
        err.response?.data?.message ?? "Error al guardar. Inténtalo de nuevo."
      );
    } finally {
      setLoading(false);
    }
  }

  // ── Render ────────────────────────────────────────────────────────────────

  const inputClass =
    "w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-50";

  const labelClass = "block text-xs font-medium text-muted-foreground mb-1";

  return (
    <Dialog
      open={open}
      onOpenChange={(o) => {
        if (!o && !loading) onCancel();
      }}
    >
      <DialogContent className="sm:max-w-md">
        {/* ── Cabecera ── */}
        <DialogHeader className="items-center text-center gap-3">
          {/* Icono de lápiz */}
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
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
          </div>

          <DialogTitle className="text-xl font-semibold">
            Editar movimiento
          </DialogTitle>
          <DialogDescription className="text-sm leading-relaxed">
            Modifica los campos y pulsa <strong>Guardar cambios</strong>.
          </DialogDescription>
        </DialogHeader>

        {/* ── Campos del formulario ── */}
        <div className="flex flex-col gap-4 py-2">
          {/* Tipo */}
          <div>
            <label htmlFor="edit-tipo" className={labelClass}>
              Tipo
            </label>
            <select
              id="edit-tipo"
              value={tipo}
              onChange={(e) => setTipo(e.target.value as "gasto" | "ingreso")}
              disabled={loading}
              className={inputClass}
            >
              <option value="gasto">Gasto</option>
              <option value="ingreso">Ingreso</option>
            </select>
          </div>

          {/* Monto */}
          <div>
            <label htmlFor="edit-monto" className={labelClass}>
              Monto (€)
            </label>
            <input
              id="edit-monto"
              type="number"
              min="0.01"
              step="0.01"
              value={monto}
              onChange={(e) => setMonto(e.target.value)}
              disabled={loading}
              className={inputClass}
              placeholder="0.00"
            />
          </div>

          {/* Fecha */}
          <div>
            <label htmlFor="edit-fecha" className={labelClass}>
              Fecha
            </label>
            <input
              id="edit-fecha"
              type="date"
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
              disabled={loading}
              className={inputClass}
            />
          </div>

          {/* Categoría */}
          <div>
            <label htmlFor="edit-categoria" className={labelClass}>
              Categoría
            </label>
            <select
              id="edit-categoria"
              value={idCategoria}
              onChange={(e) =>
                setIdCategoria(e.target.value !== "" ? Number(e.target.value) : "")
              }
              disabled={loading || loadingCategorias}
              className={inputClass}
            >
              <option value="">
                {loadingCategorias ? "Cargando…" : "Sin categoría"}
              </option>
              {categorias.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.nombre}
                </option>
              ))}
            </select>
          </div>

          {/* Concepto */}
          <div>
            <label htmlFor="edit-concepto" className={labelClass}>
              Concepto
            </label>
            <input
              id="edit-concepto"
              type="text"
              value={concepto}
              onChange={(e) => setConcepto(e.target.value)}
              disabled={loading}
              className={inputClass}
              placeholder="Descripción del movimiento"
            />
          </div>
        </div>

        {/* ── Mensaje de error ── */}
        {error && (
          <p className="rounded-lg bg-red-100 px-3 py-2 text-center text-sm font-medium text-red-600 dark:bg-red-200/20 dark:text-red-400">
            {error}
          </p>
        )}

        {/* ── Botones ── */}
        <div className="flex flex-col gap-2">
          <button
            id="btn-guardar-edicion"
            type="button"
            disabled={loading}
            onClick={handleGuardar}
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
                Guardando…
              </span>
            ) : (
              "Guardar cambios"
            )}
          </button>

          <button
            id="btn-cancelar-edicion"
            type="button"
            disabled={loading}
            onClick={onCancel}
            className="w-full rounded-xl px-4 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted disabled:cursor-not-allowed"
          >
            Cancelar
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
