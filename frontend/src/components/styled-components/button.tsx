import styled from "styled-components";

interface IButtonProps {
  secondary?: boolean;
  neutral?: boolean;
  outline?: boolean;
}

export const Button = styled.button<IButtonProps>`
  background: ${(props) => {
    if (props.outline) {
      return "unset";
    }
    return props.neutral
      ? "#F7F7F9"
      : props.secondary
      ? "#E1458D"
      : props.theme.colors.black;
  }};
  border-color: ${(props) => {
    if (props.secondary) {
      return "#E1458D";
    }
    if (props.neutral) {
      return "#ffffff";
    }
    return "black";
  }};
  color: ${(props) => {
    if (props.outline) {
      if (props.secondary) {
        return "black";
      }
      if (props.neutral) {
        return "#ffffff";
      }
      return "white";
    }
    return props.neutral ? "#092560" : "white";
  }};
  display: flex;
  cursor: pointer;
  padding: 6px 10px;
  text-align: center;
  align-items: center;
  p {
    font-family: "IBM Plex Mono", monospace;
    font-style: normal;
    font-size: 18px;
    font-weight: 400;
    line-height: 29px;
    float: left;
    white-space: nowrap;
  }
`;
