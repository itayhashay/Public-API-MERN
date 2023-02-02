import { Routes, Route } from "react-router-dom";
import { Container, ContentSection, TabContent } from "./styles";
import Sidebar from "../Sidebar";
import Navbar from "../Navbar";
import GenericApiList from "../GenericApiList";
import RoutesUrls from "../../utils/constants/routes";
import * as APIS_FLAGS from "../../utils/constants/apiListFlags";

const App = () => {
  return (
    <Container>
      <Navbar />
      <ContentSection>
        <Sidebar />
        <TabContent>
          <Routes>
            <Route
              exact
              path={`/${RoutesUrls.LATEST_APIS}`}
              element={<GenericApiList flag={APIS_FLAGS.LATEST_APIS} />}
            ></Route>
            <Route
              exact
              path={`/${RoutesUrls.BEST_RATED_APIS}`}
              element={<GenericApiList flag={APIS_FLAGS.BEST_RATED_APIS} />}
            ></Route>
            <Route
              exact
              path={`/${RoutesUrls.RANDOM_API}`}
              element={<GenericApiList flag={APIS_FLAGS.RANDOM_API} />}
            ></Route>
            <Route
              exact
              path={`/${RoutesUrls.BOOKMARKS}`}
              element={<GenericApiList flag={APIS_FLAGS.BOOKMARKS} />}
            ></Route>
            <Route
              exact
              path={`/${RoutesUrls.ADD_API}`}
              element={<GenericApiList flag={APIS_FLAGS.LATEST_APIS} />}
            ></Route>
          </Routes>
        </TabContent>
      </ContentSection>
    </Container>
  );
};

export default App;
