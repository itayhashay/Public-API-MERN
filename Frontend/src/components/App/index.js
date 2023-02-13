import { Routes, Route } from "react-router-dom";
import { Container, ContentSection, TabContent } from "./styles";
import Sidebar from "../Sidebar";
import Navbar from "../Navbar";
import GenericApiList from "../GenericApiList";
import AddApi from "../AddApi";
import Profile from "../Profile";
import Dashboard from "../Dashboard";
import Management from "../Management";
import CategoryForm from "../CategoryForm";

import RoutesUrls from "../../utils/constants/routes";
import * as APIS_FLAGS from "../../utils/flags/apiListFlags";
import * as MANAGEMENT_FLAGS from "../../utils/flags/managementFlags";

const App = () => {
  return (
    <Container>
      <Navbar />
      <ContentSection>
        <Sidebar />
        <TabContent>
          <Routes>
            <Route
              path={`/${RoutesUrls.DASHBOARD}`}
              element={<Dashboard />}
            ></Route>
            <Route
              path={`/${RoutesUrls.MANAGE_APIS}`}
              element={
                <Management flagData={MANAGEMENT_FLAGS.APIS_MANAGEMENT} />
              }
            ></Route>
            <Route
              path={`/${RoutesUrls.MANAGE_USERS}`}
              element={
                <Management flagData={MANAGEMENT_FLAGS.USERS_MANAGEMENT} />
              }
            ></Route>
            <Route
              path={`/${RoutesUrls.MANAGE_CATEGORIES}`}
              element={
                <Management flagData={MANAGEMENT_FLAGS.CATEGORIES_MANAGEMENT} />
              }
            ></Route>
            <Route
              path={`/${RoutesUrls.SEARCH_RESULTS}`}
              element={<GenericApiList flag={APIS_FLAGS.SEARCH_RESULTS} />}
            ></Route>
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
              element={<AddApi />}
            ></Route>
            <Route
              exact
              path={`/${RoutesUrls.PROFILE}`}
              element={<Profile />}
            ></Route>
            <Route
              path={`/${RoutesUrls.CATEGORY_FORM}/:id?`}
              element={<CategoryForm />}
            ></Route>
          </Routes>
        </TabContent>
      </ContentSection>
    </Container>
  );
};

export default App;
