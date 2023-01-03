import {
   FormControl,
   FormControlLabel,
   FormLabel,
   Radio,
   RadioGroup,
} from "@mui/material";
import React from "react";

function RadioButton({ value, name, onChange, title, radioData }) {
   return (
      <>
         <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">{title}</FormLabel>
            <RadioGroup
               aria-labelledby="demo-radio-buttons-group-label"
               name={name}
               value={value}
               onChange={onChange}
            >
               {radioData?.map((item, index) => (
                  <FormControlLabel
                     key={index}
                     value={item.value}
                     control={<Radio />}
                     label={item.label}
                  />
               ))}
            </RadioGroup>
         </FormControl>
      </>
   );
}

export default RadioButton;
