import Navigation from "./Navigation";
import { Story, Meta } from "@storybook/react";
import AvatarLink from "../../Atoms/AvatarLink/AvatarLink";
import IconButton from "../../Atoms/IconButton/IconButton";
import { DotsVerticalIcon } from "@heroicons/react/solid";
import { BrowserRouter } from "react-router-dom";
import Button from "../../Atoms/Button/Button";

export default {
  title: "Organisms/Navigation",
  component: Navigation,
  subcomponents: { AvatarLink, IconButton },
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
