import { useState } from "react";
import dayjs from "dayjs";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { amber } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { DividerLine, UpvotesCount } from "./styles";
import Button from "@mui/material/Button";
import { upvoteApi } from "../../utils/api";
import * as COLORS from "../../utils/colors";

const ApiCard = ({ apiData }) => {
  const [upvotesCount, setUpvotesCount] = useState(apiData.upvotes);

  const handleUpvoteApi = async (apiId) => {
    const newApiData = await upvoteApi(apiId);
    setUpvotesCount(newApiData.upvotes);
  };

  return (
    <Card
      sx={{
        maxWidth: 345,
        width: "16rem",
        height: "30rem",
        margin: "20px",
        borderRadius: "8px",
        boxShadow: "rgb(0 0 0 / 35%) 0px 5px 15px",
        position: "relative",
        "&:hover": {
          borderColor: "dimgray",
          boxShadow: "rgb(0 0 0 / 60%) 0px 5px 25px",
        },
      }}
    >
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: amber[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        title={apiData.name}
        subheader={dayjs(apiData.date).format("MMMM M, YYYY")}
      />
      <CardMedia
        component="img"
        height="194"
        image={apiData.img}
        alt="Paella dish"
      />
      <CardContent
        sx={{
          padding: "12px 16px",
          height: "150px",
          maxHeight: "150px",
          overflowY: "auto",
        }}
      >
        <Typography variant="body2" color="text.secondary">
          {apiData.description}
        </Typography>
      </CardContent>
      <DividerLine />
      <CardActions
        disableSpacing
        sx={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <IconButton
          aria-label="share"
          onClick={() => handleUpvoteApi(apiData._id)}
        >
          <ThumbUpIcon color="primary" />
          <UpvotesCount>{upvotesCount}</UpvotesCount>
        </IconButton>
        <Button
          sx={{ color: "#757575" }}
          onClick={() => window.open(apiData.url)}
        >
          Learn more
        </Button>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon color="error" />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default ApiCard;
