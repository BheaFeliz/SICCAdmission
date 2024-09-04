import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker as MUIDatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import * as React from 'react';

const DatePicker = ({ label = "Basic date picker", value, onChange, ...props }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <MUIDatePicker 
        label={label}
        value={value}
        onChange={onChange}
        {...props}
      />
    </LocalizationProvider>
  );
};

export default DatePicker;
