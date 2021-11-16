import Navigation from "./Navigation";
import { Story, Meta } from "@storybook/react";
import AvatarLink from "../../Atoms/AvatarLink/AvatarLink";
import IconButton from "../../Atoms/IconButton/IconButton";
import { DotsVerticalIcon } from "@heroicons/react/solid";
import { BrowserRouter } from "react-router-dom";
import Button from "../../Atoms/Button/Button";
import ConnectedWalletDetails from "../../Molecules/ConnectedWalletDetails/ConnectedWalletDetails";
import TransactionStatusLink from "../../Molecules/TransactionStatusLink/TransactionStatusLink";

export default {
  title: "Organisms/Navigation",
  component: Navigation,
  subcomponents: { AvatarLink, IconButton, ConnectedWalletDetails },
} as Meta;

const Template: Story = (args) => (
  <BrowserRouter>
    <Navigation
      leftAligned={
        <AvatarLink
          path="/"
          imgSrc="https://duckduckgo.com/assets/icons/meta/DDG-icon_256x256.png"
        />
      }
      rightAligned={
        <>
          <TransactionStatusLink
            path="https://ecosia.org"
            transactionCount={4}
          />
          <ConnectedWalletDetails
            balances={{ SEC: 234, ETH: 323, CRD: 0.3242 }}
            connectedAddress="0x1234...xx8f"
          />
          <Button variant="primary">Connect Wallet</Button>
          <IconButton onClick={() => {}}>
            <DotsVerticalIcon className="h-6 w-6 text-black" />
          </IconButton>
        </>
      }
      {...args}
    ></Navigation>
  </BrowserRouter>
);

export const KitchenSink = Template.bind({});