import { Box, CircularProgress, LinearProgress } from "@mui/material";
import React from "react";

const Loader = () => (
   <Box sx={{ width: "100%" }}>
      <LinearProgress />
   </Box>
);

export default Loader;
