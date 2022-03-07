import { createSlice } from "@reduxjs/toolkit";
// utils
import axios from "../../utils/axios";
import { toast } from "react-toastify";
import useLocalStorage from "hooks/useLocalStorage";

// ----------------------------------------------------------------------

function objFromArray(array, key = "id") {
  return array.reduce((accumulator, current) => {
    accumulator[current[key]] = current;
    return accumulator;
  }, {});
}

const initialState = {
  isLoading: false,
  error: false,
  limitTime: false,
  projects: [],
  project: {},
};

const slice = createSlice({
  name: "token",
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    // GET LABELS
    getAllProjectsSuccess(state, action) {
      state.isLoading = false;
      state.projects = action.payload;
    },
    getProjectByIdSuccess(state, action) {
      state.isLoading = false;
      state.project = action.payload;
    },

    setLimitTime(state, action) {
      state.limitTime = action.payload;
    },
  },
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export function getAllProjects() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get("/api/project/get");
      dispatch(slice.actions.getAllProjectsSuccess(response.data.projects));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getProjectById(id) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`/api/project/getbyid/${id}`);
      dispatch(slice.actions.getProjectByIdSuccess(response.data.project));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
      toast.error(error.error);
      window.location.href = "/";
    }
  };
}

export function createProject(formdata) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post("/api/project/create", formdata);
      dispatch(slice.actions.getAllProjectsSuccess(response.data.projects));
      toast.success(`The project was submitted successfully`);
    } catch (error) {
      dispatch(slice.actions.hasError(error));
      toast.error(error.error);
    }
  };
}

export function updateProject(formdata, id) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.put(`/api/project/update/${id}`, formdata);
      dispatch(slice.actions.getAllProjectsSuccess(response.data.projects));
      toast.success(`The project updated successfully`);
    } catch (error) {
      dispatch(slice.actions.hasError(error));
      toast.error(error.error);
    }
  };
}

export function deleteProject(id) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.delete(`/api/project/delete/${id}`);
      dispatch(getAllProjects());
      // dispatch(slice.actions.getAllProjectsSuccess(response.data.projects));
      toast.success(`The project was deleted successfully`);
    } catch (error) {
      dispatch(slice.actions.hasError(error));
      toast.error(`Oops, an error has occured`);
    }
  };
}

export function approveProject(id) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.put(`/api/project/approve/${id}`);
      dispatch(getAllProjects());
      // dispatch(slice.actions.getAllProjectsSuccess(response.data.projects));
      toast.success("Updated successfully!");
    } catch (error) {
      dispatch(slice.actions.hasError(error));
      toast.error(error.error);
    }
  };
}

export function promoteProject(id, promotion) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.put(`/api/project/promote/${id}`, {
        promotion,
      });
      dispatch(getAllProjects());
      // dispatch(slice.actions.getAllNftsSuccess(response.data.nfts));
      toast.success("Updated successfully!");
    } catch (error) {
      dispatch(slice.actions.hasError(error));
      toast.error(error.error);
    }
  };
}

export function fundProject(id) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.put(`/api/project/fund/${id}`);
      dispatch(getAllProjects());
      // dispatch(slice.actions.getAllProjectsSuccess(response.data.projects));
      toast.success("Updated successfully!");
    } catch (error) {
      dispatch(slice.actions.hasError(error));
      toast.error(error.error);
    }
  };
}

export function voteProject(id, account) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const filterData = JSON.parse(localStorage.getItem("filters"));
      const response = await axios.put(`/api/project/vote/${id}`, { account });
      dispatch(filterProject(filterData));
      dispatch(getProjectById(id));
      // dispatch(slice.actions.getAllProjectsSuccess(response.data.projects));
      toast.success("Updated successfully!");
    } catch (error) {
      dispatch(slice.actions.hasError(error));
      toast.error(error.error);
    }
  };
}

export function filterProject(filterData) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post("/api/project/filter", filterData);
      dispatch(slice.actions.getAllProjectsSuccess(response.data.projects));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
      toast.error(error.error);
    }
  };
}

export function leaveComment(data) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.put(`/api/project/comment/${data.id}`, data);
      dispatch(slice.actions.getProjectByIdSuccess(response.data.project));
      toast.success("Successfully commented on the project");
    } catch (error) {
      dispatch(slice.actions.hasError(error));
      toast.error(error.error);
    }
  };
}
