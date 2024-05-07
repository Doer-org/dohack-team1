type Props = {
  userName: string;
  contents: string;
  reactions: {
    kind: "like" | "love";
    x: number;
    y: number;
    theta: number;
    scale: number;
  }[];
};

export const Post: React.FC<Props> = ({ userName, contents, reactions }) => {
  return (
    <div>
      <div>
        <h2>{userName}</h2>
        <p>{contents}</p>
      </div>
      <div style={{ position: "relative" }}>
        {reactions.map((reaction, index) => (
          <div
            key={index}
            style={{
              position: "absolute",
              top: `${reaction.y}%`,
              left: `${reaction.x}%`,
              transform: `rotate(${reaction.theta}rad) scale(${reaction.scale})`,
            }}
          >
            {reaction.kind === "like" ? <> 👍 </> : <> 💛</>}
          </div>
        ))}
      </div>
    </div>
  );
};
