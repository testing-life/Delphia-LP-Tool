import RadioButton, { RadioButtonProps } from "./RadioButton";
import { Story, Meta } from "@storybook/react";

export default {
  title: "Atoms/RadioButton",
  component: RadioButton,
} as Meta;

const Template: Story<RadioButtonProps> = (args) => <RadioButton {...args} />;

export const DefaultRadioButton = Template.bind({});
DefaultRadioButton.args = {
  children: "I am a radio label",
  name: "option group",
  value: "option 1",
  onChange: (val) => console.log(`val`, val),
};

export const DisabledRadioButton = Template.bind({});
DisabledRadioButton.args = {
  children: "I am a disabled radio label",
  name: "disableGroup",
  value: "option 2",
  disabled: true,
  onChange: (val) => console.log(`val`, val),
};
