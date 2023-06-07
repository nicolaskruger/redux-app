import {
  EntityState,
  PayloadAction,
  createEntityAdapter,
  createSlice,
  nanoid,
} from "@reduxjs/toolkit";
import { Reactions, reactions } from "./constants";
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
  postId: string;
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
};

export type Post = ReactionContent & {
  id: string;
  text: string;
  date: string;
  showSize: number;
  userId: string;
};

type Blog = {
  posts: EntityState<Post>;
  comment: EntityState<Comment>;
  showSize: number;
};

export const commentAdapter = createEntityAdapter<Comment>({
  selectId: ({ id }) => id,
  sortComparer: (a, b) => b.date.localeCompare(a.date),
});

export const postAdapter = createEntityAdapter<Post>({
  selectId: ({ id }) => id,
  sortComparer: (a, b) => b.date.localeCompare(a.date),
});

const initialState: Blog = {
  posts: postAdapter.getInitialState(),
  comment: commentAdapter.getInitialState(),
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

type CommentReaction = Omit<ToggleReaction, "postId"> & {
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
        date: new Date().toISOString(),
        fire: [],
        heart: [],
        id: nanoid(),
        like: [],
        showSize: 5,
      };
      postAdapter.addOne(state.posts, newPost);
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
    },
    addComment: (state, action: PayloadAction<AddComment>) => {
      const { postId, text, userId } = action.payload;

      const newComment: Comment = {
        postId,
        cigaret: [],
        date: new Date().toISOString(),
        fire: [],
        heart: [],
        id: nanoid(),
        like: [],
        text,
        userId,
      };

      commentAdapter.addOne(state.comment, newComment);
    },
    commentReaction: (state, action: PayloadAction<CommentReaction>) => {
      const { reaction, userId, commentId } = action.payload;

      const comment = commentAdapter
        .getSelectors()
        .selectById(state.comment, commentId);

      if (!comment) return;

      const reactions = comment[reaction];

      if (reactions.includes(userId)) {
        commentAdapter.updateOne(state.comment, {
          id: comment.id,
          changes: { [reaction]: [...reactions.filter((id) => id !== userId)] },
        });
      } else {
        commentAdapter.updateOne(state.comment, {
          id: comment.id,
          changes: { [reaction]: [...reactions, userId] },
        });
      }
    },
  },
});

const commentToCommentView = (comment: Comment): CommentView => ({
  ...comment,
  reactions: (["cigaret", "fire", "like", "heart"] as Reactions[]).map(
    (key) => ({
      emoji: reactions[key],
      reaction: key,
      times: comment[key].length,
    })
  ),
});

export const selectCommentViewById =
  (commentId: string) => (state: AppState) => {
    const comment = commentAdapter
      .getSelectors()
      .selectById(state.post.comment, commentId);

    if (!comment) return null;

    return commentToCommentView(comment);
  };

export const { addComment, addPost, commentReaction, reaction } =
  postSlicer.actions;

export const postReducer = postSlicer.reducer;
