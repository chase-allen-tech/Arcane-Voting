import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllProjects } from "redux/slices/project";
import Router from "./router";
import ThemeConfig from "theme";

export default function App() {
  const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(getAllProjects());
  // }, [dispatch]);
  return (
    <>
      <ThemeConfig>
        <Router />
      </ThemeConfig>
    </>
  );
}
