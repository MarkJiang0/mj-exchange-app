import styled, { css } from "styled-components/native"

export const PriceCell = styled.View<{$isBuy: boolean}>`
  flex: 1 1 0%;
  cursor: pointer;
  width: 90px;
`

export const PriceCellText = styled.Text<{$isBuy: boolean, $left: boolean}>`
  font-size: 14px;
  text-align: right;

  ${(props) => {
    return props.$isBuy ? css`color: rgb(14, 203, 129);` : css`color: rgb(246, 70, 93);`
  }}
  ${(props) => {
    return props.$left ? css`text-align: left;` : css`text-align: right;`
  }}
`

export const TextCell = styled.View<{$left?: boolean}>`
  font-size: 12px;
  flex: 1 1 0%;
  color: rgb(183, 189, 198);
  cursor: pointer;
  width: 90px;
  ${(props) => {
    return props.$left ? css`text-align: left;` : css`text-align: right;`
  }}
`

export const TextCellText = styled.Text<{$left: boolean}>`
  font-size: 14px;
  text-align: left;
  color: #ffffff;
  ${(props) => {
    return props.$left ? css`text-align: left;` : css`text-align: right;`
  }}
`