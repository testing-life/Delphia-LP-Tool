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
  onChange: (val) => console.log(`val`, val),
};

export const DisabledTextInputField = Template.bind({});
DisabledTextInputField.args = {
  children: "I'm an input",
  placeholder: "placeholder",
  disabled: true,
  onChange: (val) => console.log(`val`, val),
};

export const ErroredTextInputField = Template.bind({});
ErroredTextInputField.args = {
  children: "I'm an input",
  placeholder: "placeholder",
  error: "I am an error message",
  onChange: (val) => console.log(`val`, val),
};

export const NumberInputField = Template.bind({});
NumberInputField.args = {
  children: "I'm a number input",
  placeholder: "placeholder",
  type: "number",
  onChange: (val) => console.log(`val`, val),
};

export const PasswordInputField = Template.bind({});
PasswordInputField.args = {
  children: "I'm a password input",
  placeholder: "placeholder",
  type: "password",
  onChange: (val) => console.log(`val`, val),
};
