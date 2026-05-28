import axios from "axios"; //Import de axios para realizar las peticiones a node js
import { useState, useEffect, useMemo } from "react";
import "../login.css";
import { ChartAreaInteractive } from "./chart";
import Menu from "./menu";
// import { Card, CardHeader } from "@/components/ui/card";
// import { RiPieChartLine, RiUserLine, RiAddCircleLine } from "@remixicon/react";
import AddFunds from "./addfunds";
import AccountInfo from "./account-info";
import Cabecera from "./cabecera";
import { EditarModal } from "./editarModal";
import { Card } from "@/components/ui/card";

type Props = {
  user: any;
  onLogout: () => void;
};

export default function Dashboard({ user, onLogout }: Props) {
  const [movimientos, setMovimientos] = useState<any[]>([]);

  // Calcular el saldo total de forma dinámica a partir de los movimientos
  const saldo = useMemo(() => {
    return movimientos.reduce((acc, m) => {
      const amount = Number(m.monto) || 0;
      if (
        m.tipo?.toLowerCase().includes("gasto")
      ) {
        return acc - amount;
      } else {
        return acc + amount;
      }
    }, 0);
  }, [movimientos]);

  // Formatear el saldo para una visualización premium con separadores de miles y dos decimales
  const saldoFormateado = saldo.toLocaleString("es-ES", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  // Estado para controlar en qué sección del dashboard estamos:
  const [currentView, setCurrentView] = useState<
    "main" | "add-funds" | "account-info"
  >("main");

  // Estado del modal de edición
  const [modalEditarOpen, setModalEditarOpen] = useState(false);
  const [movimientoEditando, setMovimientoEditando] = useState<any | null>(null);

  const userId = user.id;
  const pass = user.pass;
  //funcion que recoje los datos de los movimientos del usuario para monstrarlos

  // se crea una funcio
  async function catchMovimientos() {
    //se guarda el ud en data para pasarselo a la peticion axios
    const data = {
      userId: userId,
      pass: pass, //se pasa la contraseña con la que has hecho login para que no puedas sacar los movimitos solo con el id y la api sea segura
    };
    try {
      const response = await axios.post("/api/movimientos", data);
      console.log("Datos recibidos:", response.data);
      if (response.data.success) {
        setMovimientos(response.data.movimientos);
      }
    } catch (error) {
      console.error("Error al obtener movimientos:", error);
    }
  }

  // Función para eliminar un movimiento
  async function deleteMovimiento(movimientoId: number) {
    try {
      // lo borra de la bd
      await axios.post("/api/borrar-movimiento", {
        userId,
        pass,
        movimientoId,
      });

      // Actualizamos el estado para quitar el movimiento de la lista visualmente
      setMovimientos((prev) => prev.filter((m) => m.id !== movimientoId));
    } catch (error) {
      console.error("Error al eliminar el movimiento:", error);
    }
  }

  // Función para abrir el modal de edición con el movimiento seleccionado
  function modMovimiento(movimientoId: number) {
    const mov = movimientos.find((m) => m.id === movimientoId);
    if (mov) {
      setMovimientoEditando(mov);
      setModalEditarOpen(true);
    }
  }
  //useEffect que recarga los movimientos cada vez que vuelves a la vista principal
  useEffect(() => {
    if (currentView === "main") {
      catchMovimientos();
    }
  }, [currentView]);

  if (currentView === "add-funds") {
    return (
      <AddFunds
        user={user}
        onLogout={onLogout}
        setCurrentView={setCurrentView}
      />
    );
  }

  if (currentView === "account-info") {
    return (
      <AccountInfo
        user={user}
        onLogout={onLogout}
        setCurrentView={setCurrentView}
      />
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-stone-950">
      <Menu onSelect={setCurrentView} />

      {/* Contenido Principal */}

      <div className="flex-1 p-8 overflow-x-hidden w-full transition-all duration-300 flex flex-col items-center">
        <div className="w-full max-w-5xl flex flex-col gap-2">
          {/* encabezado de la pagina hecho con un componente llamado cabecera*/}
          <Cabecera onLogout={onLogout} setCurrentView={setCurrentView} />
          
          <div className="w-full">
            {/* Tarjeta para Móviles (Centrado) */}
            <Card className="block lg:hidden p-6 bg-white dark:bg-stone-900 border border-gray-150 dark:border-stone-850 shadow-md">
              <p className="text-xs font-semibold text-gray-400 dark:text-stone-500 text-center mb-1 uppercase tracking-wider">
                Saldo
              </p>
              <h1 className="text-5xl text-center font-bold text-gray-900 dark:text-white tracking-tight">
                {saldoFormateado}€
              </h1>
            </Card>

            {/* Tarjeta para Desktop (Alineado a la izquierda con espaciado premium) */}
            <Card className="hidden lg:block p-6 bg-white dark:bg-stone-900 border border-gray-150 dark:border-stone-850 shadow-md">
              <p className="text-xs font-semibold text-gray-400 dark:text-stone-500 text-left mb-1 uppercase tracking-wider">
                Saldo
              </p>
              <h1 className="text-5xl text-left font-bold text-gray-900 dark:text-white tracking-tight">
                {saldoFormateado}€
              </h1>
            </Card>
          </div>
          {/* Aquí mostramos el gráfico interactivo de Shadcn con los movimientos del usuario */}
          <div className="w-full">
            <ChartAreaInteractive
              mov={movimientos}
              setCurrentView={setCurrentView}
            />
            {/* Lista de movimientos */}
            <div className="bg-white p-6 rounded-xl border shadow-sm mt-8">
              <h2 className="text-xl font-semibold mb-4">Tus Movimientos</h2>
              <div className="overflow-y-auto h-[45vh]">
                <ul className="space-y-2">
                  {/* muestra con una funcion ma los movimientos (provisional)*/}

                  {movimientos.length === 0 ? (
                    <p
                      onClick={() => setCurrentView("add-funds")}
                      className="text-gray-500 align-center flex text-1xl sm:text-2xl "
                    >
                      No hay movimientos para mostrar.
                    </p>
                  ) : (
                    movimientos.map((m: any) => (
                      <li
                        key={m.id}
                        className="p-3 border rounded-lg flex justify-between"
                      >
                        <span className="hidden md:inline">
                          {new Date(m.fecha).toLocaleDateString("es-ES", {
                            day: "numeric",
                            month: "short",
                            year: "2-digit",
                          })}{" "}
                          <span className="md:inline hidden">
                            - {m.tipo} - {m.categoria_nombre || "Sin categoría"}
                          </span>
                        </span>
                        <span className="font-semibold">
                          {m.tipo === "gasto" ? `-${m.monto}` : `${m.monto}`}€
                        </span>
                        <span className="flex gap-2 flex-row align-end justify-end">
                          <button
                            onClick={() => modMovimiento(m.id)}
                            className="text-yellow-400 hover:text-yellow-600"
                          >
                            Editar
                          </button>
                          <button
                            onClick={() => deleteMovimiento(m.id)}
                            className="text-red-400 hover:text-red-600"
                          >
                            Eliminar
                          </button>
                        </span>
                      </li>
                    ))
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* ── Modal de edición ── */}
      <EditarModal
        open={modalEditarOpen}
        user={{ id: userId, pass }}
        movimiento={movimientoEditando}
        onSuccess={() => {
          setModalEditarOpen(false);
          setMovimientoEditando(null);
          catchMovimientos(); // recarga la lista
        }}
        onCancel={() => {
          setModalEditarOpen(false);
          setMovimientoEditando(null);
        }}
      />
    </div>
  );
}
