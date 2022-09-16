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
import { EpisodeData, IEpisode, IFilters } from "../../models/models";

import Filters from "../UI/Filters/Filters";

const Episodes = () => {
  const [episodes, setEpisodes] = useState<EpisodeData | null>(null);
  const [page, setPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [filters, setFilters] = useState<IFilters>({
    name: "",
    episode: "",
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

  const fetchEpisodes = async (): Promise<void> => {
    setIsLoading(true);
    let filtersString = `${filters.name ? `&name=${filters.name}` : ""}${
      filters.episode ? `&episode=${filters.episode}` : ""
    }`;
    let url = `https://rickandmortyapi.com/api/episode/?page=${page}${filtersString}`;
    const response = await fetch(url);
    const data = await response.json();
    setEpisodes(data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchEpisodes();
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
            fetchFunc={fetchEpisodes}
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
                    <TableCell>Episode</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Air Date</TableCell>
                    <TableCell>Url</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {episodes?.results.map((episode: IEpisode) => (
                    <TableRow
                      key={episode.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {episode.episode}
                      </TableCell>
                      <TableCell>{episode.name}</TableCell>
                      <TableCell>{episode.air_date}</TableCell>
                      <TableCell>
                        <Link
                          href={episode.url}
                          target="_blank"
                          underline="none"
                        >
                          {episode.url}
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
              count={episodes?.info?.pages}
              page={page}
              onChange={handlePageChange}
            />
          </Box>
        </Box>
      )}
    </>
  );
};

export default Episodes;
