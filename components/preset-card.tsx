type Preset = {
  type?: string;
  format?: string;
  size?: string;
  source?: string;
  username?: string;
  title?: string;
  url: string;
  thumbnail?: string;
};

export function PresetCard({ preset }: { preset: Preset }) {
  const isAlight = (preset.type || "").toLowerCase().includes("alight");
  const actionLabel = isAlight ? "Open preset" : "Get file";

  async function copy() {
    await navigator.clipboard.writeText(preset.url);
  }

  function open() {
    window.open(preset.url, "_blank", "noopener,noreferrer");
  }

  return (
    <article className="preset-card">
      <div className="thumb">
        {preset.thumbnail ? (
          <img src={preset.thumbnail} alt="" />
        ) : (
          <span>{preset.format || "LINK"}</span>
        )}
      </div>

      <div>
        <h4 className="preset-title">
          @{preset.username || "unknown"} — {preset.title || "Preset link"}
        </h4>

        <div className="badges">
          {preset.format && <span className="badge green">{preset.format}</span>}
          {preset.size && <span className="badge">{preset.size}</span>}
          {preset.source && (
            <span className="badge">
              BY {preset.source.toUpperCase()}
            </span>
          )}
        </div>

        {preset.username && (
          <div className="source">@{preset.username}</div>
        )}

        <div className="preset-url">{preset.url}</div>

        <div className="actions">
          <button className="action primary" onClick={open}>
            {actionLabel}
          </button>
          <button className="action" onClick={copy}>
            Copy link
          </button>
        </div>
      </div>
    </article>
  );
}