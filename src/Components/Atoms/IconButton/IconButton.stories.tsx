import React from "react";
import IconButton, { IconButtonProps } from "./IconButton";
import { Story, Meta } from "@storybook/react";
import { DotsVerticalIcon } from "@heroicons/react/solid";

export default {
  title: "Atoms/IconButton",
  component: IconButton,
  argTypes: { onClick: { action: "clicked" } },
} as Meta;

const Template: Story<IconButtonProps> = (args) => (
  <IconButton {...args}>
    <DotsVerticalIcon className="h-6 w-6 text-black" />
  </IconButton>
);

export const IconButtonTemplate = Template.bind({});
IconButtonTemplate.args = {
  onClick: () => console.log(`clicked`),
};

// full list of icons'
// https://unpkg.com/browse/@heroicons/react@1.0.5/outline/
