import { gray } from "@radix-ui/colors";
export type Reaction = {
  reactionId?: string;
  kind: "like" | "love" | "dog" | "clover";
  x: number;
  y: number;
  theta: number;
  scale: number;
};
export type ReactionProps = Pick<Reaction, "kind">;
const Reaction = (props: ReactionProps) => {
  if (props.kind == "like") {
    return <> 👍 </>;
  } else if (props.kind == "dog") {
    return <> 🐶 </>;
  } else if (props.kind == "clover") {
    return <> 🍀 </>;
  } else {
    return <> 💖 </>;
  }
};

export type Post = {
  postId?: string;
  contents: string;
  reactions: Reaction[];
};

export type Props = {
  post: Post;
  onClick?: (x: number, y: number, postId: string) => void;
};

export const Post: React.FC<Props> = ({ post, onClick }) => {
  return (
    <div
      style={{
        border: `2px solid ${gray.gray3}`,
        borderRadius: "1rem",
        position: "relative",
        overflow: "hidden",
        padding: "0.5rem 1.2rem",
        width: "100%",
      }}
      onClick={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const relX = e.clientX - rect.left;
        const relY = e.clientY - rect.top;
        onClick?.(relX / rect.width, relY / rect.height, post.postId||"");
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          zIndex: 10,
          position: "relative",
        }}
      >
        <p
          style={{
            fontSize: "1.25rem",
            fontWeight: "bold",
          }}
        >
          {post.contents}
        </p>
      </div>
      {post.reactions.map((reaction, index) => (
        <div
          key={index}
          style={{
            zIndex: 1,
            position: "absolute",
            top: `${reaction.y}%`,
            left: `${reaction.x}%`,
            userSelect: "none",
            transform: `translate(-50%, -50%) rotate(${reaction.theta}rad) scale(${reaction.scale})`,
          }}
        >
          <Reaction kind={reaction.kind} />
        </div>
      ))}
    </div>
  );
};
