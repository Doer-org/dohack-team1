function Avatar() {
  return (
    <img
      className="avatar"
      alt="Lin Lanying"
      src="https://i.imgur.com/1bX5QH6.jpg"
      style={{
        borderRadius: "50%",
      }}
      width={100}
      height={100}
    />
  );
}

export default function Profile() {
  return <Avatar />;
}
