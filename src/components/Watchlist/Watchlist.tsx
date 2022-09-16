import { useState, useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";
import List from "@mui/material/List";

import { IWatchlistItem } from "../../models/models";
import WatchlistItem from "./WatchlistItem/WatchlistItem";

const Watchlist = () => {
  const [input, setInput] = useState<string>("");
  const [items, setItems] = useState<IWatchlistItem[]>([]);
  const didMount = useRef<boolean>(false);

  const handleToggle = (id: number) => () => {
    const newItems = [...items];
    const item = newItems.find((item) => item.id === id);
    if (item) {
      item.checked = !item.checked;
    }
    setItems(newItems);
  };

  const addItem = (): void => {
    setItems((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        value: input,
        checked: false,
      },
    ]);
  };

  const deleteItem = (id: number): void => {
    setItems((prev) => {
      let newItems = prev.filter((item) => item.id !== id);
      return newItems;
    });
  };

  const setLocalStorageItems = (): void => {
    localStorage.setItem("items", JSON.stringify(items));
    setInput("");
  };

  useEffect(() => {
    if (didMount.current) setLocalStorageItems();
    else didMount.current = true;
  }, [items]);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("items") || "{}");
    if (items && items.length) {
      setItems(items);
    }
  }, []);
  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Typography variant="h2">Watchlist</Typography>
      <Box
        sx={{
          display: "flex",
          marginTop: "16px",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <FormControl
          variant="standard"
          sx={{ margin: "0 10px 10px 0", minWidth: 200 }}
        >
          <InputLabel htmlFor="input">Episode name</InputLabel>
          <Input
            id="input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </FormControl>
        <Button onClick={() => addItem()} variant="contained">
          Add episode
        </Button>
      </Box>
      {items.length ? (
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <List
            dense
            sx={{
              minWidth: "50%",
              bgcolor: "background.paper",
              marginTop: "32px",
              border: "1px solid black",
              borderRadius: "10px",
              padding: 0,
            }}
          >
            {items.map(
              (item: IWatchlistItem): JSX.Element => (
                <WatchlistItem
                  key={item.id}
                  item={item}
                  deleteItem={deleteItem}
                  handleToggle={handleToggle}
                />
              )
            )}
          </List>
        </Box>
      ) : (
        ""
      )}
    </Box>
  );
};

export default Watchlist;
