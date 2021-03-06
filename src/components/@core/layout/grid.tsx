import { Grid } from "@chakra-ui/react";
import React from "react";

function CoreGrid({ children, rows = 4, mb = 0, ...props }) {
  return (
    <Grid
      templateColumns={[
        "repeat(1, 1fr)",
        "repeat(2, 1fr)",
        "repeat(2, 1fr)",
        `repeat(${rows}, 1fr)`,
      ]}
      gap={4}
      mb={mb}
      {...props}
    >
      {children}
    </Grid>
  );
}

export default CoreGrid;
