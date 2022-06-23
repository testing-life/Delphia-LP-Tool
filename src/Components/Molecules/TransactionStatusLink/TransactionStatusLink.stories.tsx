import TransactionStatusLink, {
  TransactionStatusLinkProps,
} from "./TransactionStatusLink";
import { Story, Meta } from "@storybook/react";

export default {
  title: "Molecules/TransactionStatusLink",
  component: TransactionStatusLink,
} as Meta;

const Template: Story<TransactionStatusLinkProps> = (args) => (
  <TransactionStatusLink {...args} />
);

export const TransactionStatusLinkDefault = Template.bind({});
