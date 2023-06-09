/* eslint-disable react/prop-types */
import { Alert, AlertTitle } from "@mui/material";

export default function Error({ message }) {
  return (
    <Alert severity="error">
      <AlertTitle>Error</AlertTitle>
      {message || "There is an error"} — <strong>check it out!</strong>
    </Alert>
  );
}
