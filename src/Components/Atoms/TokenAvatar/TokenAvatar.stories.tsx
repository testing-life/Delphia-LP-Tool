import React from "react";
import TokenAvatar, { TokenAvatarProps } from "./TokenAvatar";
import { Story, Meta } from "@storybook/react";

export default {
  title: "Atoms/TokenAvatar",
  component: TokenAvatar,
  argTypes: {
    caption: {
      name: "Caption",
      required: true,
      defaultValue: "SEC",
    },
    imgSrc: {
      type: "string",
      required: true,
    },
  },
} as Meta;

const Template: Story<TokenAvatarProps> = (args) => <TokenAvatar {...args} />;

export const TokenAvatarTemplate = Template.bind({});
TokenAvatarTemplate.args = {
  imgSrc:
    "https://upload.wikimedia.org/wikipedia/commons/b/be/Ecosia-like_logo.svg",
  caption: "SEC",
};
