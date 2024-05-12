"use client";
import { Post, ReactionProps } from "@/components";

import { Box, Container, Flex, Heading } from "@radix-ui/themes";
import { relative } from "path";
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
        今何思った？
        <textarea
          ref={textAreaRef}
          style={{
            width: "100%",
            height: "5rem",
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
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
        }}
      >
        <input
          type="submit"
          value="post"
          style={{
            fontWeight: "normal",
            fontFamily: "fantasy",
            padding: "0.5rem 1.5rem",
            borderRadius: "1rem",
            border: "double 10px pink",
            backgroundColor: "hotpink",
          }}
        />
      </div>
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
            <Heading
              size="8"
              style={{
                fontWeight: "900",
                padding: "0.5rem 1.5rem",
                border: "dashed 2px pink",
                borderRadius: "1rem",
              }}
            >
              {" "}
              いっぱい リアクト！
            </Heading>
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
                const kinds: ReactionProps[] = [
                  { kind: "like" },
                  { kind: "love" },
                  { kind: "dog" },
                  { kind: "clover" },
                ];
                const kindIndex = Math.floor(Math.random() * kinds.length);
                const newPosts = [...posts];
                newPosts[index].reactions.push({
                  kind: kinds[kindIndex].kind,
                  x: x * 100,
                  y: y * 100,
                  theta: Math.random() - 0.5,
                  scale: Math.random() * 2 + 1,
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
