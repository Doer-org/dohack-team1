"use client";
import { locations, posts, reactions } from "@/migrations/schema";
import { useEffect, useState } from "react";
import { InsertForm } from "./_components/insert-form";
import { v4 as uuidv4 } from 'uuid';
import { like } from "drizzle-orm";

type Location = typeof locations.$inferSelect;
const getLocations = async () => {
  const r = await fetch("/api/locations", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const locs = (await r.json()) as Location[];
  return locs;
};

type InsertLocationRequest = typeof locations.$inferInsert;
const insertLocationApi = (r: InsertLocationRequest) => {
  return fetch("/api/locations", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(r),
  });
};

type Post = typeof posts.$inferSelect;
const getPosts = async () => {
  const r = await fetch("/api/posts", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const locs = (await r.json()) as Post[];
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

export default function Page() {
  const [locations, setLocations] = useState<Location[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [reactions, setReactions] = useState<Reaction[]>([]);

  useEffect(() => {
    const fetchLocations = async () => {
      const locs = await getLocations();
      setLocations(locs);
    };
    const fetchPosts = async () => {
      const fetchedPosts = await getPosts();
      setPosts(fetchedPosts);
    };
    const fetchReactions = async () => {
      const fetchedReactions = await getReactions();
      setReactions(fetchedReactions);
    };

    fetchLocations();
    fetchPosts();
    fetchReactions();
  }, []);

  return (
    <>
      {locations.map((location) => (
        <div key={location.locationId}>
          {location.locationId}: {location.prefecture} {location.city}
        </div>
      ))}
      <InsertForm
        onSubmit={async (id) => {
          const newLoc = {
            locationId: id,
            prefecture: "tttt",
            city: "cccc",
          };
          const resp = await insertLocationApi(newLoc);
          if (resp.ok) {
            setLocations([...locations, newLoc]);
          }
        }}
      />
      {posts.map((post) => (
        <div key={post.postId}>
          {post.postId}: {post.contents}
        </div>
      ))}
      <InsertForm
        onSubmit={async (con) => {
          const id = uuidv4();
          const newPost = {
            postId: id,
            contents: con,
          };
          const response = await insertPostApi(newPost);
          if (response.ok) {
            setPosts([...posts,newPost]);
          }
        }}
      />

      {reactions.map((reaction) => (
        <div key={reaction.reactionId}>
          {reaction.reactionId}: {reaction.postId} {reaction.kind} {reaction.x} {reaction.y} {reaction.theta} {reaction.scale}  
        </div>
      ))}
      <InsertForm
        onSubmit={async (pid) => {
          const id = uuidv4();
          const newReaction = {
            reactionId: id,
            postId: pid,
            kind: "like",
            x: 2,
            y: 2,
            theta: 2,
            scale: 2
          };
          const response = await insertReactionApi(newReaction);
          if (response.ok) {
            setReactions([...reactions,newReaction]);
          }
        }}
      />
    </>
  );
}
