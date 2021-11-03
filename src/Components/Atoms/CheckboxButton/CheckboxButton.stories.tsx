import CheckboxButton, { CheckboxButtonProps } from "./CheckboxButton";
import { Story, Meta } from "@storybook/react";

export default {
  title: "Atoms/CheckboxButton",
  component: CheckboxButton,
} as Meta;

const Template: Story<CheckboxButtonProps> = (args) => (
  <CheckboxButton {...args} />
);

export const DefaultCheckboxButton = Template.bind({});
DefaultCheckboxButton.args = {
  children: "I am a checkbox label",
  name: "option group",
  value: "option 1",
  onChange: (val) => console.log(`val`, val),
};

export const DisabledCheckboxButton = Template.bind({});
DisabledCheckboxButton.args = {
  children: "I am a checkbox label",
  name: "option group",
  value: "yes",
  disabled: true,
  onChange: (val) => console.log(`val`, val),
};
