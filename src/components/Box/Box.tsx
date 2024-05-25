import styled from "styled-components/native";
import { background, border, layout, position, space } from "styled-system";
import { BoxProps } from "./types";

const Box = styled.View<BoxProps>`
  ${background}
  ${border}
  ${layout}
  ${position}
  ${space}
`;

export default Box;
