import { ProfileHeader } from "../../molecules/profile-header/profile-header";
import { PostComponent } from "../../molecules/post/post-component";

const BlogComponent = () => {
  const postIds = ["1"];

  return (
    <div>
      <ProfileHeader />
      <form action="submit">
        <label htmlFor="post">Post</label>
        <input data-testid="input-blog-post" id="post" type="text" />
        <button data-testid="button-blog-post">post</button>
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
