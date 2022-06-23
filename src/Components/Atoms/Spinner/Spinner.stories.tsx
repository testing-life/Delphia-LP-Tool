import Spinner from "./Spinner";
import { Story, Meta } from "@storybook/react";

export default {
  title: "Atoms/Spinner",
  component: Spinner,
} as Meta;

const Template: Story = (args) => (
  <div style={{ padding: "100px", background: "blue" }}>
    <Spinner {...args} />;
  </div>
);
export const DefaultSpinner = Template.bind({});
