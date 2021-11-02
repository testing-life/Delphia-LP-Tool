import Button, { ButtonProps } from "./Button";
import { Story, Meta } from "@storybook/react";

export default {
  title: "Atoms/Button",
  component: Button,
} as Meta;

const Template: Story<ButtonProps> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  variant: "primary",
  children: "Is a button",
};

export const Secondary = Template.bind({});
Secondary.args = {
  children: "Is an outline button",
  variant: "secondary",
};

export const Disabled = Template.bind({});
Disabled.args = {
  children: "i'm disabled",
  variant: "primary",
  disabled: true,
};

export const Small = Template.bind({});
Small.args = {
  size: "xs",
  children: "i'm small",
  variant: "primary",
};

export const Largest = Template.bind({});
Largest.args = {
  size: "xl",
  children: "i'm largest",
  variant: "primary",
};
