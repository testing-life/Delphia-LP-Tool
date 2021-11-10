import React from "react";
import MaxCurrencyInput, { MaxCurrencyInputProps } from "./MaxCurrencyInput";
import { Story, Meta } from "@storybook/react";

export default {
  title: "Atoms/MaxCurrencyInput",
  component: MaxCurrencyInput,
  argTypes: {
    value: {
      name: "Value",
      type: {
        name: "string",
      },
    },
  },
} as Meta;

const Template: Story<MaxCurrencyInputProps> = (args) => (
  <MaxCurrencyInput {...args} />
);

export const MaxCurrencyInputTemplate = Template.bind({});
MaxCurrencyInputTemplate.args = {
  children: "I'm an input",
  placeholder: "placeholder",
  value: "0.21",
  maxValue: "0.666",
  name: "this be monies",
  onChange: (val: any) => console.log(`val`, val),
};
