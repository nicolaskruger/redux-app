import { formatDistance } from "date-fns";
import {
  commentReaction,
  selectCommentViewById,
} from "../../../features/post/postSlicer";
import { Reactions } from "../../../features/post/constants";
import { useDispatch, useSelector } from "react-redux";
import { MouseEvent } from "react";

type CommentComponentProps = {
  commentId: string;
};

const CommentComponent = ({ commentId }: CommentComponentProps) => {
  const comment = useSelector(selectCommentViewById(commentId));

  if (!comment) return <p data-testid="p-comment-error">post not exist!!!</p>;

  const { date, reactions, text, id, user } = comment;

  if (!user) return <p data-testid="p-comment-error">user not logged!!!</p>;

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
    <div>
      <p>{text}</p>
      <p>{formatDistance(new Date(date), new Date(), { addSuffix: true })}</p>
      <div>
        <img data-testid="img-comment-user" src={url} alt={name} />
        <p data-testid="p-comment-user-name">{name}</p>
      </div>
      <ul>
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
