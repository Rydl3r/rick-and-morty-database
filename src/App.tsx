import { useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import TabPanel from "./components/UI/TabPanel/TabPanel";
import Characters from "./components/Characters/Characters";
import Episodes from "./components/Episodes/Episodes";
import Locations from "./components/Locations/Locations";
import Watchlist from "./components/Watchlist/Watchlist";

function App() {
  const [page, setPage] = useState<number>(0);

  const handlePageChange = (
    event: React.SyntheticEvent,
    newValue: number
  ): void => {
    setPage(newValue);
  };

  return (
    <div className="App">
      <Navbar value={page} onChange={handlePageChange} />
      <TabPanel value={page} index={0}>
        <Characters />
      </TabPanel>
      <TabPanel value={page} index={1}>
        <Episodes />
      </TabPanel>
      <TabPanel value={page} index={2}>
        <Locations />
      </TabPanel>
      <TabPanel value={page} index={3}>
        <Watchlist />
      </TabPanel>
    </div>
  );
}

export default App;
