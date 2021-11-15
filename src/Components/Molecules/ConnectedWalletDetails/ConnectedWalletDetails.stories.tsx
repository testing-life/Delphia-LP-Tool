import ConnectedWalletDetails, {
  ConnectedWalletDetailsProps,
} from "./ConnectedWalletDetails";
import { Story, Meta } from "@storybook/react";

export default {
  title: "Molecules/ConnectedWalletDetails",
  component: ConnectedWalletDetails,
} as Meta;

const Template: Story<ConnectedWalletDetailsProps> = (args) => (
  <ConnectedWalletDetails {...args}></ConnectedWalletDetails>
);

export const ConnectedWallet = Template.bind({});
ConnectedWallet.args = {
  balances: { SEC: 234, ETH: 323, CRD: 0.3242 },
  connectedAddress: "0x1234...xx8f",
};

export const IncorrectConnectedWallet = Template.bind({});
IncorrectConnectedWallet.args = {
  error: true,
  connectedAddress: "0x1234...xx8f",
};
