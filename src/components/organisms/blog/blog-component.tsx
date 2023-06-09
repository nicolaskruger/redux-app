import { ProfileHeader } from "../../molecules/profile-header/profile-header";
import { PostComponent } from "../../molecules/post/post-component";
import { FormEvent, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../store";
import {
  addPost,
  selectPostsIds,
  selectShowMorePost,
  showMorePosts,
} from "../../../features/post/postSlicer";
import { selectLoginUser } from "../../../features/login/loginSlice";
import style from "./blog-component.module.css";

const BlogComponent = () => {
  const [text, setText] = useState("");

  const user = useAppSelector(selectLoginUser);

  const postIds = useAppSelector(selectPostsIds);

  const loadMorePost = useAppSelector(selectShowMorePost);

  if (!user) return <></>;

  const dispatch = useAppDispatch();

  const handleShowMorePost = () => {
    dispatch(showMorePosts());
  };

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
    <div className={style.container}>
      <ProfileHeader />
      <form className={style.form} action="submit" onSubmit={handleSubmit}>
        <label htmlFor="post">Post</label>
        <textarea
          className={style.textarea}
          value={text}
          onChange={(e) => setText(e.target.value)}
          data-testid="input-blog-post"
          id="post"
        />
        <button type="submit" data-testid="button-blog-post">
          post
        </button>
      </form>
      <ul className={style.ul}>
        {postIds.map((id) => (
          <li className={style.li} key={id} data-testid={`li-blog-post-${id}`}>
            <PostComponent postId={id} />
          </li>
        ))}
      </ul>
      <div className={style.ul}>
        {loadMorePost && (
          <button
            onClick={handleShowMorePost}
            data-testid={"button-blog-load-more"}
          >
            show more posts
          </button>
        )}
      </div>
    </div>
  );
};

export { BlogComponent };
