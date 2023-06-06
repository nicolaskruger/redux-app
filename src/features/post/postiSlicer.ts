import {
  CreateSliceOptions,
  EntityState,
  PayloadAction,
  createEntityAdapter,
  createSlice,
  nanoid,
} from "@reduxjs/toolkit";
import { Reactions, reactions } from "./constants";
import { User } from "../user/userSlice";
import { AppState } from "../../store";

type ReactionContent = {
  heart: string[];
  fire: string[];
  like: string[];
  cigaret: string[];
};

export type Comment = ReactionContent & {
  id: string;
  text: string;
  date: string;
  userId: string;
};

export type ReactionView = {
  emoji: string;
  times: number;
  reaction: Reactions;
};

export type CommentView = {
  id: string;
  text: string;
  date: string;
  reactions: ReactionView[];
  postId: string;
};

export type Post = ReactionContent & {
  id: string;
  text: string;
  date: string;
  showSize: number;
  comments: EntityState<Comment>;
  userId: string;
};

type Blog = {
  posts: EntityState<Post>;
  showSize: number;
};

const commentAdapter = createEntityAdapter<Comment>({
  selectId: ({ id }) => id,
  sortComparer: (a, b) => b.date.localeCompare(a.date),
});

const postAdapter = createEntityAdapter<Post>({
  selectId: ({ id }) => id,
  sortComparer: (a, b) => b.date.localeCompare(a.date),
});

const initialState: Blog = {
  posts: postAdapter.getInitialState(),
  showSize: 5,
};

type AddPost = Pick<Post, "text" | "userId">;

type ToggleReaction = {
  postId: string;
  userId: string;
  reaction: Reactions;
};

type AddComment = Pick<Comment, "text" | "userId"> & {
  postId: string;
};

type CommentReaction = ToggleReaction & {
  postId: string;
  commentId: string;
};

const postSlicer = createSlice({
  name: "post",
  initialState,
  reducers: {
    addPost: (state, post: PayloadAction<AddPost>) => {
      const newPost: Post = {
        ...post.payload,
        cigaret: [],
        comments: commentAdapter.getInitialState(),
        date: new Date().toISOString(),
        fire: [],
        heart: [],
        id: nanoid(),
        like: [],
        showSize: 5,
      };
      postAdapter.addOne(state.posts, newPost);
      return { ...state };
    },
    reaction: (state, action: PayloadAction<ToggleReaction>) => {
      const { postId, reaction, userId } = action.payload;

      const post = postAdapter.getSelectors().selectById(state.posts, postId);

      if (!post) return;

      const reactions = post[reaction];

      if (reactions.includes(userId)) {
        post[reaction] = reactions.filter((user) => user != userId);
      } else {
        reactions.push(userId);
      }
      return { ...state };
    },
    addComment: (state, action: PayloadAction<AddComment>) => {
      const { postId, text, userId } = action.payload;

      const newComment: Comment = {
        cigaret: [],
        date: new Date().toISOString(),
        fire: [],
        heart: [],
        id: nanoid(),
        like: [],
        text,
        userId,
      };

      const post = postAdapter.getSelectors().selectById(state.posts, postId);

      if (!post) return;

      commentAdapter.addOne(post.comments, newComment);
      return { ...state };
    },
    commentReaction: (state, action: PayloadAction<CommentReaction>) => {
      const { postId, reaction, userId, commentId } = action.payload;

      const post = postAdapter.getSelectors().selectById(state.posts, postId);

      if (!post) return;

      const comment = commentAdapter
        .getSelectors()
        .selectById(post.comments, commentId);

      if (!comment) return;

      const reactions = comment[reaction];

      if (reactions.includes(userId)) {
        comment[reaction] = reactions.filter((user) => user !== userId);
      } else {
        comment[reaction].push(userId);
      }
      return { ...state };
    },
  },
});

const commentToCommentView = (
  comment: Comment,
  postId: string
): CommentView => ({
  ...comment,
  postId,
  reactions: (["cigaret", "fire", "like", "heart"] as Reactions[]).map(
    (key) => ({
      emoji: reactions[key],
      reaction: key,
      times: comment[key].length,
    })
  ),
});

export const selectCommentViewById =
  (commentId: string, postId: string) => (state: AppState) => {
    const post = postAdapter
      .getSelectors()
      .selectById(state.post.posts, postId);
    if (!post) return null;

    const comment = commentAdapter
      .getSelectors()
      .selectById(post?.comments, commentId);

    if (!comment) return null;

    return commentToCommentView(comment, postId);
  };

export const { addComment, addPost, commentReaction, reaction } =
  postSlicer.actions;

export const postReducer = postSlicer.reducer;
