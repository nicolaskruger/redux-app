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
import { ProfileImg } from "../../atom/profile-img/profile-img";
import styles from "./post-component.module.css";

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
    setNewComment("");
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
          <ProfileImg size={50} src={url} alt={name} />
          <p className={styles.name}>{name}</p>
        </div>
        <p className={styles.text}>{text}</p>
        <p>{formatDistance(new Date(date), new Date(), { addSuffix: true })}</p>
      </div>
      <ul className={styles.ulReaction}>
        {reactions.map(({ emoji, times, reaction }) => (
          <li key={emoji}>
            <button
              className={styles.buttonReaction}
              data-testid={`button-post-${reaction}`}
              onClick={handleClickReaction(reaction)}
            >
              {emoji} {times}
            </button>
          </li>
        ))}
      </ul>
      <form
        className={styles.formComment}
        onSubmit={handleSubmitComment}
        action="submit"
      >
        <textarea
          className={styles.textAreaComment}
          data-testid="input-post-comment"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button data-testid="button-post-comment">comment</button>
      </form>
      <ul className={styles.ulComment}>
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
