import Input, { InputFieldProps } from "./Input";
import { Story, Meta } from "@storybook/react";

export default {
  title: "Atoms/Input",
  component: Input,
} as Meta;

const Template: Story<InputFieldProps> = (args) => <Input {...args} />;

export const TextInputField = Template.bind({});
TextInputField.args = {
  children: "I'm an input",
  placeholder: "placeholder",
  changeHandler: (val) => console.log(`val`, val),
};

export const DisabledTextInputField = Template.bind({});
DisabledTextInputField.args = {
  children: "I'm an input",
  placeholder: "placeholder",
  disabled: true,
  changeHandler: (val) => console.log(`val`, val),
};

// export const Secondary = Template.bind({});
// Secondary.args = {
//   children: "I'm an outline button",
//   variant: "secondary",
// };

// export const Disabled = Template.bind({});
// Disabled.args = {
//   children: "I'm disabled",
//   variant: "primary",
//   disabled: true,
// };

// export const Small = Template.bind({});
// Small.args = {
//   size: "xs",
//   children: "I'm small",
//   variant: "primary",
// };

// export const Largest = Template.bind({});
// Largest.args = {
//   size: "xl",
//   children: "I'm largest",
//   variant: "primary",
// };
