import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import Card from "../Card";
import Title from "../Title";
import FadeInNumber from "../../utils/animation";

const FinishGoodCard = (props) => {
  const { name, titleNumber, setHeight } = props;
  return (
    <Grid item xs={4}>
      <Card customStyle={{ height: setHeight + "px" }}>
        <Box display="flex" flexDirection="column" height="100%">
          <Title
            name={name}
            customStyle={{ textAlign: "center", fontSize: "25px !important" }}
          />
          <Box
            flex={1}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Typography variant="h3" component="h5" fontWeight={600}>
              <FadeInNumber n={titleNumber} /> PO
            </Typography>
          </Box>
        </Box>
      </Card>
    </Grid>
  );
};

export default FinishGoodCard;
