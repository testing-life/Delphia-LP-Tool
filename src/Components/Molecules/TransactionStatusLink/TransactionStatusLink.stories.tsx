import TransactionStatusLink, {
  TransactionStatusLinkProps,
} from "./TransactionStatusLink";
import { Story, Meta } from "@storybook/react";
import { BrowserRouter } from "react-router-dom";

export default {
  title: "Molecules/TransactionStatusLink",
  component: TransactionStatusLink,
} as Meta;

const Template: Story<TransactionStatusLinkProps> = (args) => (
  <BrowserRouter>
    <TransactionStatusLink {...args} />
  </BrowserRouter>
);

export const TransactionStatusLinkDefault = Template.bind({});
TransactionStatusLinkDefault.args = { path: "https://ecosia.org" };
