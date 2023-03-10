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
import React, { useState, useEffect } from "react";
import { getAllApis, getTotalUpvotes, getAllUsers, getAmountsOfApis } from "../../utils/api";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import DataThresholdingIcon from "@mui/icons-material/DataThresholding";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import CodeIcon from "@mui/icons-material/Code";
import Skeleton from "@mui/material/Skeleton";
import {PieChartSvg} from "../PieChart";
import Spinner from "../Spinner";

const Dashboard = ({onlineUsers}) => {
  const [analytics, setAnalytics] = useState({
    apisCount: 0,
    usersCount: 0,
    totalUpvotes: 0,
  });

  const [isLoading, setIsLoading] = useState(true);
  const [chartSvg, setChartSvg] = useState(<></>);

  useEffect(() => {
    console.log(onlineUsers)
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
    
    const getCategoriesData = async () => {
      const categories = await getAmountsOfApis();

      return categories.map(category => {
        return {name: category._id, value: category.count}
      })
    }

    getAnalyticsData().then((data) => {
      setAnalytics(data);
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    });

    getCategoriesData().then((categoriesData) => {
      
      
      setTimeout(() => {
        const svg = PieChartSvg(categoriesData, {
          name: d => d.name,
          value: d => d.value,
          width: 600,
          height: 600
        });
        setChartSvg(svg);
      }, 1000);

    });

  }, [onlineUsers]);

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
                {isLoading ? (
                  <Skeleton variant="circular">
                    <CountNumber></CountNumber>
                  </Skeleton>
                ) : (
                  <CountNumber>{analyticsCount.count}</CountNumber>
                )}
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
          {chartSvg.outerHTML ? <div
            dangerouslySetInnerHTML={{__html: chartSvg.outerHTML}}
          /> : <Spinner />}
                  </SectionContent>
      </SectionContainer>
    </Container>
  );
};

export default Dashboard;
