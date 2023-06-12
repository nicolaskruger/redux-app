import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { makeStore } from "../../../store";
import { CommentComponent } from "./comment";
import {
  Comment,
  Post,
  addComment,
  addPost,
  commentAdapter,
  postAdapter,
} from "../../../features/post/postSlicer";
import user from "@testing-library/user-event";

const comment: Comment = {
  postId: "0",
  cigaret: [],
  date: new Date().toISOString(),
  fire: [],
  heart: [],
  id: "0",
  like: [],
  text: "comment",
  userId: "punpun",
};

const post: Post = {
  cigaret: [],
  date: new Date().toISOString(),
  fire: [],
  heart: [],
  id: "0",
  like: [],
  showSize: 5,
  text: "hello",
  userId: "punpun",
};

const beforeChosen = () => {
  const store = makeStore({
    login: {
      id: "punpun",
    },
    post: {
      posts: {
        entities: {
          "0": post,
        },
        ids: ["0"],
      },
      showSize: 5,
      comment: {
        entities: {
          "0": comment,
        },
        ids: ["0"],
      },
    },
  });

  render(
    <Provider store={store}>
      <CommentComponent commentId="0" />
    </Provider>
  );
};

describe("<CommentComponent/>", () => {
  it("should render correctly", () => {
    beforeChosen();
    expect(screen.getByTestId<HTMLImageElement>("img-comment-user").src).toBe(
      "http://localhost/user/punpun.webp"
    );
    expect(
      screen.getByTestId<HTMLParagraphElement>("p-comment-user-name")
        .textContent
    ).toBe("Punpun");

    expect(
      screen.getByTestId<HTMLButtonElement>("button-comment-heart").textContent
    ).toBe("🖤 0");
  });
  it("should react to a comment", async () => {
    beforeChosen();
    const button = screen.getByTestId<HTMLButtonElement>(
      "button-comment-heart"
    );

    expect(button.textContent).toBe("🖤 0");

    user.click(button);

    expect(button.textContent).toBe("🖤 1");

    user.click(button);

    expect(button.textContent).toBe("🖤 0");
  });
  it("error when comment not exists", async () => {
    const store = makeStore();

    render(
      <Provider store={store}>
        <CommentComponent commentId="0" />
      </Provider>
    );

    const p = screen.getByTestId<HTMLParagraphElement>("p-comment-error");

    expect(p).toBeInTheDocument();
    expect(p.textContent).toBe("post not exist!!!");
  });
});
