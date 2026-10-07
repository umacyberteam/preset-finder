type Props = {
  result: {
    video?: {
      username?: string;
      caption?: string;
      thumbnail?: string;
      videoUrl?: string;
    };
    stats?: {
      comments?: number;
      views?: number;
      likes?: number;
    };
  };
};

function number(value?: number) {
  return new Intl.NumberFormat("en-US", { notation: "compact" }).format(value || 0);
}

export function VideoResult({ result }: Props) {
  const video = result.video;
  const stats = result.stats;

  return (
    <div className="video-card">
      <div className="video-preview">
        {video?.videoUrl ? (
          <video
            src={video.videoUrl}
            poster={video.thumbnail}
            controls
            playsInline
          />
        ) : video?.thumbnail ? (
          <img src={video.thumbnail} alt={video.caption || "TikTok preview"} />
        ) : (
          <div className="video-placeholder">No preview</div>
        )}
      </div>

      <div className="video-info">
        <p className="caption">
          {video?.caption || "TikTok video"}
        </p>

        <div className="stats">
          <div>
            <div className="stat-label">Account</div>
            <div className="stat-value">@{video?.username || "unknown"}</div>
          </div>
          <div>
            <div className="stat-label">Comments</div>
            <div className="stat-value">{number(stats?.comments)}</div>
          </div>
          <div>
            <div className="stat-label">Views</div>
            <div className="stat-value">{number(stats?.views)}</div>
          </div>
          <div>
            <div className="stat-label">Likes</div>
            <div className="stat-value">{number(stats?.likes)}</div>
          </div>
        </div>
      </div>
    </div>
  );
}