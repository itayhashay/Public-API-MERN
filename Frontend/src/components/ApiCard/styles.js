import styled from "styled-components";

export const Container = styled.div``;

export const DividerLine = styled.hr`
  height: 1px;
  width: 90%;
  background: #e0e0e0;
  border: none;
  border-radius: 15px;
`;

export const UpvotesCount = styled.span`
  margin: 0;
  position: absolute;
  font-size: 20px;
  left: 37px;
  font-weight: bold;
`;

export const cardStyles = {
  maxWidth: 345,
  width: "16rem",
  height: "30rem",
  margin: "20px",
  borderRadius: "8px",
  boxShadow: "rgb(0 0 0 / 35%) 0px 5px 15px",
  position: "relative",
  "&:hover": {
    borderColor: "dimgray",
    boxShadow: "rgb(0 0 0 / 60%) 0px 5px 25px",
  },
};
