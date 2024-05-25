import { CoinThumb } from "@/services";
import useStore, { State } from "@/store/exchange/useStore";
import { useEffect, useMemo } from "react";

const DEFAULT_COIN_THUMB = {
  symbol: '',
  open: 0,
  high: 0,
  low: 0,
  close: 0,
  chg: 0,
  change: 0,
  volume: 0,
  turnover: 0,
  lastDayClose: 0,
  usdRate: 0,
  baseUsdRate: 0
}

export function useSymbol(router:any): string | undefined {
  console.log(router.route)
  const symbol: string | undefined = useMemo(() => {
    return router.route.params.symbol.toString().toUpperCase().replace('_', '/')
  }, [router.route.params.symbol])

  return symbol
}

export function useSymbolThumb(router:any): CoinThumb {
  const {symbolThumbMap, fetchSymbolThumbMap} = useStore((state: State) => state.symbolThumb)
  const symbol = useSymbol(router)

  useEffect(() => {
    fetchSymbolThumbMap()
  }, [symbol])

  const symbolThumb: CoinThumb = useMemo(() => {
    return symbol ? symbolThumbMap[symbol] : DEFAULT_COIN_THUMB
  }, [symbol, symbolThumbMap])

  return symbolThumb
}
