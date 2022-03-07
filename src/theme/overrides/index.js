import { merge } from "lodash";
import Card from "./Card";
import Table from "./Table";

// ----------------------------------------------------------------------

export default function ComponentsOverrides(theme) {
  return merge(Card(theme), Table(theme));
}
