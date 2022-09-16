import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

interface TabsProps {
  value: number;
  onChange: (event: React.SyntheticEvent, newValue: number) => void;
}

const Navbar = (props: TabsProps) => {
  return (
    <Box sx={{ width: "100%", borderBottom: 1, borderColor: "divider" }}>
      <Tabs
        value={props.value}
        onChange={props.onChange}
        aria-label="basic tabs example"
        variant="scrollable"
        scrollButtons="auto"
      >
        <Tab label="Characters" {...a11yProps(0)} />
        <Tab label="Episodes" {...a11yProps(1)} />
        <Tab label="Locations" {...a11yProps(2)} />
        <Tab label="My Watchlist" {...a11yProps(3)} />
      </Tabs>
    </Box>
  );
};

export default Navbar;
