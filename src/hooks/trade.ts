import { Trade } from "@/services";
import useStore, { State } from "@/store/exchange/useStore";
import { useEffect, useMemo } from "react";
import { useSymbol } from "./symbol";


export function useLatestTrades(router: any): Trade[] | undefined {
  const {tradeMap, fetchTradeMap} = useStore((state: State) => state.latestTrades)
  const symbol = useSymbol(router)

  useEffect(() => {
    if (!symbol) return
    fetchTradeMap({symbol, size: 100})
  }, [symbol])

  const trades: Trade[] | undefined = useMemo(() => {
    return symbol ? tradeMap[symbol] : undefined
  }, [symbol, tradeMap])

  return trades
}
