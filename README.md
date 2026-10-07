# Preset Finder Frontend

Frontend Next.js untuk website pencari preset Alight Motion dari link TikTok.

## Jalankan

```bash
npm install
cp .env.example .env.local
npm run dev
```

Default API:

```env
NEXT_PUBLIC_API_URL=https://api.presetfinder.my.id
```

## Backend contract

Frontend mengirim:

```http
POST /api/search
Content-Type: application/json

{
  "url": "https://vt.tiktok.com/xxxxx/"
}
```

Backend diharapkan mengembalikan:

```json
{
  "success": true,
  "video": {
    "username": "username",
    "caption": "caption",
    "thumbnail": "https://...",
    "videoUrl": "https://..."
  },
  "stats": {
    "comments": 23,
    "views": 13000,
    "likes": 262
  },
  "presets": [
    {
      "type": "alight-motion",
      "format": "5MB",
      "source": "account",
      "username": "username",
      "title": "caption",
      "url": "https://alightcreative.com/..."
    }
  ]
}
```

Backend belum termasuk di paket ini.
