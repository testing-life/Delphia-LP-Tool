import React from "react";
import SwapSummaryItem, { SwapSummaryItemProps } from "./SwapSummaryItem";
import { Story, Meta } from "@storybook/react";
import { QuestionMarkCircleIcon } from "@heroicons/react/solid";
import ReactTooltip from "react-tooltip";

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

const TemplateTooltip: Story<SwapSummaryItemProps> = (args) => (
  <SwapSummaryItem {...args}>
    <>
      <QuestionMarkCircleIcon
        className="w-6 h-6 text-gray-400 ml-2"
        data-tip
        data-for="tooltip-trigger1"
      />
      <ReactTooltip
        id="tooltip-trigger1"
        clickable={true}
        effect="solid"
        place="bottom"
      >
        <span>Issa tooltip</span>
      </ReactTooltip>
    </>
  </SwapSummaryItem>
);

export const SwapSummaryItemWithoutTooltips = Template.bind({});
SwapSummaryItemWithoutTooltips.args = {
  label: "CRD Price",
  value: "0.15 SEC",
};

export const SwapSummaryItemWithTooltips = TemplateTooltip.bind({});
SwapSummaryItemWithTooltips.args = {
  label: "CRD Price",
  value: "0.15 SEC",
};
