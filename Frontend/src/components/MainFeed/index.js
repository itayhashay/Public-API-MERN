import { Container, ContentContainer, MainImage, Title } from "./styles";
import MainPageIcon from "../../images/main-page.png";

const MainFeed = () => {
  return (
    <Container>
      <ContentContainer>
        <MainImage src={MainPageIcon} />
        <Title>Public API - The World’s Largest API Hub</Title>
      </ContentContainer>
    </Container>
  );
};

export default MainFeed;
