
export default function Dashboard(){

  return (
    <div className="fixed top-0 left-0 w-full h-full p-6 pointer-events-none">
      <div className="grid grid-cols-3 gap-4">
        {/* indicador de puntuación */}
        <div className="bg-black/50 backdrop-blur-md border-none text-white p-4 pointer-events-auto">
          <div className="flex justify-between items-center">
            <div className="text-center">
              <div className="text-4xl font-bold">{"8"}</div>
              <div className="text-sm text-blue-400">{"Equipo A"}</div>
            </div>
            <div className="text-2xl">{":"}</div>
            <div className="text-center">
              <div className="text-4xl font-bold">{"8"}</div>
              <div className="text-sm text-blue-400">{"Equipo B"}</div>
            </div>
          </div> 
        </div>

        {/* visualización del temporizador */}
        <div className="bg-black/50 backdrop-blur-md border-none text-white p-4 pointer-events-auto">
          <div className="text-center">
            <div className="text-4xl font-bold">{"2:29"}</div>
            <div className="text-sm text-blue-400">{"TIEMPO RESTANTE"}</div>
          </div>
        </div>

        {/* visualización de estadísticas */}
        <div className="bg-black/50 backdrop-blur-md border-none text-white p-4 pointer-events-auto">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>{"Posesión"}</span>
              <span>{"65%"}</span>
            </div>
            <div className="relative h-2 w-full bg-blue-900/50">
              <div className="absolute h-full bg-blue-400" style={{ width: "65%" }} />
            </div>
            <div className="flex justify-between text-sm">
              <span>{"Tiros"}</span>
              <span>{"12"}</span>
            </div>
            <div className="relative h-2 w-full bg-blue-900/50">
              <div className="absolute h-full bg-blue-400" style={{ width: "75%" }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

}
