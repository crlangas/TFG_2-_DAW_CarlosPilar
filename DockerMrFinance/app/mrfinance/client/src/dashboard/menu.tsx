import { RiPieChartLine, RiUserLine, RiAddCircleLine } from "@remixicon/react";

type Props = {
  onSelect: (view: "main" | "add-funds" | "account-info" ) => void;
};

export default function Menu({ onSelect }: Props) {
  return (
    // 'group' enables child elements to react when the aside is hovered
    // 'w-20 hover:w-64' creates the expansion effect
    // 'relative' ensures it pushes the main content instead of floating over it
    <aside className="group relative z-40 hidden md:flex flex-col h-screen w-16 hover:w-64 transition-all duration-300 ease-in-out bg-[#f6f3f2] dark:bg-stone-900 border-r border-stone-200 dark:border-stone-800 overflow-hidden shrink-0">
      <nav className="flex flex-col h-full pt-8">
        <div className="mb-8 px-6 flex items-center h-10 overflow-hidden whitespace-nowrap">
          {/* A small icon or logo could go here, but for now we'll just slide in the text */}
          <h2 className="text-2xl font-black text-black dark:text-white transition-opacity duration-300 opacity-0 group-hover:opacity-100">
            MR FINANCE
          </h2>
        </div>
        
        <div className="flex flex-col space-y-2 px-3">
          <button
            className="flex items-center text-[#4c4546] dark:text-stone-400 p-3 hover:bg-[#e5e2e1] dark:hover:bg-stone-800 transition-all duration-200 rounded-xl w-full"
            onClick={() => onSelect("main")}
          >
            <div className="w-8 flex justify-center shrink-0">
               <RiPieChartLine className="w-6 h-6" />
            </div>
            <span className="font-['Inter'] text-sm font-medium ml-3 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              Portfolio
            </span>
          </button>
          
          <button
            className="flex items-center text-[#4c4546] dark:text-stone-400 p-3 hover:bg-[#e5e2e1] dark:hover:bg-stone-800 transition-all duration-200 rounded-xl w-full"
            onClick={() => onSelect("account-info")}
          >
            <div className="w-8 flex justify-center shrink-0">
               <RiUserLine className="w-6 h-6" />
            </div>
            <span className="font-['Inter'] text-sm font-medium ml-3 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              Info de la Cuenta
            </span>
          </button>

          <button
            className="flex items-center text-[#4c4546] dark:text-stone-400 p-3 hover:bg-[#e5e2e1] dark:hover:bg-stone-800 transition-all duration-200 rounded-xl w-full"
            onClick={() => onSelect("add-funds")}
          >
            <div className="w-8 flex justify-center shrink-0">
               <RiAddCircleLine className="w-6 h-6" />
            </div>
            <span className="font-['Inter'] text-sm font-medium ml-3 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              Añadir movimientos
            </span>
          </button>
        </div>
      </nav>
    </aside>
  );
}
