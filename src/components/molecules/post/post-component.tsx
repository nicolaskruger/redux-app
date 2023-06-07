import { useSelector } from "react-redux";
import { selectLoginUser } from "../../../features/login/loginSlice";
import {
  addComment,
  reaction,
  selectPostViewById,
  showMoreComments,
} from "../../../features/post/postSlicer";
import { formatDistance } from "date-fns";
import { Reactions } from "../../../features/post/constants";
import { FormEvent, MouseEvent, useState } from "react";
import { useAppDispatch } from "../../../store";
import { CommentComponent } from "../../atom/comment/comment";

type PostComponentProps = {
  postId: string;
};

export const PostComponent = ({ postId }: PostComponentProps) => {
  const [newComment, setNewComment] = useState("");

  const dispatch = useAppDispatch();

  const user = useSelector(selectLoginUser);
  if (!user) return <></>;

  const post = useSelector(selectPostViewById(postId));

  if (!post) return <p data-testid="p-post-error">post not found !!!</p>;

  const {
    commentIds,
    date,
    reactions,
    showMore,
    text,
    user: { url, name },
  } = post;

  const handleClickReaction =
    (react: Reactions) =>
    (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
      e.preventDefault();
      e.stopPropagation();
      dispatch(
        reaction({
          postId,
          reaction: react,
          userId: user.id,
        })
      );
    };

  const handleSubmitComment = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(
      addComment({
        postId,
        text: newComment,
        userId: user.id,
      })
    );
  };

  const handleShowMoreComments = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    e.preventDefault();
    e.stopPropagation();

    dispatch(showMoreComments(postId));
  };

  return (
    <div>
      <div>
        <div>
          <img src={url} alt={name} />
          <p>{name}</p>
        </div>
        <p>{text}</p>
        <p>{formatDistance(new Date(date), new Date(), { addSuffix: true })}</p>
      </div>
      <ul>
        {reactions.map(({ emoji, times, reaction }) => (
          <li key={emoji}>
            <button
              data-testid={`button-post-${reaction}`}
              onClick={handleClickReaction(reaction)}
            >
              {emoji} {times}
            </button>
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmitComment} action="submit">
        <input
          data-testid="input-post-comment"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          type="text"
        />
        <button data-testid="button-post-comment">comment</button>
      </form>
      <ul>
        {commentIds.map((commentId) => (
          <li key={commentId}>
            <CommentComponent commentId={commentId} />
          </li>
        ))}
      </ul>
      {showMore && (
        <button
          type="button"
          onClick={handleShowMoreComments}
          data-testid="button-post-show-more"
        >
          show more
        </button>
      )}
    </div>
  );
};
