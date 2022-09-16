import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Input from "@mui/material/Input";
import Box from "@mui/material/Box";
import { IFilters } from "../../../models/models";

interface FiltersProps {
  fetchFunc: () => Promise<void>;
  handleFilterChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  filters: IFilters;
}

const Filters = ({ fetchFunc, filters, handleFilterChange }: FiltersProps) => {
  const applyFilters = (): void => {
    for (let [value] of Object.entries(filters)) {
      if (value) {
        fetchFunc();
        return;
      }
    }
    alert("Please input at least one filter");
  };
  return (
    <Box>
      <Typography variant="h6">Filters</Typography>
      <Box
        sx={{
          display: "flex",
          margin: " 0 0 16px",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {Object.keys(filters).map((key, idx): JSX.Element => {
          let item: string | undefined = filters[key as keyof IFilters];
          let title = key[0].toUpperCase() + key.slice(1);
          return (
            <FormControl
              key={idx}
              variant="standard"
              sx={{ marginRight: "10px", marginBottom: "10px" }}
            >
              <InputLabel htmlFor={`${key}-filter`}>{title}</InputLabel>
              <Input
                id={`${key}-filter`}
                value={item}
                name={key}
                onChange={handleFilterChange}
              />
            </FormControl>
          );
        })}
        <Button variant="contained" onClick={() => applyFilters()}>
          Apply Filters
        </Button>
      </Box>
    </Box>
  );
};

export default Filters;
