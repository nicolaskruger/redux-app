import { text } from "stream/consumers";
import { Map } from "../../utils/dictionary";
import { Comment, Post } from "./postSlicer";
import { subDays } from "date-fns";

export type Reactions = "heart" | "like" | "cigaret" | "fire";

export const reactions: Map<Reactions, string> = {
  heart: "🖤",
  fire: "🔥",
  like: "👍",
  cigaret: "🚬",
};
