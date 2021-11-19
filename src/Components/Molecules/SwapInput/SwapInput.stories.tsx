import React from "react";
import SwapInput, { SwapInputProps } from "./SwapInput";
import { Story, Meta } from "@storybook/react";
import MaxCurrencyInput from "../MaxCurrencyInput/MaxCurrencyInput";
import TokenAvatar from "../../Atoms/TokenAvatar/TokenAvatar";

export default {
  title: "Molecules/SwapInput",
  subcomponents: { SwapInput },
  argTypes: {
    value: {
      name: "Value",
      type: {
        name: "string",
      },
    },
  },
} as Meta;

const Template: Story<SwapInputProps> = (args) => (
  <SwapInput {...args}>
    <TokenAvatar
      caption="SEC"
      imgSrc="https://upload.wikimedia.org/wikipedia/commons/b/be/Ecosia-like_logo.svg"
    />
    <MaxCurrencyInput
      value="0.0"
      type="text"
      placeholder="0.0"
      name="from"
      maxValue="123"
      onChange={(e) => console.log(`e`, e)}
    />
  </SwapInput>
);

export const SwapInputFrom = Template.bind({});
SwapInputFrom.args = {
  onChange: (val: any) => console.log(`val`, val),
  label: "Swap from",
};

export const SwapInputTo = Template.bind({});
SwapInputTo.args = {
  // children: "I'm an input",
  // placeholder: "placeholder",
  // value: "0.21",
  // maxValue: "0.666",
  // name: "this be monies",
  onChange: (val: any) => console.log(`val`, val),
};
