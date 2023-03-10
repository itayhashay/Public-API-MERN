import { useState, useEffect, useMemo } from "react";
import { Container } from "./styles";
import * as APIS_FLAGS from "../../utils/flags/apiListFlags";
import {
  getBestRatedApis,
  getLatestApis,
  getRandomApi,
  searchApis,
  getConnectedUserBookmark,
} from "../../utils/api";
import ApiCard from "../ApiCard";
import { useLocation } from "react-router-dom";
import Spinner from "../Spinner";

const useQuery = () => {
  const { search } = useLocation();

  return useMemo(() => new URLSearchParams(search), [search]);
};

const GenericApiList = ({ flag }) => {
  const [apis, setApis] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userBookmark, setUserBookmark] = useState([]);

  let query = useQuery();

  useEffect(() => {
    getConnectedUserBookmark().then((response) => {
      setUserBookmark(response.map((apiData) => apiData.api));
    })
  }, []);

  useEffect(() => {
    const fetchApis = async (flag) => {
      let apiResponse = [];

      switch (flag) {
        case APIS_FLAGS.LATEST_APIS:
          apiResponse = await getLatestApis();
          break;
        case APIS_FLAGS.BEST_RATED_APIS:
          apiResponse = await getBestRatedApis();
          break;
        case APIS_FLAGS.BOOKMARKS:
          apiResponse = userBookmark;
          break;
        case APIS_FLAGS.RANDOM_API:
          let randomApi = await getRandomApi();
          apiResponse = [randomApi];
          break;
        case APIS_FLAGS.SEARCH_RESULTS:
          apiResponse = await searchApis(query.get("q"), {
            Name: query.get("name"),
            Category: query.get("category"),
            UploadBy: query.get("uploadby"),
          });
          break;
        default:
          break;
      }

      return apiResponse;
    };

    fetchApis(flag).then((data) => {
      setApis(data);
      setIsLoading(false);
    });
  }, [flag, query, userBookmark]);

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <Container className="apis-container">
          {apis.map((api) => {
            return (
              <div key={api._id}>
                <ApiCard apiData={api} userBookmark={userBookmark}/>
              </div>
            );
          })}
        </Container>
      )}
    </>
  );
};

export default GenericApiList;
