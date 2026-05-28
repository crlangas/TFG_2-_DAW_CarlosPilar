import { RiPieChartLine, RiUserLine, RiAddCircleLine } from "@remixicon/react";
import { Card, CardHeader } from "@/components/ui/card";


type Props = {
  onLogout: () => void;
  setCurrentView: (view: "main" | "add-funds" | "account-info") => void;
};

export default function Cabecera({ onLogout, setCurrentView }: Props) {
  return (
    <>
      {/* encabezado de la pagina hecho con una card de shadcn */}
      <Card>
        <CardHeader className="px-8 py-6">
          <div className="flex justify-between items-center w-full">
            <h1 className="text-3xl font-bold items-baseline gap-4 hidden md:flex">
              <span>&nbsp; &nbsp;MR FINANCE</span>
              <span className="text-sm text-gray-500 font-normal">
                redefine tus finanzas
              </span>
            </h1>
            {/* menu de moviles y tablets */}
            <div className="flex md:hidden gap-4 items-center justify-center">
              <button
                onClick={() => setCurrentView("main")}
                className="w-6 h-6"
              >
                <RiPieChartLine className="w-6 h-6" />
              </button>
              <button
                onClick={() => setCurrentView("account-info")}
                className="w-6 h-6"
              >
                <RiUserLine className="w-6 h-6" />
              </button>
              <button
                onClick={() => setCurrentView("add-funds")}
                className="w-6 h-6"
              >
                <RiAddCircleLine className="w-6 h-6" />
              </button>
            </div>
            <div>
                &nbsp; &nbsp;
            </div>
            <span>
              <button
                onClick={onLogout}
                className="px-6 py-2.5 mr-10 bg-black text-white font-medium text-sm rounded-full hover:bg-gray-800 transition-colors shadow-sm"
              >
                Cerrar sesión
              </button>
              
            </span>
          </div>
        </CardHeader>
      </Card>
    </>
  );
}