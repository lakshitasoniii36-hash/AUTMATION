# AI Agents & Automations

A premium, cinematic scroll-driven website showcasing AI Agents & Automations as an engineered intelligence system.

## Tech Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Framer Motion**
- **HTML5 Canvas**

## Features

### 🎬 Scroll-Linked Animation
- 180-frame sequence controlled by scroll position
- Smooth canvas rendering with proper aspect ratio
- Preloading with loading indicator
- 400vh scroll container for extended animation control

### 🎨 Premium Design
- Dark, technical aesthetic
- Pearl white typography
- Glassmorphic UI elements
- Smooth micro-animations

### 📱 Responsive
- Mobile-optimized layouts
- Touch-friendly navigation
- Adaptive typography

### 🧭 Navigation
- Fixed top-right navigation
- Hover-activated service dropdown
- Smooth scroll to sections
- No boxed buttons, rounded hit areas

### 📄 Page Sections

1. **Hero** - Full viewport intro with cinematic animation
2. **Benefits** - Explanation of AI agents and automations
3. **Services** - 6 services with descriptions and business benefits
4. **Enquiry** - Contact form with validation

### 📝 Scroll-Synced Text Overlays

Text appears at specific scroll positions:
- 0%: "AI Agents & Automations" (centered)
- 30%: "Autonomous decision-making replaces manual workflows" (left)
- 60%: "Internal intelligence layers coordinate in real time" (right)
- 90%: "Scalable systems. Secure by design." (centered)

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Add Your Frames

Place your 180 WebP frames in `/public/frames/` with this naming convention:

```
agent_system_0001.webp
agent_system_0002.webp
...
agent_system_0180.webp
```

**For Development:** Placeholder SVG frames have been generated. Replace with actual frames for production.

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### 4. Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
ai-agents-automations/
├── app/
│   ├── globals.css          # Global styles, theme variables
│   ├── layout.tsx            # Root layout with metadata
│   └── page.tsx              # Main page orchestration
├── components/
│   ├── ScrollCanvas.tsx      # Canvas-based frame renderer
│   ├── Navigation.tsx        # Top navigation with dropdown
│   ├── Hero.tsx              # Hero section
│   ├── Benefits.tsx          # Benefits/description section
│   ├── Services.tsx          # Services grid
│   ├── Enquiry.tsx           # Contact form
│   └── ScrollText.tsx        # Scroll-synced text overlays
├── public/
│   └── frames/               # Frame sequence (180 frames)
└── scripts/
    └── generate-placeholder-frames.js  # Dev placeholder generator
```

## Services Included

1. **Autonomous AI Agents** - Independent task execution
2. **Workflow Automation** - End-to-end process automation
3. **Customer Support Automation** - 24/7 AI-powered support
4. **Data Processing & Intelligence** - Automated insights
5. **System Integration Agents** - Multi-platform coordination
6. **Custom AI Agent Development** - Tailored solutions

## Key Implementation Details

### Canvas Animation
- Uses `useScroll` from Framer Motion
- Maps scroll progress (0-1) to frame index (0-179)
- Maintains aspect ratio with cover scaling
- Handles window resize
- Fallback to SVG for missing WebP frames

### Form Handling
- Client-side validation
- Email format validation
- Success state with auto-reset
- Console logging (ready for API integration)

### Performance
- All frames preloaded before animation starts
- High-quality canvas rendering
- Optimized re-renders with React hooks
- Smooth 60fps animations

## Customization

### Colors
Edit CSS variables in `app/globals.css`:

```css
:root {
  --background: #0a0a0a;
  --foreground: #ededed;
  --accent: #1a1a1a;
  --border: #2a2a2a;
  --pearl-white: #f8f8f8;
}
```

### Frame Count
Update in `app/page.tsx`:

```tsx
<ScrollCanvas
  totalFrames={180}  // Change this
  framePrefix="agent_system_"
  frameExtension="webp"
/>
```

### Services
Edit the `services` array in `components/Services.tsx`

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Notes

- Canvas background is **fixed** and spans the entire page
- Content scrolls **over** the animation
- No routing beyond single page
- SEO optimized with proper metadata
- Accessible with semantic HTML

## Production Checklist

- [ ] Replace placeholder frames with actual WebP frames
- [ ] Test on multiple devices and browsers
- [ ] Optimize frame file sizes (compress WebP)
- [ ] Add API endpoint for form submission
- [ ] Configure analytics
- [ ] Set up error tracking
- [ ] Add sitemap and robots.txt
- [ ] Configure CDN for frame delivery

## License

All rights reserved © 2026 AI Agents & Automations
