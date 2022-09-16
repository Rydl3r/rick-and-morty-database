import Box from "@mui/material/Box";
import Pagination from "@mui/material/Pagination";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Paper from "@mui/material/Paper";
import Link from "@mui/material/Link";
import { useEffect, useState } from "react";
import { LocationData, ILocation, IFilters } from "../../models/models";

import Filters from "../UI/Filters/Filters";

const Locations = () => {
  const [locations, setLocations] = useState<LocationData | null>(null);
  const [page, setPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [filters, setFilters] = useState<IFilters>({
    name: "",
    type: "",
    dimension: "",
  });

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  const fetchLocations = async (): Promise<void> => {
    setIsLoading(true);
    let filtersString = `${filters.name ? `&name=${filters.name}` : ""}${
      filters.type ? `&type=${filters.type}` : ""
    }${filters.dimension ? `&dimension=${filters.dimension}` : ""}`;
    let url = `https://rickandmortyapi.com/api/location/?page=${page}${filtersString}`;
    const response = await fetch(url);
    const data = await response.json();
    setLocations(data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchLocations();
  }, [page]);
  return (
    <>
      {isLoading ? (
        <Backdrop sx={{ color: "#fff" }} open={isLoading}>
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : (
        <Box>
          <Filters
            filters={filters}
            handleFilterChange={handleFilterChange}
            fetchFunc={fetchLocations}
          />
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>Dimension</TableCell>
                    <TableCell>Url</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {locations?.results.map((location: ILocation) => (
                    <TableRow
                      key={location.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {location.name}
                      </TableCell>
                      <TableCell>{location.type}</TableCell>
                      <TableCell>{location.dimension}</TableCell>
                      <TableCell>
                        <Link
                          href={location.url}
                          target="_blank"
                          underline="none"
                        >
                          {location.url}
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              marginTop: "16px",
            }}
          >
            <Pagination
              count={locations?.info?.pages}
              page={page}
              onChange={handlePageChange}
            />
          </Box>
        </Box>
      )}
    </>
  );
};

export default Locations;
