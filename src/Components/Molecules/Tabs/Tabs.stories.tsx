import Tabs, { TabsProps } from "./Tabs";
import { Story, Meta } from "@storybook/react";
import Tab from "../Tab/Tab";

export default {
  title: "Molecules/Tabs",
  component: Tabs,
  argTypes: {
    labels: {
      name: "Labels",
      type: { required: true, type: [] },
      defaultValue: [],
    },
  },
} as Meta;

const Template: Story<TabsProps> = (args) => (
  <Tabs {...args}>
    <Tab>tab 1</Tab>
    <Tab>tab 2</Tab>
  </Tabs>
);

export const Default = Template.bind({});
Default.args = {
  labels: ["label 1", "label 2"],
};
