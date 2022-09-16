import Box from "@mui/material/Box";
import Pagination from "@mui/material/Pagination";
import { useEffect, useState } from "react";
import { CharacterData, ICharacter, IFilters } from "../../models/models";
import Character from "./Character/Character";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

import Filters from "../UI/Filters/Filters";

const Characters = () => {
  const [characters, setCharacters] = useState<CharacterData | null>(null);
  const [page, setPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [filters, setFilters] = useState<IFilters>({
    species: "",
    status: "",
    gender: "",
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

  const fetchCharacters = async (): Promise<void> => {
    setIsLoading(true);
    let filtersString = `${
      filters.species ? `&species=${filters.species}` : ""
    }${filters.status ? `&status=${filters.status}` : ""}${
      filters.gender ? `&gender=${filters.gender}` : ""
    }`;
    let url = `https://rickandmortyapi.com/api/character/?page=${page}${filtersString}`;
    const response = await fetch(url);
    const data = await response.json();
    setCharacters(data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchCharacters();
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
            fetchFunc={fetchCharacters}
          />
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {characters?.results?.map((character: ICharacter) => (
              <Character key={character.id} data={character} />
            ))}
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Pagination
              count={characters?.info?.pages}
              page={page}
              onChange={handlePageChange}
            />
          </Box>
        </Box>
      )}
    </>
  );
};

export default Characters;
