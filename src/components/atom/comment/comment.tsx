import { formatDistance } from "date-fns";
import {
  CommentView,
  commentReaction,
  selectCommentViewById,
} from "../../../features/post/postiSlicer";
import { Reactions } from "../../../features/post/constants";
import { useDispatch, useSelector } from "react-redux";
import { MouseEvent } from "react";
import { selectLoginUser } from "../../../features/login/loginSlice";

type CommentComponentProps = {
  commentId: string;
  postId: string;
};

const CommentComponent = ({ commentId, postId }: CommentComponentProps) => {
  const comment = useSelector(selectCommentViewById(commentId, postId));

  if (!comment) return <p>post not exist</p>;

  const { date, reactions, text, id } = comment;

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
