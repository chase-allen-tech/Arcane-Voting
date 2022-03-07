import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Box,
  Stack,
  Typography,
  Container,
  Grid,
  Pagination,
  Card,
  CardHeader,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  TableContainer,
} from "@mui/material";
import { getAllProjects } from "redux/slices/project";
import SearchFilter from "components/SearchFilter";
import AdminTokenItem from "components/AdminTokenItem";
import PaginatedList from "components/PaginatedList";
import Scrollbar from "components/Scrollbar";
import moment from "moment";
import { groupBy } from "lodash";
import AdminMoreMenuButton from "components/AdminMoreMenuButton";
import PromoteButton from "components/PromoteButton";
import Label from "components/Label";

const SERVER_URL = "https://arcaneuniverse.com/uploads"; // was: http://localhost:5000/uploads
function Homepage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProjects());
  }, [dispatch]);

  const AllProjects = useSelector((state) => state.project.projects);
  const monthName = (item) => moment(item.createdAt).format("YYYY-MM-DD");
  const groupedDataByDate = groupBy(AllProjects, monthName);
  const dateArrays = Object.keys(groupedDataByDate);
  return (
    <Container maxWidth="lg">
      {dateArrays.map((date) => (
        <Card sx={{ mb: 4 }}>
          <CardHeader
            title={date}
            sx={{
              mb: 1,
              pb: 2,
              borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
            }}
          />
          <Scrollbar>
            <TableContainer sx={{ minWidth: 720 }}>
              <Table>
                <TableBody>
                  {groupedDataByDate[date].map((project) => (
                    <TableRow key={project._id}>
                      <TableCell component="th" scope="row">
                        <Stack direction="row" alignItems="center" spacing={2}>
                          <Box
                            component="img"
                            src={`${SERVER_URL}/${project.image}`}
                            sx={{ width: 72, height: 72, borderRadius: 1 }}
                          />
                          <Typography variant="h5" noWrap>
                            {project.name}
                          </Typography>
                        </Stack>
                      </TableCell>
                      <TableCell>
                        <Stack direction="row" alignItems="center" spacing={2}>
                          <Box
                            component="img"
                            src={`/chains/${project.chain}.png`}
                            sx={{ width: 28 }}
                          />
                        </Stack>
                      </TableCell>
                      <TableCell>{project.count}</TableCell>
                      <TableCell>
                        <Label
                          variant="filled"
                          color={
                            (project.approved === false && "error") || "success"
                          }
                        >
                          {project.approved ? "Approved" : "Denied"}
                        </Label>
                      </TableCell>
                      <TableCell>
                        <PromoteButton project={project} />
                      </TableCell>
                      <TableCell align="right">
                        <AdminMoreMenuButton project={project} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>
        </Card>
      ))}
    </Container>
  );
}

export default Homepage;
