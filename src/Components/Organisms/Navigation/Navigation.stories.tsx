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
            onClick={() => console.log(`clicked`)}
            transactionCount={4}
          />
          <ConnectedWalletDetails
            balances={
              [
                {
                  SEC: "1000000.0",
                },
                {
                  CRD: "0.0",
                },
                {
                  ETH: "2.999075712884748674",
                },
              ] as any
            }
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
