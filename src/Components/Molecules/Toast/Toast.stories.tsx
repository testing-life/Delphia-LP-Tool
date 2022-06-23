import Toast, { ToastProps } from "./Toast";
import { Story, Meta } from "@storybook/react";
import { BrowserRouter } from "react-router-dom";

export default {
  title: "Molecules/Toast",
  component: Toast,
};
const Template: Story<ToastProps> = (args) => <Toast {...args} />;

export const ToastSuccess = Template.bind({});
ToastSuccess.args = {
  variant: "success",
  message: "Transaction successfull",
  etherscanUrl: "https://ecosia.org",
  onClose: () => console.log(`close toast`),
};

export const ToastError = Template.bind({});
ToastError.args = {
  variant: "error",
  message: "Transaction error",
  etherscanUrl: "https://ecosia.org",
  onClose: () => console.log(`close toast`),
};
