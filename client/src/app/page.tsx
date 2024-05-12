"use client";
import { Post, ReactionProps } from "@/components";

import { Box, Container, Flex, Heading } from "@radix-ui/themes";
import { relative } from "path";
import { FormEventHandler, useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { locations, posts, reactions } from "@/migrations/schema";

type SelectPost = typeof posts.$inferSelect;
const getPosts = async () => {
  const r = await fetch("/api/posts", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const locs = (await r.json()) as SelectPost[];
  return locs;
};

type InsertPostRequest = typeof posts.$inferInsert;
const insertPostApi = async (postData: InsertPostRequest) => {
  return fetch("/api/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(postData),
  });
};

type Reaction = typeof reactions.$inferSelect;
const getReactions = async () => {
  const r = await fetch("/api/reactions", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const locs = (await r.json()) as Reaction[];
  return locs;
};

type InsertReactionRequest = typeof reactions.$inferInsert;
const insertReactionApi = async (postData: InsertReactionRequest) => {
  return fetch("/api/reactions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(postData),
  });
};

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
  // toDo postを取得する

  
  const [posts, setPosts] = useState<Post[]>([]);
  useEffect(()=>{
    getPosts().then((ps)=>{
      getReactions().then((rs)=>{
        const postIdtoReactions = rs.reduce((acc: {[key:string]:Reaction[]},item)=>{
          if (!acc[item.postId]){
            acc[item.postId] = []
          }
          acc[item.postId].push(item)
          return acc
        },{})
        console.log(ps)
        console.log(postIdtoReactions)
        setPosts(ps.map((p)=>{
          if (!(p.postId && postIdtoReactions[p.postId])) {
            return {
              postId: p.postId,
              contents: p.contents,
              reactions: []
            }
          }else{
            return {
              postId: p.postId,
              contents: p.contents,
              //reactions: [] //リアクションナシはこれで動く
              reactions: postIdtoReactions[p.postId].map((r)=>({
                kind: r.kind as ("like" | "love" | "dog" | "clover"),
                x: r.x,
                y: r.y,
                theta: r.theta,
                scale: r.scale
              }))
              // reactions: postIdtoReactions[p.postId].map((r)=>({
              //   kind: r.kind as ("like" | "love" | "dog" | "clover"),
              //   x: r.x,
              //   y: r.y,
              //   theta: r.theta,
              //   scale: r.scale
              // }))
          }
          }
        }))
      })
      
    })
  },[])
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
            // toDo:ここでPostのインサートAPIをたたく
            insertPostApi({
              postId: id,
              contents: str
            })
            setPosts([
              {
                postId: id,
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
              
              onClick={(x, y, postId) => {
                const kinds: ReactionProps[] = [
                  { kind: "like" },
                  { kind: "love" },
                  { kind: "dog" },
                  { kind: "clover" },
                ];
                const kindIndex = Math.floor(Math.random() * kinds.length);
                const newPosts = [...posts];
                const id = uuidv4()
                const newReaction = {
                  reactionId: id,
                  kind: kinds[kindIndex].kind,
                  x: x * 100,
                  y: y * 100,
                  theta: Math.random() - 0.5,
                  scale: Math.random() * 2 + 1,
                }
                // toDo reactionのインサートAPIをたたく
                insertReactionApi({
                  postId: postId,
                  ...newReaction
                })
                newPosts[index].reactions.push(newReaction);
                setPosts(newPosts);
              }}
            />
          ))}
        </Flex>
      </Container>
    </>
  );
}
