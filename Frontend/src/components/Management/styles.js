import styled from "styled-components";

export const Container = styled.div``;
export const TableWrapper = styled.div``;

export const TitleSection = styled.h1`    display: flex;
    flex-direction: row;
    align-items: center;
    color: rgb(0 0 0 / 87%);
    margin: 20px 0 0 0;
}`;

export const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 15px;
  margin: 15px 10px 0 10px;
`;

export const TitleIconStyles = {
  width: "40px",
  height: "40px",
  margin: "0 10px",
  padding: "0 5px",
  background: "rgb(0 0 0 / 87%)",
  borderRadius: "12px",
  color: "white",
};

export const TableStyles = {
  border: "1px solid rgb(0 0 0 / 87%)",
  width: "96%",
  margin: "20px auto",
};

export const TableHeadStyles = {
  backgroundColor: "rgb(0 0 0 / 87%) !important",
  fontSize: "18px",
  fontWeight: "bold",
  minWidth: "120px",
};
