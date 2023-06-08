import { formatDistance } from "date-fns";
import {
  commentReaction,
  selectCommentViewById,
} from "../../../features/post/postSlicer";
import { Reactions } from "../../../features/post/constants";
import { useDispatch, useSelector } from "react-redux";
import { MouseEvent } from "react";
import { ProfileImg } from "../profile-img/profile-img";
import styles from "./comment.module.css";

type CommentComponentProps = {
  commentId: string;
};

const CommentComponent = ({ commentId }: CommentComponentProps) => {
  const comment = useSelector(selectCommentViewById(commentId));

  if (!comment) return <p data-testid="p-comment-error">post not exist!!!</p>;

  const { date, reactions, text, id, user } = comment;

  const { name, url } = user;

  const dispatch = useDispatch();

  const handleClickReaction =
    (reaction: Reactions) =>
    (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
      e.preventDefault();
      e.stopPropagation();
      dispatch(
        commentReaction({
          commentId: id,
          reaction,
          userId: user.id,
        })
      );
    };

  return (
    <div className={styles.container}>
      <div className={styles.divInfo}>
        <div>
          <ProfileImg
            size={40}
            data-testid="img-comment-user"
            src={url}
            alt={name}
          />
          <p className={styles.name} data-testid="p-comment-user-name">
            {name}
          </p>
        </div>
        <div className={styles.divTextDate}>
          <p className={styles.text}>{text}</p>
          <p className={styles.date}>
            {formatDistance(new Date(date), new Date(), { addSuffix: true })}
          </p>
        </div>
      </div>
      <ul className={styles.ul}>
        {reactions.map(({ emoji, times, reaction }) => (
          <li key={emoji}>
            <button
              data-testid={`button-comment-${reaction}`}
              onClick={handleClickReaction(reaction)}
            >
              {emoji} {times}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export { CommentComponent };
