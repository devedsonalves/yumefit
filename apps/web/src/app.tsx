import { healthMessage } from "@repo/core";

export function App() {
  return (
    <main style={{ fontFamily: "sans-serif", padding: 24 }}>
      <h1>ForgeFit Web</h1>
      <p>{healthMessage()}</p>
    </main>
  );
}
