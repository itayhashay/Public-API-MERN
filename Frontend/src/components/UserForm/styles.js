import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const FormContainer = styled.div`
  box-shadow: rgb(0 0 0 / 35%) 0px 5px 15px;
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px;
  justify-content: flex-start;
  position: relative;
`;

export const TitleText = styled.h1`
  margin: 10px 0;
  width: 100%;
  text-align: center;
`;

export const FieldContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-between;
  max-height: 32px;
  margin: 5px 0;
  margin: 13px 0;
  max-width: 90%;
`;

export const FieldsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 80%;
  width: 90%;
`;
