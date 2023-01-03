import React from "react";
import { FormControl, Grid, TextField } from "@mui/material";

function Input({
   name,
   type,
   required,
   onChange,
   value,
   isMultiline,
   maxRows,
   label,
}) {
   return (
      <>
         <FormControl fullWidth margin="normal">
            <TextField
               id="outlined-basic"
               name={name}
               required={required}
               type={type}
               onChange={onChange}
               multiline={isMultiline}
               rows={maxRows}
               value={value}
               label={label}
               variant="outlined"
            />
         </FormControl>
      </>
   );
}

export default Input;
