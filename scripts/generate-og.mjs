// Renders public/og.png (1200x630). Run: CHROMIUM=<path> node scripts/generate-og.mjs
import { chromium } from 'playwright';
import { fileURLToPath } from 'node:url';
const out = fileURLToPath(new URL('../public/og.png', import.meta.url));
const html = `<body style="margin:0;width:1200px;height:630px;background:#0b0d12;color:#f3f4f6;font-family:system-ui,sans-serif;display:flex;flex-direction:column;justify-content:center;padding:0 90px;box-sizing:border-box;border-top:12px solid #5eead4">
<div style="color:#5eead4;font:600 26px ui-monospace,monospace;letter-spacing:.05em">goal → PR → review → merge</div>
<div style="font-weight:800;font-size:128px;line-height:1;margin:28px 0 24px;letter-spacing:-.03em">Tony Martinez</div>
<div style="font-size:40px;line-height:1.3;color:#c9ced6;max-width:940px">Frontend &amp; accessibility engineer running a fleet of AI agents that build and ship projects end to end.</div></body>`;
const b = await chromium.launch({ executablePath: process.env.CHROMIUM || undefined });
const p = await b.newPage({ viewport: { width: 1200, height: 630 } });
await p.setContent(html);
await p.screenshot({ path: out });
await b.close();
