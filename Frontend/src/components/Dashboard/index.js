import {
  Container,
  CountContainer,
  CountNumber,
  CountTitle,
  SectionContainer,
  SectionContent,
  SectionTitle,
  IconStyles,
  CountIconStyles,
} from "./styles";
import { useState, useEffect } from "react";
import { getAllApis, getTotalUpvotes, getAllUsers } from "../../utils/api";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import DataThresholdingIcon from "@mui/icons-material/DataThresholding";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import CodeIcon from "@mui/icons-material/Code";
import RadialChart from "../RadialChart";
const Dashboard = () => {
  const [analytics, setAnalytics] = useState({
    apisCount: 0,
    usersCount: 0,
    totalUpvotes: 0,
  });

  useEffect(() => {
    const getAnalyticsData = async () => {
      const apis = await getAllApis();
      const users = await getAllUsers();
      const totalUpvotes = await getTotalUpvotes();

      return {
        apisCount: apis.length,
        usersCount: users.length,
        totalUpvotes,
      };
    };

    getAnalyticsData().then((data) => {
      setAnalytics(data);
    });
  }, []);

  const analyticsContent = [
    {
      icon: <CodeIcon sx={CountIconStyles} />,
      title: "Total APIs",
      count: analytics.apisCount,
    },
    {
      icon: <PeopleOutlineIcon sx={CountIconStyles} />,
      title: "Total Users",
      count: analytics.usersCount,
    },
    {
      icon: <ThumbUpAltOutlinedIcon sx={CountIconStyles} />,
      title: "Total Upvotes",
      count: analytics.totalUpvotes,
    },
  ];

  return (
    <Container className="dashboard-container">
      <SectionContainer className="analytics-container">
        <SectionTitle>
          <DataThresholdingIcon sx={IconStyles} />
          Analytics
        </SectionTitle>
        <SectionContent className="analytics-content">
          {analyticsContent.map((analyticsCount) => {
            return (
              <CountContainer
                key={analyticsCount.title}
                className="count-container"
              >
                {analyticsCount.icon}
                <CountTitle>{analyticsCount.title}</CountTitle>
                <CountNumber>{analyticsCount.count}</CountNumber>
              </CountContainer>
            );
          })}
        </SectionContent>
      </SectionContainer>
      <SectionContainer className="apis-by-categories-container">
        <SectionTitle>
          <AnalyticsIcon sx={IconStyles} />
          APIs Count by Categories
        </SectionTitle>
        <SectionContent className="apis-by-categories-content">
          <RadialChart />
        </SectionContent>
      </SectionContainer>
    </Container>
  );
};

export default Dashboard;
