import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const FormContainer = styled.div`
  box-shadow: rgb(0 0 0 / 35%) 0px 5px 15px;
  height: 27rem;
  margin: 50px 0;
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px;
  justify-content: space-around;
`;

export const TitleText = styled.h1`
  margin: 0;
  width: 100%;
  text-align: center;
`;

export const FieldContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: center;
  max-height: 32px;
  margin: 15px 0;
`;

export const FieldsContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 60%;
  width: 70%;
`;

export const FieldName = styled.span`
  margin-right: 12px;
  white-space: nowrap;
`;
