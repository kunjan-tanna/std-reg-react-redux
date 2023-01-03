import React from "react";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

function DatePic({ value, onChange, title }) {
   return (
      <>
         <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
               label={title}
               value={value}
               onChange={onChange}
               renderInput={(params) => <TextField fullWidth {...params} />}
            />
         </LocalizationProvider>
      </>
   );
}

export default DatePic;
