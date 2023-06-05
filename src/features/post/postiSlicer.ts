import {
  CreateSliceOptions,
  EntityState,
  PayloadAction,
  createEntityAdapter,
  createSlice,
  nanoid,
} from "@reduxjs/toolkit";
import { Reactions } from "./constants";

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
    },
  },
});
