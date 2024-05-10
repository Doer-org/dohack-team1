import type { Meta, StoryObj } from "@storybook/react";
import { Post } from ".";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Components/Post",
  component: Post,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  // argTypes: {
  //   backgroundColor: { control: "color" },
  // },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  // args: { onClick: fn() },
} satisfies Meta<typeof Post>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    post: {
      contents: "hello world",
      reactions: [
        { kind: "like", x: 130, y: 20, theta: 0.25, scale: 3 },
        { kind: "love", x: 50, y: -20, theta: 0, scale: 2 },
        { kind: "like", x: 0, y: 0, theta: 0, scale: 1 },
        { kind: "like", x: 0, y: 0, theta: 0, scale: 1 },
      ],
    },
  },
};
