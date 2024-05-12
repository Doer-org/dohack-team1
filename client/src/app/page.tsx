"use client";
import { Post } from "@/components";

import { Box, Container, Flex, Heading } from "@radix-ui/themes";
import { FormEventHandler, useRef, useState } from "react";
import { v4 as uuidv4 } from 'uuid';

const PostForm = ({ onSubmit }: { onSubmit: (contents: string) => void }) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const contents = form.get("contents") || "";
    onSubmit(contents.toString());
    if (textAreaRef.current) {
      textAreaRef.current.value = "";
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <label>
        contents:
        <textarea
          ref={textAreaRef}
          style={{
            width: "100%",
            height: "10rem",
            padding: "1rem",
            fontSize: "1.25rem",
            borderRadius: "1rem",
            boxSizing: "border-box",
            resize: "none",
          }}
          name="contents"
          defaultValue=""
        />
      </label>
      <input type="submit" value="Submit" />
    </form>
  );
};

export default function Page() {
  const [posts, setPosts] = useState<Post[]>([]);
  return (
    <>
      <Container size="2" px="4" py="2" align="center">
        <Box py="5">
          <Box>
            <Heading size="8"> はっかそん</Heading>
          </Box>
        </Box>
        <PostForm
          onSubmit={(str) => {
            const id = uuidv4();
            setPosts([
              {
                contents: str,
                reactions: [],
              },
              ...posts,
            ]);
          }}
        />

        <Flex direction="row" gap="3" pt="6" wrap="wrap">
          {posts.map((post, index) => (
            <Post
              key={index}
              post={post}
              onClick={(x, y) => {
                const newPosts = [...posts];
                newPosts[index].reactions.push({
                  kind: "like",
                  x: x * 100,
                  y: y * 100,
                  theta: 0,
                  scale: 1.5,
                });
                setPosts(newPosts);
              }}
            />
          ))}
        </Flex>
      </Container>
    </>
  );
}
