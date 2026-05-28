"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export const description = "Evolución de saldo"

const chartConfig = {
  saldo: {
    label: "Saldo (€)",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig

export function ChartAreaInteractive({ mov }: { mov: any[], setCurrentView: (view: "main" | "add-funds" | "account-info") => void }) {
  const [timeRange, setTimeRange] = React.useState("90d")

  const chartData = React.useMemo(() => {
    if (!mov || mov.length === 0) return []; //si no hay movimientos, devuelve un array vacio
    
    // Ordenar los movimientos por fecha (de más antiguo a más reciente)
    const sorted = [...mov].sort((a, b) => 
      new Date(a.fecha).getTime() - new Date(b.fecha).getTime()
    ); //copia el array a sorted y ordena por fecha con la funcion sort
    
    let currentSaldo = 0;
    const saldoPorDia = new Map<string, number>();
    
    sorted.forEach((m) => {
      const amount = Number(m.monto);
      // Si el tipo es 'gasto', restamos. Si no, sumamos. 
      // Puedes adaptar esto según cómo llames a los gastos/ingresos en tu BD.
      if (m.tipo?.toLowerCase().includes("gasto") || m.tipo?.toLowerCase().includes("retiro")) {
        currentSaldo -= amount;
      } else {
        currentSaldo += amount;
      }
      
      // Al guardar en un Map por fecha, nos aseguramos de que si hay varios 
      // movimientos el mismo día, se sobrescribe con el saldo final del día.
      saldoPorDia.set(m.fecha, currentSaldo);
    });

    return Array.from(saldoPorDia.entries()).map(([date, saldo]) => ({
      date,
      saldo,
    }));
  }, [mov]);

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date)
    // Usamos la última fecha con transacciones como punto de referencia
    const referenceDate = chartData.length > 0 
      ? new Date(chartData[chartData.length - 1].date)
      : new Date();

    let daysToSubtract = 90 //por defecto 90 dias
    if (timeRange === "30d") {
      daysToSubtract = 30
    } else if (timeRange === "7d") {
      daysToSubtract = 7
    } else if (timeRange === "all") {
      return true; // Mostrar todo sin filtrar
    }
    const startDate = new Date(referenceDate)
    startDate.setDate(startDate.getDate() - daysToSubtract)
    return date >= startDate
  })

  // Verificamos si el último saldo calculado en el periodo es negativo
  const isNegative = filteredData.length > 0 && filteredData[filteredData.length - 1].saldo < 0;

  // Creamos una configuración dinámica que cambia el color basado en isNegative
  const dynamicConfig = {
    ...chartConfig,
    saldo: {
      ...chartConfig.saldo,
      color: isNegative ? "var(--destructive)" : "var(--chart-1)",
    }
  };

  return (
    <Card className="pt-0">
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1">
          <CardDescription>
            Como van tus ahorros:
          </CardDescription>
        </div>
        <Select value={timeRange} onValueChange={(val) => val && setTimeRange(val)}>
          <SelectTrigger
            className="w-[160px] rounded-lg sm:ml-auto"
            aria-label="Seleccionar periodo"
          >
            <SelectValue placeholder="Últimos 3 meses" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="90d" className="rounded-lg">
              Últimos 3 meses
            </SelectItem>
            <SelectItem value="30d" className="rounded-lg">
              Últimos 30 días
            </SelectItem>
            <SelectItem value="7d" className="rounded-lg">
              Últimos 7 días
            </SelectItem>
            <SelectItem value="all" className="rounded-lg">
              Histórico completo
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={dynamicConfig}
          className="aspect-auto h-[250px] w-full"
        >
          {filteredData.length > 0 ? (
            <AreaChart data={filteredData}>
              <defs>
                <linearGradient id="fillSaldo" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--color-saldo)"
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--color-saldo)"
                    stopOpacity={0.1}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={32}
                tickFormatter={(value) => {
                  const date = new Date(value)
                  return date.toLocaleDateString("es-ES", {
                    month: "short",
                    day: "numeric",
                  })
                }}
              />
              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent
                    labelFormatter={(value) => {
                      return new Date(value).toLocaleDateString("es-ES", {
                        month: "short",
                        day: "numeric",
                        year: "numeric"
                      })
                    }}
                    indicator="dot"
                  />
                }
              />
              <Area
                dataKey="saldo"
                type="natural"
                fill="url(#fillSaldo)"
                stroke="var(--color-saldo)"
                stackId="a"
              />
              <ChartLegend content={<ChartLegendContent />} />
            </AreaChart>
          ) : (
            <div>
            </div>
            //boton comentado porque no consigo centrarlo
            // <button onClick={() => setCurrentView("add-funds")} className="flex h-full w-full items-center justify-center text-sm text-gray-500 bg-emerald-600">
            //   No hay movimientos para generar la gráfica.
            //   haz click aqui para añadir más.
            // </button>
          )}
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
