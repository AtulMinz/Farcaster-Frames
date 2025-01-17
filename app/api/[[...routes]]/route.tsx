/** @jsxImportSource frog/jsx */

import { Button, Frog, TextInput } from "frog";
import { devtools } from "frog/dev";
// import { neynar } from 'frog/hubs'
import { handle } from "frog/next";
import { serveStatic } from "frog/serve-static";
import { Box, Heading, VStack, Text } from "../../components/ui";

const app = new Frog({
  assetsPath: "/",
  basePath: "/api",
  // Supply a Hub to enable frame verification.
  // hub: neynar({ apiKey: 'NEYNAR_FROG_FM' })
  // hub: pinata(); from "frog/hub" when pushing in production.
  title: "Frog Frame",
});

// Uncomment to use Edge Runtime
// export const runtime = 'edge'

app.frame("/", (c) => {
  return c.res({
    action: "/foo",
    image: "/redblue.jpg",
    imageAspectRatio: "1:1",
    intents: [
      <Button value="A">A</Button>,
      <Button value="B">B</Button>,
      <Button.Reset>Reset</Button.Reset>,
    ],
  });
});

app.frame("/foo", (c) => {
  // use verified property in context(c) to check before passing.
  const { buttonValue } = c;

  if (buttonValue === "A") {
    return c.res({
      action: "/pill/a",
      image: "http://localhost:3000/api/pill/a",
      imageAspectRatio: "1:1",
      intents: [
        <TextInput placeholder="text" />,
        <Button value="generate">Generate</Button>,
      ],
    });
  }
  return c.res({
    action: "/pill/b",
    image: "http://localhost:3000/api/pill/b",
    imageAspectRatio: "1:1",
    intents: [
      <TextInput placeholder="text" />,
      <Button value="generate">Generate</Button>,
    ],
  });
});

app.frame("/pill/:id", (c) => {
  const id = c.req.param("id");

  const { frameData } = c;
  const { inputText = "" } = frameData || {};

  const newSearchParams = new URLSearchParams({
    text: inputText,
  });

  if (id === "a") {
    return c.res({
      action: "/",
      image: `http://localhost:3000/api/pill/a?${newSearchParams}`,
      imageAspectRatio: "1:1",
      intents: [<Button.Reset>Reset 🔄</Button.Reset>],
    });
  }
  return c.res({
    action: "/",
    image: `http://localhost:3000/api/pill/b?${newSearchParams}`,
    imageAspectRatio: "1:1",
    intents: [<Button>Start Over 🔄</Button>],
  });
});

devtools(app, { serveStatic });

export const GET = handle(app);
export const POST = handle(app);
// NOTE: That if you are using the devtools and enable Edge Runtime, you will need to copy the devtools
// static assets to the public folder. You can do this by adding a script to your package.json:
// ```json
// {
//   scripts: {
//     "copy-static": "cp -r ./node_modules/frog/_lib/ui/.frog ./public/.frog"
//   }
// }
// ```
// Next, you'll want to set up the devtools to use the correct assets path:
// ```ts
// devtools(app, { assetsPath: '/.frog' })
// ```
