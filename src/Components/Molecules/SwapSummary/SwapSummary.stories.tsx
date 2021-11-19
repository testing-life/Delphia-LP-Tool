import React from "react";
import SwapSummary, { SwapSummaryProps } from "./SwapSummary";
import { Story, Meta } from "@storybook/react";
import SwapSummaryItem from "../SwapSummaryItem/SwapSummaryItem";

export default {
  title: "Molecules/SwapSummary",
  subcomponents: { SwapSummaryItem },
} as Meta;

const Template: Story<SwapSummaryProps> = (args) => (
  <SwapSummary {...args}>
    <SwapSummaryItem
      label="Current CRD Price"
      value="0.15 SEC"
    ></SwapSummaryItem>
    <SwapSummaryItem label="You receive" value="0 CRD" />
  </SwapSummary>
);

export const SwapSummaryDefault = Template.bind({});
