import { formatDistance } from "date-fns";
import {
  CommentView,
  commentReaction,
} from "../../../features/post/postiSlicer";
import { Reactions } from "../../../features/post/constants";
import { useDispatch, useSelector } from "react-redux";
import { MouseEvent, MouseEventHandler } from "react";
import { selectLoginUser } from "../../../features/login/loginSlice";

type CommentComponentProps = {
  comment: CommentView;
};

const CommentComponent = ({ comment }: CommentComponentProps) => {
  const { date, reactions, text, id, postId } = comment;

  const user = useSelector(selectLoginUser);

  if (!user) return <p>user not found</p>;

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
          postId,
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
        <img src={url} alt={name} />
        <p>{name}</p>
      </div>
      <ul>
        {reactions.map(({ emoji, times, reaction }) => (
          <li key={emoji}>
            <button
              data-testid={`button-comment-${reaction}`}
              onClick={handleClickReaction(reaction)}
            >
              {emoji}' '{times}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export { CommentComponent };
