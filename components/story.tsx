import { Frame } from "@/components/frame";

export function Story() {
  return (
    <section className="section light" id="light">
      <div className="light-grid">
        <div className="section-head">
          <p className="kicker">The afternoon</p>
          <h2>Turn two chairs toward the breeze.</h2>
          <p className="section-lede">
            Tea, a book, and no plan until the light changes. When the rain
            starts, the clay tiles take over the conversation.
          </p>
        </div>
        <Frame
          shape="soft"
          plate="none"
          position="78% 42%"
          speed={18}
          sizes="(max-width: 979px) 92vw, 48vw"
          caption="Late light"
        />
      </div>
    </section>
  );
}
