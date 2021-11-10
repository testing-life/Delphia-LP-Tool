import React from "react";
import AvatarLink, { AvatarLinkProps } from "./AvatarLink";
import { Story, Meta } from "@storybook/react";

export default {
  title: "Atoms/AvatarLink",
  component: AvatarLink,
  argTypes: {
    size: {
      name: "Size",
      required: "false",
      defaultValue: "default",
    },
    imgSrc: {
      type: "string",
      required: true,
    },
  },
} as Meta;

const Template: Story<AvatarLinkProps> = (args) => <AvatarLink {...args} />;

export const AvatarLinkTemplate = Template.bind({});
AvatarLinkTemplate.args = {
  imgSrc:
    "https://upload.wikimedia.org/wikipedia/commons/b/be/Ecosia-like_logo.svg",
  onClick: () => console.log(`navigate somewhere`),
};
