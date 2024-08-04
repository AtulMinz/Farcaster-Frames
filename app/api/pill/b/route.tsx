import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const hasText = searchParams.has("text");
  const text = hasText ? searchParams.get("text")?.slice(0, 100) : "";

  const imageData = await fetch(
    new URL(
      "https://i.pinimg.com/736x/b1/18/56/b11856dc3f5b3f14f62ebd1e2cf2fbdd.jpg",
      import.meta.url
    )
  );

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          background: "#f6f6f6",
          width: "100%",
          height: "100%",
          flexDirection: "column",
          justifyContent: "flex-end",
          alignItems: "center",
          position: "relative",
        }}
      >
        {/* @ts-ignore */}
        <img width="1200" height="630" alt="meme" src={imageData} />
        <p
          style={{
            position: "absolute",
            margin: 0,
            paddingBottom: 20,
            color: "#ffffff",
            lineHeight: 1,
            fontSize: 100,
            fontFamily: '"Oswald Bold"',
            textAlign: "center",
            textTransform: "uppercase",
            textShadow:
              "5px 5px 3px #000, -5px 5px 3px #000, -5px -5px 0 #000, 5px -5px 0 #000",
          }}
        >
          {text}
        </p>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
