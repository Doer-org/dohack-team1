import { gray } from "@radix-ui/colors";
export type Reaction = {
  kind: "like" | "love";
  x: number;
  y: number;
  theta: number;
  scale: number;
};

export type Post = {
  contents: string;
  reactions: Reaction[];
};

export type Props = {
  post: Post;
  onClick?: (x: number, y: number) => void;
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
        onClick?.(relX / rect.width, relY / rect.height);
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
          {reaction.kind === "like" ? <> 👍 </> : <> 💛</>}
        </div>
      ))}
    </div>
  );
};
