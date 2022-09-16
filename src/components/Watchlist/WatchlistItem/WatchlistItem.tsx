import { IWatchlistItem } from "../../../models/models";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import DeleteIcon from "@mui/icons-material/Delete";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

interface WatchlistItemProps {
  item: IWatchlistItem;
  handleToggle: (id: number) => () => void;
  deleteItem: (id: number) => void;
}

const WatchlistItem = ({
  item,
  handleToggle,
  deleteItem,
}: WatchlistItemProps) => {
  const labelId = `checkbox-list-secondary-label-${item.id}`;
  return (
    <ListItem
      key={item.id}
      secondaryAction={
        <Box sx={{ display: "flex" }}>
          <Checkbox
            edge="end"
            onChange={handleToggle(item.id)}
            checked={item.checked}
            inputProps={{ "aria-labelledby": labelId }}
          />
          <Button
            sx={{
              padding: 0,
              minWidth: "42px",
              marginLeft: "10px",
            }}
            color="error"
            onClick={() => deleteItem(item.id)}
          >
            <DeleteIcon />
          </Button>
        </Box>
      }
      disablePadding
    >
      <ListItemButton>
        <ListItemText id={labelId} primary={item.value} />
      </ListItemButton>
    </ListItem>
  );
};

export default WatchlistItem;
