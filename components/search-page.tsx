"use client";

import { FormEvent, useState } from "react";
import { Clipboard, Search, X } from "lucide-react";
import { PresetCard } from "./preset-card";
import { VideoResult } from "./video-result";

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

type SearchResult = {
  success: boolean;
  video?: {
    id?: string;
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
  presets?: Preset[];
  message?: string;
};

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "API_PUBLIC";

export default function SearchPage() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SearchResult | null>(null);
  const [error, setError] = useState("");

  async function submit(event: FormEvent) {
    event.preventDefault();
    if (!url.trim()) return;

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await fetch(`${API_URL}/api/search`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: url.trim() })
      });

      const data = await response.json();

      if (!response.ok || data.success === false) {
        throw new Error(data.message || "Search failed.");
      }

      setResult(data);
      setTimeout(
        () => document.getElementById("results")?.scrollIntoView({ behavior: "smooth" }),
        80
      );
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Could not connect to the backend."
      );
    } finally {
      setLoading(false);
    }
  }

  async function paste() {
    try {
      const text = await navigator.clipboard.readText();
      if (text) setUrl(text);
    } catch {}
  }

  return (
    <main className="page">
      <div className="container">
        <header className="header">
          <div className="brand">
            <div className="logo" aria-hidden />
            <h1>Preset Finder</h1>
          </div>
          <p className="tagline">
            Find Alight Motion presets from any TikTok link
          </p>
          <div className="byline">• By PresetFinder •</div>
        </header>

        <section>
          <div className="section-title">
            <h2>Find preset links</h2>
          </div>

          <form className="search-card" onSubmit={submit}>
            <div className="input-wrap">
              <Search size={24} />
              <input
                className="search-input"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://vt.tiktok.com/xxx"
                aria-label="TikTok URL"
              />
              {url && (
                <button
                  type="button"
                  className="clear-button"
                  onClick={() => setUrl("")}
                  aria-label="Clear"
                >
                  <X size={21} />
                </button>
              )}
            </div>

            <button className="primary-button" disabled={loading}>
              {loading ? "Scanning..." : "Search"}
            </button>
          </form>

          {!loading && !result && (
            <button
              type="button"
              className="action"
              style={{ marginTop: 12 }}
              onClick={paste}
            >
              <Clipboard size={17} style={{ verticalAlign: "middle", marginRight: 8 }} />
              Paste from clipboard
            </button>
          )}

          {error && <div className="error">{error}</div>}
          {loading && (
            <div className="loading">
              Scanning video, account, comments and replies...
            </div>
          )}
        </section>

        {!result && (
          <section className="steps">
            <p className="eyebrow">STEP BY STEP</p>
            {[
              "Paste a TikTok video link",
              "Preset Finder scans the video, bio and comments",
              "Preset links are extracted automatically",
              "Copy or open the preset you need"
            ].map((text, index) => (
              <div className="step" key={text}>
                <div className="step-number">{index + 1}</div>
                <p>{text}</p>
              </div>
            ))}
          </section>
        )}

        {result && (
          <section className="result-area" id="results">
            <VideoResult result={result} />

            <div className="preset-heading">
              <div className="line" />
              <h3>Preset links</h3>
              <div className="count">{result.presets?.length || 0}</div>
            </div>

            {result.presets?.map((preset, index) => (
              <PresetCard key={`${preset.url}-${index}`} preset={preset} />
            ))}

            {!result.presets?.length && (
              <div className="steps">
                <p className="eyebrow">NO LINKS FOUND</p>
                <p style={{ color: "#999aa0" }}>
                  No supported preset/file links were found in the scanned data.
                </p>
              </div>
            )}
          </section>
        )}
      </div>

      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div>
              <div className="brand">
                <div className="logo" aria-hidden />
                <h1>Preset Finder</h1>
              </div>
              <p>
                Paste a TikTok link and find Alight Motion preset links hidden
                in its description, bio, comments and replies.
              </p>
            </div>

            <div>
              <h4>EXPLORE</h4>
              <div className="footer-links">
                <a href="#">Search box</a>
                <a href="#results">Results</a>
              </div>
            </div>

            <div>
              <h4>ABOUT</h4>
              <div className="footer-links">
                <span>Free to use</span>
                <span>No sign-up</span>
                <span>No tracking</span>
              </div>
            </div>
          </div>

          <div className="copyright">
            © 2026 Preset Finder. Not affiliated with TikTok or Alight Motion.
          </div>
        </div>
      </footer>
    </main>
  );
}
