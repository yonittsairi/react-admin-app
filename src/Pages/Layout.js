import { ContainerLayout, Header } from "@react-admin/ra-navigation";

const myAppBar = <Header color="primary" position="sticky" />;
export const MyLayout = (props) => (
  <ContainerLayout {...props} appBar={myAppBar} />
);
