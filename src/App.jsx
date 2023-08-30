import {
  Admin,
  defaultTheme,
  Layout,
  Resource,
  useLocaleState,
} from "react-admin";
import { dataProvider } from "./Providers/DataProvider";
import Users from "./Components/Users/UsersIndex";
import { MyAppBar } from "./Components/AppBar";
import { createTheme } from "@mui/material";
import rtlPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import HobbiesIndex from "./Components/Hobbies/HobbiesIndex";

export const MyLayout = (props) => {
  const [locale, setLocale] = useLocaleState();
  if (locale === "he") {
    document.getElementsByTagName("body")[0].setAttribute("dir", "rtl");
    const data = document.querySelectorAll("body > *");
    data.forEach((box) => {
      box.style.textAlign = "right";
    });
    const data2 = document.querySelectorAll("label");

    data2.forEach((box) => {
      box.style.right = "0px";
    });
  } else {
    document.getElementsByTagName("body")[0].setAttribute("dir", "ltr");
    const data = document.querySelectorAll("body > *");
    const data2 = document.querySelectorAll("label");

    data2.forEach((box) => {
      box.style.left = "20px";
    });

    data.forEach((box) => {
      box.style.textAlign = "left";
    });
  }
  return <Layout {...props} appBar={MyAppBar} />;
};
const App = () => {
  const [language, setLocale] = useLocaleState();
  const theme = createTheme({
    ...defaultTheme,

    typography: {
      // Use the system font instead of the default Roboto font.
      fontFamily: [
        "-apple-system",
        "BlinkMacSystemFont",
        '"Segoe UI"',
        "Arial",
        "sans-serif",
      ].join(","),
    },
  });
  const cacheRtl = createCache({
    key: "muirtl",
    stylisPlugins: [prefixer, rtlPlugin],
  });
  const Resources = [
    <Resource name="user" list={Users.list} />,
    <Resource name="hobbies" create={HobbiesIndex.create} />,
  ];

  return (
    <CacheProvider value={cacheRtl}>
      <Admin
        title="Admin"
        dataProvider={dataProvider}
        theme={theme}
        layout={MyLayout}
      >
        {Resources}
      </Admin>
    </CacheProvider>
  );
};

export default App;
