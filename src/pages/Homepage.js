import { useState, useEffect, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Box,
  Container,
  Grid,
  Pagination,
  Typography,
  Stack,
} from "@mui/material";
import SearchFilter from "components/SearchFilter";
import ProjectCard from "components/ProjectCard";
import PaginatedList from "components/PaginatedList";
import { filterProject } from "redux/slices/project";
import useLocalStorage from "hooks/useLocalStorage";
import { SearchContext } from "contexts/SearchContext";

function Homepage() {
  const dispatch = useDispatch();

  //Pagination part
  const [pageSize, setPageSize] = useState(12);
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (e, value) => {
    setCurrentPage(value);
  };

  const handlePageSizeChange = (value) => {
    setPageSize(value);
    setCurrentPage(1);
  };
  //--------------------

  const [search, setSearch] = useContext(SearchContext);
  const AllProjects = useSelector((state) => state.project.projects);
  const [filters, setFilters] = useLocalStorage("filters", {
    chain: "all",
    sort: "default",
  });
  useEffect(() => dispatch(filterProject(filters)), [dispatch, filters]);

  console.log("AllProjects: ", AllProjects);
  return (
    <Container maxWidth="xl">
      <SearchFilter />
      {AllProjects?.length === 0 ? (
        <Stack justifyContent="center" alignItems="center" sx={{ py: 10 }}>
          <Typography variant="h3">No data</Typography>
        </Stack>
      ) : (
        <PaginatedList
          dataList={AllProjects && AllProjects}
          pageSize={pageSize}
          currentPage={currentPage}
          handlePageChange={handlePageChange}
          handlePageSizeChange={handlePageSizeChange}
        >
          <Grid container spacing={5}>
            {AllProjects?.filter((project) =>
              project.name.toLowerCase().includes(search || "")
            )
              .slice(pageSize * (currentPage - 1), pageSize * currentPage)
              .map((project, index) => (
                <Grid
                  item
                  xl={2.4}
                  lg={3}
                  md={4}
                  sm={6}
                  xs={12}
                  key={project._id}
                >
                  <ProjectCard project={project} index={index + 1} />
                </Grid>
              ))}
          </Grid>
        </PaginatedList>
      )}
    </Container>
  );
}

export default Homepage;
