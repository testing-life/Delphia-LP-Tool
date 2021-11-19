import React from "react";
import SwapSummary, { SwapSummaryProps } from "./SwapSummary";
import { Story, Meta } from "@storybook/react";
import SwapSummaryItem from "../SwapSummaryItem/SwapSummaryItem";
import { QuestionMarkCircleIcon } from "@heroicons/react/solid";
import ReactTooltip from "react-tooltip";

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
    <SwapSummaryItem label="You receive" value="0 CRD">
      <>
        <QuestionMarkCircleIcon
          className="w-6 h-6 text-gray-400 ml-2"
          data-tip
          data-for="tooltip-trigger1"
        />
        <ReactTooltip
          clickable={true}
          id="tooltip-trigger1"
          effect="solid"
          place="bottom"
        >
          <span>This much</span>
        </ReactTooltip>
      </>
    </SwapSummaryItem>
    <SwapSummaryItem label="You also receive" value="0 CRD">
      <>
        <QuestionMarkCircleIcon
          className="w-6 h-6 text-gray-400 ml-2"
          data-tip
          data-for="tooltip-trigger2"
        />
        <ReactTooltip
          clickable={true}
          id="tooltip-trigger2"
          effect="solid"
          place="bottom"
        >
          <span>This much also</span>
        </ReactTooltip>
      </>
    </SwapSummaryItem>
  </SwapSummary>
);

export const SwapSummaryDefault = Template.bind({});
