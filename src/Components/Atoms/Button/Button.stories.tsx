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
  children: "I'm a button",
};

export const Secondary = Template.bind({});
Secondary.args = {
  children: "I'm an outline button",
  variant: "secondary",
};

export const Disabled = Template.bind({});
Disabled.args = {
  children: "I'm disabled",
  variant: "primary",
  disabled: true,
};

export const Small = Template.bind({});
Small.args = {
  size: "xs",
  children: "I'm small",
  variant: "primary",
};

export const Largest = Template.bind({});
Largest.args = {
  size: "xl",
  children: "I'm largest",
  variant: "primary",
};

export const FullWidth = Template.bind({});
FullWidth.args = {
  children: "I'm longest",
  variant: "primary",
  fullWidth: true,
};
