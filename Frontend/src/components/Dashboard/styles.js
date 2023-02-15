import styled from "styled-components";

export const Container = styled.div`
  padding: 10px 0;
`;

export const SectionContainer = styled.div`
  margin: 0 15px;
  padding: 15px 0;
`;
export const SectionTitle = styled.div`
  display: flex;
  margin: 0 15px 10px 15px;
  font-size: 25px;
  font-weight: bold;
`;
export const SectionContent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

export const CountContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: bisque;
  border-radius: 15px;
  margin: 0 15px;
  height: fit-content;
  padding: 15px 0;
`;
export const CountTitle = styled.h2`
  margin: 0 0 5px 0;
`;
export const CountNumber = styled.span`
  margin: 0;
  border-radius: 50%;
  display: flex;
  width: 45px;
  height: 45px;
  font-size: 30px;
  justify-content: center;
  font-weight: normal;
`;

export const IconStyles = {
  height: "35px",
  width: "35px",
  color: "#545a6c",
  marginRight: "5px",
};

export const CountIconStyles = {
  width: "40px",
  height: "40px",
  display: "flex",
};
