import * as React from "react";
import {createElement} from "react";
// import { useMediaQuery } from '@mui/material';
import {Menu, useResourceDefinitions} from "react-admin";
// import LabelIcon from '@mui/icons-material/Label';

export const CustomMenu = () => {
  // const isXSmall = useMediaQuery(theme => theme.breakpoints.down('xs'));
  const resources = useResourceDefinitions();

  return (
    <Menu>
      {Object.keys(resources).map((name) => (
        <Menu.Item
          key={name}
          to={`/${name}`}
          primaryText={
            (resources[name].options && resources[name].options.label) || name
          }
          leftIcon={createElement(resources[name].icon)}
        />
      ))}
    </Menu>
  );
};
export default CustomMenu;
