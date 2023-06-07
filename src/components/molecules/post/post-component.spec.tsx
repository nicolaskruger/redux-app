import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import store, { makeStore } from "../../../store";
import { PostComponent } from "./post-component";
import {
  addComment,
  addPost,
  postAdapter,
} from "../../../features/post/postSlicer";
import { loginWithId } from "../../../features/login/loginSlice";
import user from "@testing-library/user-event";

const renderPage = () => {
  const store = makeStore();

  store.dispatch(
    addPost({
      text: "post",
      userId: "punpun",
    })
  );

  store.dispatch(loginWithId("punpun"));

  const post = postAdapter
    .getSelectors()
    .selectAll(store.getState().post.posts)[0];

  if (!post) throw new Error("post not found");

  render(
    <Provider store={store}>
      <PostComponent postId={post.id} />
    </Provider>
  );

  return {
    store,
    post,
  };
};

describe("<PostComponent/>", () => {
  it("should render correctly", () => {
    renderPage();

    const input = screen.getByTestId("input-post-comment");

    const text = screen.getByText("post");

    expect(text).toBeInTheDocument();
    expect(input).toBeInTheDocument();
  });
  it("msg when post not found", () => {
    const store = makeStore();

    render(
      <Provider store={store}>
        <PostComponent postId="0" />
      </Provider>
    );

    const p = screen.getByTestId<HTMLParagraphElement>("p-post-error");

    expect(p).toBeInTheDocument();

    expect(p.textContent).toBe("post not found !!!");
  });
  it("should react to a post", () => {
    renderPage();
    const button = screen.getByTestId<HTMLButtonElement>("button-post-heart");

    expect(button.textContent).toBe("🖤 0");

    user.click(button);

    expect(button.textContent).toBe("🖤 1");

    user.click(button);

    expect(button.textContent).toBe("🖤 0");
  });

  it("should comment in the post", () => {
    renderPage();

    const input = screen.getByTestId("input-post-comment");

    user.type(input, "comment");

    const button = screen.getByTestId("button-post-comment");

    user.click(button);

    const p = screen.getByText("comment");

    expect(p).toBeInTheDocument();
  });

  it("show more elements when click on show more", () => {
    const { store, post } = renderPage();

    "_"
      .repeat(6)
      .split("")
      .forEach((_) => {
        store.dispatch(
          addComment({ postId: post.id, text: "promise", userId: "aiko" })
        );
      });
    const button = screen.getByTestId<HTMLButtonElement>(
      "button-post-show-more"
    );

    expect(screen.getAllByText("promise")).toBe(5);

    user.click(button);

    expect(screen.getAllByText("promise")).toBe(6);
  });
});
