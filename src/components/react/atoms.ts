import { atomWithStorage } from "jotai/utils";

export const dialValue = atomWithStorage("dialValue", 0, undefined, {
  getOnInit: true,
});

export const colorValue = atomWithStorage(
  "colorValue",
  "rgb(79 70 229)",
  undefined,
  { getOnInit: true },
);
