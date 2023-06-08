import { render, screen } from "@testing-library/react";
import { loginWithId } from "../../../features/login/loginSlice";
import { AppState, makeStore } from "../../../store";
import { Provider } from "react-redux";
import { BlogComponent } from "./blog-component";
import user from "@testing-library/user-event";
import { postAdapter } from "../../../features/post/postSlicer";

const selectAllPosts = (state: AppState) => {
  return postAdapter.getSelectors().selectAll(state.post.posts);
};

const before = () => {
  const store = makeStore();
  store.dispatch(loginWithId("punpun"));

  render(
    <Provider store={store}>
      <BlogComponent />
    </Provider>
  );

  return store;
};

describe("<PostComponent/>", () => {
  it("should render correctly", () => {
    before();
    const input = screen.getByTestId("input-blog-post");
    const button = screen.getByTestId("button-blog-post");

    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it("shoud add another post correctly", () => {
    const store = before();
    const input = screen.getByTestId<HTMLInputElement>("input-blog-post");
    const button = screen.getByTestId<HTMLButtonElement>("button-blog-post");

    const post = selectAllPosts(store.getState());
    expect(post.length).toBe(0);
    user.type(input, "post");
    expect(input.value).toBe("post");
    user.click(button);
    expect(input.value).toBe("");
    const post1 = selectAllPosts(store.getState());
    expect(post1.length).toBe(1);
  });
});
