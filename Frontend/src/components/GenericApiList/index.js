import { useState, useEffect } from "react";
import { Container } from "./styles";
import * as APIS_FLAGS from "../../utils/constants/apiListFlags";
import { getBestRatedApis, getLatestApis, getRandomApi } from "../../utils/api";
import ApiCard from "../ApiCard";

const GenericApiList = ({ flag }) => {
  const [apis, setApis] = useState([]);

  useEffect(() => {
    fetchApis(flag).then((data) => {
      setApis(data);
    });
  }, [flag]);

  const fetchApis = async (flag) => {
    let apiResponse = [];

    switch (flag) {
      case APIS_FLAGS.LATEST_APIS:
        apiResponse = await getLatestApis();
        break;
      case APIS_FLAGS.BEST_RATED_APIS:
        apiResponse = await getBestRatedApis();
        break;
      case APIS_FLAGS.RANDOM_API:
        let randomApi = await getRandomApi();
        apiResponse = [randomApi];
        break;

      default:
        break;
    }

    return apiResponse;
  };

  return (
    <Container>
      {apis.map((api) => {
        return <ApiCard apiData={api} />;
      })}
    </Container>
  );
};

export default GenericApiList;
