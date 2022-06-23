import ConnectedWalletDetails, {
  ConnectedWalletDetailsProps,
} from "./ConnectedWalletDetails";
import { Story, Meta } from "@storybook/react";
import { TBalances } from "../../../Context/web3.context";

export default {
  title: "Molecules/ConnectedWalletDetails",
  component: ConnectedWalletDetails,
} as Meta;

const Template: Story<ConnectedWalletDetailsProps> = (args) => (
  <ConnectedWalletDetails {...args}></ConnectedWalletDetails>
);

export const ConnectedWallet = Template.bind({});
ConnectedWallet.args = {
  balances: [
    {
      SEC: "1000000.0",
    },
    {
      CRD: "0.0",
    },
    {
      ETH: "2.999075712884748674",
    },
  ] as any,
  connectedAddress: "0x1234...xx8f",
};

export const IncorrectConnectedWallet = Template.bind({});
IncorrectConnectedWallet.args = {
  error: true,
  connectedAddress: "0x1234...xx8f",
};
