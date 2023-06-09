/* eslint-disable react/prop-types */
import { ExpandMore as ExpandMoreIcon } from "@mui/icons-material";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Collapse,
  Grid,
  IconButton,
  Rating,
  Typography,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Product({
  _id,
  name,
  description,
  price,
  rating,
  category,
  supply,
  stat,
}) {
  const theme = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();

  return (
    <Grid
      item
      xs={12}
      sm={12}
      md={6}
      lg={4}
      xl={3}
    >
      <Card
        sx={{
          backgroundColor: theme.palette.background.alt,
          borderRadius: "0.5rem",
        }}
      >
        <CardMedia
          sx={{ height: 150 }}
          image="https://via.placeholder.com/1260x750"
          title={name}
        />
        <CardContent>
          <Typography
            fontSize="14"
            color={theme.palette.secondary.light}
            gutterBottom
          >
            {category}
          </Typography>
          <Typography
            variant="h4"
            component="div"
            color={theme.palette.grey.dark}
          >
            {name}
          </Typography>
          <Typography
            variant="h5"
            mt="0.5em"
            mb="1em"
            color={theme.palette.grey.text}
            fontWeight="600"
          >
            $ {Number(price).toFixed(2)}
          </Typography>
          <Rating
            value={Math.ceil(Number(rating))}
            readOnly
          />
          <Typography
            variant="body2"
            component="div"
            color={theme.palette.grey.light}
          >
            {description}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            variant="disabled"
            size="small"
            onClick={() => navigate(`${_id}`)}
          >
            See Details
          </Button>
          <IconButton
            sx={{
              transform: !isExpanded ? "rotate(0deg)" : "rotate(180deg)",
              transition: theme.transitions.create("transform", {
                duration: theme.transitions.duration.shortest,
              }),
            }}
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse
          in={isExpanded}
          timeout="auto"
          unmountOnExit
          sx={{ color: theme.palette.neutral[400] }}
        >
          <CardContent>
            <Typography>id: {_id}</Typography>
            <Typography>Supply Left: {supply}</Typography>
            <Typography>
              Yearly Sales This Year: $ {stat[0].yearlySalesTotal}
            </Typography>
          </CardContent>
        </Collapse>
      </Card>
    </Grid>
  );
}
