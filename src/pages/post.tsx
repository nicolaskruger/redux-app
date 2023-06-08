import { BlogComponent } from "../components/organisms/blog/blog-component";
import { useAuto } from "../hooks/autoRoute";

const Blog = () => {
  useAuto();

  return (
    <div>
      <BlogComponent />
    </div>
  );
};

export default Blog;
