import React from "react";
import SwapSummaryItem, { SwapSummaryItemProps } from "./SwapSummaryItem";
import { Story, Meta } from "@storybook/react";

export default {
  title: "Molecules/SwapSummaryItem",
  subcomponents: { SwapSummaryItem },
  argTypes: {
    value: {
      name: "Value",
      type: {
        name: "string",
      },
    },
  },
} as Meta;

const Template: Story<SwapSummaryItemProps> = (args) => (
  <SwapSummaryItem {...args}></SwapSummaryItem>
);

export const SwapSummaryItemWithoutTooltips = Template.bind({});
SwapSummaryItemWithoutTooltips.args = {
  label: "Current CRD Price",
  value: "0.15 SEC",
};
