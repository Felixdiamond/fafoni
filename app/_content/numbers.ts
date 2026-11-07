/** PLACEHOLDER figures. The client has asked for numbers but not yet supplied them.
 *  They live in ./data/numbers.json and are editable in Pages CMS; nothing else needs to change. */
import data from "./data/numbers.json";
import { list, num, str } from "./cms";

export const numbers = {
  title: str(data.title),
  cells: list(data.cells).map((c) => ({ value: num(c.value), suffix: str(c.suffix), label: str(c.label) })),
};
