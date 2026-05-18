const fs = require('fs');
let css = fs.readFileSync('src/index.css', 'utf8');

// Insert root variables and tailwind theme at the top, just after @import
const rootVars = `
:root {
  --bg-base:      #0f0f13;
  --bg-surface:   #18181f;
  --bg-elevated:  #22222d;
  --border:       #2e2e3d;
  --text-primary: #f0f0f5;
  --text-muted:   #8888a0;
  --accent:       #7c6ff7;
  --accent-hover: #6358e0;
  --accent-glow:  rgba(124,111,247,0.25);
}

@theme {
  --color-bg-base: var(--bg-base);
  --color-bg-surface: var(--bg-surface);
  --color-bg-elevated: var(--bg-elevated);
  --color-border: var(--border);
  --color-text-primary: var(--text-primary);
  --color-text-muted: var(--text-muted);
  --color-accent: var(--accent);
  --color-accent-hover: var(--accent-hover);
  --color-accent-glow: var(--accent-glow);
}

@keyframes slotSpin {
  0%   { transform: translateY(-4px); opacity: 0.7; }
  50%  { transform: translateY(4px);  opacity: 1;   }
  100% { transform: translateY(-4px); opacity: 0.7; }
}

@keyframes resultPop {
  0%   { transform: scale(0.5); opacity: 0; }
  70%  { transform: scale(1.08); opacity: 1; }
  100% { transform: scale(1);    opacity: 1; }
}

@keyframes slideInRight {
  from { transform: translateX(30px); opacity: 0; }
  to   { transform: translateX(0);    opacity: 1; }
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-3px); }
  75% { transform: translateX(3px); }
}

@keyframes glowPulse {
  0%, 100% { box-shadow: 0 0 20px var(--accent-glow); }
  50%       { box-shadow: 0 0 50px var(--accent-glow), 0 0 80px var(--accent-glow); }
}
`;
css = css.replace('@import "tailwindcss";', '@import "tailwindcss";\n' + rootVars);

// Replace colors
css = css.replace(/background:\s*#f0f0f5;/g, 'background: var(--bg-base);');
css = css.replace(/color:\s*#1a1a2e;/g, 'color: var(--text-primary);');
css = css.replace(/background:\s*#ffffff;/g, 'background: var(--bg-surface);');
css = css.replace(/border-right:\s*1px solid #e2e2ee;/g, 'border-right: 1px solid var(--border);');
css = css.replace(/border-bottom:\s*1px solid #f0f0f8;/g, 'border-bottom: 1px solid var(--border);');
css = css.replace(/background:\s*linear-gradient\(135deg, #3c3489 0%, #5147c7 100%\);/g, 'background: var(--bg-surface);');
css = css.replace(/color:\s*white;/g, 'color: var(--text-primary);');
css = css.replace(/color:\s*#9898b0;/g, 'color: var(--text-muted);');
css = css.replace(/border:\s*1.5px solid #e2e2ee;/g, 'border: 1.5px solid var(--border);');
css = css.replace(/color:\s*#1a1a2e;/g, 'color: var(--text-primary);');
css = css.replace(/background:\s*#fafafd;/g, 'background: var(--bg-elevated);');
css = css.replace(/border-color:\s*#5147c7;/g, 'border-color: var(--accent);');
css = css.replace(/background:\s*#fff;/g, 'background: var(--bg-surface);');
css = css.replace(/color:\s*#aaa;/g, 'color: var(--text-muted);');
css = css.replace(/border:\s*1.5px solid #e8e8f0;/g, 'border: 1.5px solid var(--border);');
css = css.replace(/border-color:\s*#c5c0f0;/g, 'border-color: var(--accent-hover);');
css = css.replace(/background:\s*#f3f2fe;/g, 'background: var(--bg-elevated);');
css = css.replace(/background:\s*#eeedfe;/g, 'background: rgba(124, 111, 247, 0.15);');
css = css.replace(/color:\s*#3a3a55;/g, 'color: var(--text-primary);');
css = css.replace(/color:\s*#3c3489;/g, 'color: var(--accent);');
css = css.replace(/color:\s*#888;/g, 'color: var(--text-muted);');
css = css.replace(/background:\s*linear-gradient\(to right, #5147c7 0%, #5147c7 var\(--pct, 60%\), #e2e2ee var\(--pct, 60%\), #e2e2ee 100%\);/g, 'background: linear-gradient(to right, var(--accent) 0%, var(--accent) var(--pct, 60%), var(--border) var(--pct, 60%), var(--border) 100%);');
css = css.replace(/background:\s*#5147c7;/g, 'background: var(--accent);');
css = css.replace(/box-shadow:\s*0 2px 6px rgba\(81,71,199,0\.4\);/g, 'box-shadow: 0 2px 6px var(--accent-glow);');
css = css.replace(/box-shadow:\s*0 2px 10px rgba\(81,71,199,0\.6\);/g, 'box-shadow: 0 2px 10px var(--accent-glow);');
css = css.replace(/color:\s*#666;/g, 'color: var(--text-muted);');
css = css.replace(/background:\s*#f0effd;/g, 'background: rgba(124, 111, 247, 0.1);');
css = css.replace(/background:\s*#e8e8f0;/g, 'background: var(--bg-base);');

// specific fix for preview-count background and white elements inside Molde Alfabeto
css = css.replace(/background:\s*white;/g, 'background: var(--bg-surface);');
css = css.replace(/\.page-sheet-wrapper \{\n  width: 540px;\n  height: 763px;\n  position: relative;\n  flex-shrink: 0;\n  box-shadow: 0 4px 24px rgba\(0,0,0,0\.15\);\n  border-radius: 3px;\n  background: var\(--bg-surface\);/g, '.page-sheet-wrapper {\n  width: 540px;\n  height: 763px;\n  position: relative;\n  flex-shrink: 0;\n  box-shadow: 0 4px 24px rgba(0,0,0,0.15);\n  border-radius: 3px;\n  background: white;');

fs.writeFileSync('src/index.css', css);
