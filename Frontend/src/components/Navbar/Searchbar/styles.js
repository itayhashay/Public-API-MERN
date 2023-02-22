import styled from "styled-components";
import { grey } from "@mui/material/colors";

export const Container = styled.div`
  display: flex;
  height: 40px;
`;

export const FilterContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
export const TitleText = styled.h3`
  margin-right: 15px;
`;

export const checkboxStyle = {
  color: grey[50],
  "&.Mui-checked": {
    color: grey[200],
  },
  paddingRight: "3px",
};
