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

// export const Large = Template.bind({});
// Large.args = {
//   size: "large",
//   label: "Button",
// };

// export const Small = Template.bind({});
// Small.args = {
//   size: "small",
//   label: "Button",
// };
