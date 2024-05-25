import { ExchangeOrder } from "."
import api from "./api"
import http, { marketHttp } from "./http"

export function getSymbolInfo() {
  return marketHttp.post(api.market.thumb)
}

export function getTrades(param: {symbol: string, size: number}) {
  return marketHttp.post(api.market.trade, param)
}

export function getMiniOrderBook(param: {symbol: string}) {
  return marketHttp.post(api.market.platemini + '/?symbol=' + param.symbol)
}

export function getFullOrderBook(param: {symbol: string}) {
  return marketHttp.post(api.market.platefull, param)
}

export function getKlines(param: {symbol: string, from: number, to: number, resolution: string}) {
  return marketHttp.post(api.market.klineHistory, param)
}

export function addOrder(param: ExchangeOrder) {
  return http.post(api.exchange.orderAdd, param)
}