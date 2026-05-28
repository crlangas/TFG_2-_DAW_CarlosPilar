import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";
import Menu from "./menu";
import { useState, useEffect } from "react";
import axios from "axios";
import Cabecera from "./cabecera";

type Props = {
  user: any;
  onLogout: () => void;
  setCurrentView: (view: "main" | "add-funds" | "account-info") => void;
};

//funcion añadir fondos
export default function AddFunds({ user, onLogout, setCurrentView }: Props) {
  const [esGasto, setEsGasto] = useState(false);
  const [monto, setMonto] = useState<number | "">("");
  const [fecha, setFecha] = useState(new Date().toISOString().split("T")[0]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] =
    useState<string>("");
  const [categoriaNombre, setCategoriaNombre] = useState("");
  const [categorias, setCategorias] = useState<any[]>([]);

  // Mensajes de feedback para el formulario de movimiento
  const [movMsg, setMovMsg] = useState("");
  const [movError, setMovError] = useState("");
  const [movLoading, setMovLoading] = useState(false);

  // Mensajes de feedback para el formulario de categoría
  const [catMsg, setCatMsg] = useState("");
  const [catError, setCatError] = useState("");
  const [catLoading, setCatLoading] = useState(false);

  // Cargar categorías al montar el componente
  useEffect(() => {
    fetchCategorias();
  }, []);

  async function fetchCategorias() {
    try {
      const response = await axios.post("/api/categorias/list", {
        data: { userId: user.id, pass: user.pass },
      });
      if (response.data.success) {
        setCategorias(response.data.categorias);
      }
    } catch (error) {
      console.error("Error al obtener categorías:", error);
    }
  }

  // Enviar el formulario de movimiento
  async function handleSubmitMovimiento(e: React.FormEvent) {
    e.preventDefault();
    setMovMsg("");
    setMovError("");

    if (monto === "" || monto <= 0) {
      setMovError("El monto debe ser mayor que 0");
      return;
    }

    if (!categoriaSeleccionada) {
      setMovError("Debes seleccionar una categoría");
      return;
    }

    setMovLoading(true);

    try {
      const response = await axios.post("/api/add-movimiento", {
        userId: user.id,
        pass: user.pass,
        tipo: esGasto ? "gasto" : "ingreso",
        monto: monto,
        fecha: fecha,
        id_categoria: categoriaSeleccionada || null,
      });

      if (response.data.success) {
        setMovMsg("Movimiento guardado correctamente");
        // Resetear el formulario
        setMonto("");
        setEsGasto(false);
        setFecha(new Date().toISOString().split("T")[0]);
        setCategoriaSeleccionada("");
      } else {
        setMovError(response.data.message);
      }
    } catch (error: any) {
      console.error("Error al guardar movimiento:", error);
      setMovError(
        error.response?.data?.message || "Error al guardar el movimiento",
      );
    } finally {
      setMovLoading(false);
    }
  }

  // Enviar el formulario de categoría
  async function handleSubmitCategoria(e: React.FormEvent) {
    e.preventDefault();
    setCatMsg("");
    setCatError("");

    if (!categoriaNombre.trim()) {
      setCatError("El nombre de la categoría es obligatorio");
      return;
    }

    setCatLoading(true);

    try {
      const response = await axios.post("/api/categorias", {
        nombre: categoriaNombre,
        userId: user.id,
        pass: user.pass,
      });

      if (response.data.success) {
        setCatMsg(`Categoría "${response.data.categoria.nombre}" añadida`);
        setCategoriaNombre("");
        // Recargar categorías para que aparezca la nueva en el select
        fetchCategorias();
      } else {
        setCatError(response.data.message);
      }
    } catch (error: any) {
      console.error("Error al añadir categoría:", error);
      setCatError(
        error.response?.data?.message || "Error al añadir la categoría",
      );
    } finally {
      setCatLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-stone-950">
      <Menu onSelect={setCurrentView} />

      {/* Contenido Principal */}
      <div className="flex-1 p-8 overflow-x-hidden w-full transition-all duration-300 flex flex-col items-center">
        <div className="w-full max-w-5xl flex flex-col gap-2">
          {/* encabezado de la pagina hecho con un componente llamado cabecera */}
          <Cabecera onLogout={onLogout} setCurrentView={setCurrentView} />

          {/* contenido específico de Add Funds, formulario para añadir fondos */}
          <Card>
            <CardHeader className="px-8 py-6">
              <h1 className="text-2xl font-bold">
                ¿Preparado para gestionar tus gastos?
              </h1>
            </CardHeader>
            <CardContent>
              {/* Mensajes de feedback del movimiento */}
              {movMsg && (
                <p className="mb-4 p-3 bg-green-100 text-green-800 rounded-lg">
                  {movMsg}
                </p>
              )}
              {movError && (
                <p className="mb-4 p-3 bg-red-100 text-red-800 rounded-lg">
                  {movError}
                </p>
              )}
              <form onSubmit={handleSubmitMovimiento}>
                <fieldset className="flex flex-col items-center justify-center gap-6 bg-white border border-black rounded-lg p-4 text-3xl w-full h-40 mb-4">
                  <div className="flex items-center justify-center gap-2">
                    <span id="negativo" className={esGasto ? "" : "hidden"}>
                      -
                    </span>
                    <div className="border-b-2 border-black">
                      <input
                        type="number"
                        name="monto"
                        id="monto"
                        className="outline-none text-center bg-transparent w-full"
                        value={monto}
                        onChange={(e) =>
                          setMonto(
                            e.target.value === "" ? "" : Number(e.target.value),
                          )
                        }
                      />
                    </div>
                  </div>
                  <div className="flex flex-row gap-10 justify-center text-xl">
                    <button
                      type="button"
                      className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200"
                      onClick={() =>
                        setMonto((prev) => (prev === "" ? 10 : prev + 10))
                      }
                    >
                      +10
                    </button>
                    <button
                      type="button"
                      className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200"
                      onClick={() =>
                        setMonto((prev) =>
                          prev === "" ? 0 : Math.max(0, prev - 10),
                        )
                      }
                    >
                      -10
                    </button>
                    <button
                      type="button"
                      className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 hidden md:block"
                      onClick={() =>
                        setMonto((prev) => (prev === "" ? 100 : prev + 100))
                      }
                    >
                      +100
                    </button>
                    <button
                      type="button"
                      className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 hidden md:block"
                      onClick={() =>
                        setMonto((prev) =>
                          prev === "" ? 0 : Math.max(0, prev - 100),
                        )
                      }
                    >
                      -100
                    </button>
                  </div>
                </fieldset>
                <fieldset className="grid grid-cols-1 items-center gap-10 bg-white border border-black rounded-lg p-4 w-full  justify-center  mb-4">
                  <div className="block">
                    <label htmlFor="tipo">Tipo de movimiento</label>
                    <select
                      className="block appearance-none w-50 bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      name="tipo"
                      id="tipo"
                      /* logica que escucha el cambio de tipo y pone un menos en el monto */
                      onChange={(e) => {
                        setEsGasto(e.target.value === "0");
                      }}
                    >
                      <option value="1">Ingreso</option>
                      <option value="0">Gasto</option>
                    </select>
                  </div>
                  <div className="block">
                    <label htmlFor="categorias">Categoría</label>
                    <select
                      name="categorias"
                      id="categorias"
                      className="block appearance-none w-50 bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      value={categoriaSeleccionada}
                      onChange={(e) => setCategoriaSeleccionada(e.target.value)}
                    >
                      <option value="" disabled>
                        Selecciona una categoría
                      </option>
                      {categorias.map((cat: any) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.nombre}
                        </option>
                      ))}
                    </select>
                  </div>
                </fieldset>
                <fieldset className="grid grid-cols-1 items-center gap-10 bg-white border border-black rounded-lg p-4 w-full h-40 justify-center  mb-4">
                  <div className="block">
                    <label htmlFor="fecha">Fecha :</label>
                    <input
                      type="date"
                      name="fecha"
                      id="fecha"
                      value={fecha}
                      onChange={(e) => setFecha(e.target.value)}
                    />
                  </div>
                </fieldset>
                <fieldset className="grid grid-cols-2 items-center gap-10 bg-white border border-black rounded-lg p-4 w-full h-40 justify-center  mb-4">
                  <button
                    type="submit"
                    disabled={movLoading}
                    className="px-4 py-2 bg-black text-white font-medium rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50"
                  >
                    {movLoading ? "Guardando..." : "Guardar movimiento"}
                  </button>
                  <button
                    type="reset"
                    className="px-4 py-2 bg-gray-200 text-black font-medium rounded-lg hover:bg-gray-300 transition-colors"
                    onClick={() => {
                      setMonto("");
                      setEsGasto(false);
                      setFecha(new Date().toISOString().split("T")[0]);
                      setCategoriaSeleccionada("");
                      setMovMsg("");
                      setMovError("");
                    }}
                  >
                    Cancelar
                  </button>
                </fieldset>
              </form>
            </CardContent>
            <CardFooter>
              <div className="flex flex-col w-full gap-4">
                <h2 className="text-xl font-bold">Añadir categorías</h2>
                {/* Mensajes de feedback de categoría */}
                {catMsg && (
                  <p className="p-3 bg-green-100 text-green-800 rounded-lg">
                    {catMsg}
                  </p>
                )}
                {catError && (
                  <p className="p-3 bg-red-100 text-red-800 rounded-lg">
                    {catError}
                  </p>
                )}
                <form onSubmit={handleSubmitCategoria} className="w-full">
                  <fieldset className="flex flex-col sm:flex-row items-end gap-6 bg-white border border-black rounded-lg p-6 w-full justify-between  mb-4">
                    <div className="flex flex-col gap-2 w-full flex-1">
                      <label
                        htmlFor="categoria_nombre"
                        className="font-medium text-gray-700"
                      >
                        Nombre categoría
                      </label>
                      <input
                        type="text"
                        name="categoria_nombre"
                        id="categoria_nombre"
                        className="border-b-2 border-black outline-none bg-transparent py-1 text-lg"
                        placeholder="Ej. Alimentación"
                        value={categoriaNombre}
                        onChange={(e) => setCategoriaNombre(e.target.value)}
                      />
                    </div>
                    <div className="flex flex-row justify-between w-full">
                      <button
                        type="submit"
                        disabled={catLoading}
                        className="px-4 py-2 bg-black text-white font-medium rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50"
                      >
                        {catLoading ? "Añadiendo..." : "Añadir categoría"}
                      </button>
                      <button
                        type="reset"
                        className="px-4 py-2 bg-gray-200 text-black font-medium rounded-lg hover:bg-gray-300 transition-colors"
                        onClick={() => {
                          setCategoriaNombre("");
                          setCatMsg("");
                          setCatError("");
                        }}
                      >
                        Cancelar
                      </button>
                    </div>
                  </fieldset>
                </form>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
