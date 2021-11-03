import RadioButton, { RadioButtonProps } from "./RadioButton";
import { Story, Meta } from "@storybook/react";

export default {
  title: "Atoms/RadioButton",
  component: RadioButton,
  decorators: [
    (Story) => (
      <ul>
        <li>
          <Story />
        </li>
        <li>
          <Story />
        </li>
      </ul>
    ),
  ],
} as Meta;

const Template: Story<RadioButtonProps> = (args) => <RadioButton {...args} />;

export const DefaultRadioButton = Template.bind({});
DefaultRadioButton.args = {
  children: "I am a radio label",
  name: "option group",
  value: "option 1",
  onChange: (val) => console.log(`val`, val),
};
