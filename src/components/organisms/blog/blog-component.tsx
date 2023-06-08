import { ProfileHeader } from "../../molecules/profile-header/profile-header";
import { PostComponent } from "../../molecules/post/post-component";
import { FormEvent, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../store";
import { addPost, selectPostsIds } from "../../../features/post/postSlicer";
import { selectLoginUser } from "../../../features/login/loginSlice";

const BlogComponent = () => {
  const [text, setText] = useState("");

  const user = useAppSelector(selectLoginUser);

  const postIds = useAppSelector(selectPostsIds);

  if (!user) return <></>;

  const dispatch = useAppDispatch();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(
      addPost({
        text,
        userId: user.id,
      })
    );
    setText("");
  };

  return (
    <div>
      <ProfileHeader />
      <form action="submit" onSubmit={handleSubmit}>
        <label htmlFor="post">Post</label>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          data-testid="input-blog-post"
          id="post"
          type="text"
        />
        <button type="submit" data-testid="button-blog-post">
          post
        </button>
      </form>
      <ul>
        {postIds.map((id) => (
          <li key={id} data-testid={`li-blog-post-${id}`}>
            <PostComponent postId="id" />
          </li>
        ))}
      </ul>
    </div>
  );
};

export { BlogComponent };
