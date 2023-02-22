import styled from "styled-components";

export const Container = styled.div`
  height: 100%;
`;

export const ContentSection = styled.div`
  height: fit-content;
  min-height: 91vh;
  display: flex;
  flex-direction: row;
`;

export const TabContent = styled.div`
  width: -webkit-fill-available;
  max-height: 91vh;
  overflow: auto;
`;
