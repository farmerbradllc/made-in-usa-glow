
// Build script for Made in USA Badge assets
const fs = require('fs');
const path = require('path');

// Create the dist directory if it doesn't exist
const distDir = path.join(__dirname, '../../dist/badge-assets');
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

// Generate the CSS for the badge
const generateCSS = () => {
  const css = `
/* Made in USA Badge v1.0.0 */
.made-in-usa-badge {
  position: absolute;
  z-index: 10;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 4px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
}

/* Positions */
.made-in-usa-badge--top-left { top: 10px; left: 10px; }
.made-in-usa-badge--top-right { top: 10px; right: 10px; }
.made-in-usa-badge--bottom-left { bottom: 10px; left: 10px; }
.made-in-usa-badge--bottom-right { bottom: 10px; right: 10px; }
.made-in-usa-badge--center { top: 50%; left: 50%; transform: translate(-50%, -50%); }

/* Styles */
.made-in-usa-badge--standard {
  background-color: #002868;
  color: white;
  border: 2px solid white;
  border-radius: 4px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.2);
}

.made-in-usa-badge--round {
  background-color: #002868;
  color: white;
  border: 2px solid white;
  border-radius: 9999px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.2);
}

.made-in-usa-badge--ribbon {
  background-color: #BF0A30;
  color: white;
  border-radius: 0 4px 4px 0;
  box-shadow: 0 2px 5px rgba(0,0,0,0.2);
}

.made-in-usa-badge--flag {
  background-image: repeating-linear-gradient(45deg, #BF0A30, #BF0A30 10px, #FFFFFF 10px, #FFFFFF 20px);
  color: #002868;
  border-radius: 4px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.2);
}

/* Sizes */
.made-in-usa-badge--sm { font-size: 12px; padding: 4px 8px; }
.made-in-usa-badge--md { font-size: 14px; padding: 6px 12px; }
.made-in-usa-badge--lg { font-size: 16px; padding: 8px 16px; }

/* Effects */
.made-in-usa-badge--animated { transition: transform 0.3s; }
.made-in-usa-badge--animated:hover { transform: scale(1.05); }
.made-in-usa-badge--center.made-in-usa-badge--animated:hover { transform: translate(-50%, -50%) scale(1.05); }

.made-in-usa-badge--glowing { 
  box-shadow: 0 0 15px rgba(191, 10, 48, 0.5); 
  animation: badge-glow 2s infinite alternate;
}

@keyframes badge-glow {
  from { box-shadow: 0 0 10px rgba(191, 10, 48, 0.5); }
  to { box-shadow: 0 0 20px rgba(191, 10, 48, 0.8); }
}
`;

  fs.writeFileSync(path.join(distDir, 'made-in-usa-badge.css'), css);
  console.log('✅ CSS file created');
}

// Generate the JS for the badge
const generateJS = () => {
  const js = `
/* Made in USA Badge v1.0.0 */
(function() {
  // Main badge functionality
  window.MadeInUSA = {
    init: function(config) {
      const {
        selector = '.product-container',
        style = 'standard',
        size = 'md',
        position = 'top-right',
        animated = true,
        glowing = false,
        showIcon = true,
        customText = 'MADE IN USA'
      } = config || {};

      // Find all products matching the selector
      const products = document.querySelectorAll(selector);
      
      // Add badges to each product
      products.forEach(product => {
        // Make the container relative if it's not already
        const computedStyle = window.getComputedStyle(product);
        if (computedStyle.position === 'static') {
          product.style.position = 'relative';
        }
        
        // Create the badge
        const badge = document.createElement('div');
        badge.className = 'made-in-usa-badge';
        badge.classList.add(\`made-in-usa-badge--\${style}\`);
        badge.classList.add(\`made-in-usa-badge--\${size}\`);
        badge.classList.add(\`made-in-usa-badge--\${position}\`);
        
        if (animated) {
          badge.classList.add('made-in-usa-badge--animated');
        }
        
        if (glowing) {
          badge.classList.add('made-in-usa-badge--glowing');
        }
        
        // Add the icon if needed
        if (showIcon) {
          const icon = document.createElement('span');
          icon.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path><line x1="4" x2="4" y1="22" y2="15"></line></svg>';
          badge.appendChild(icon);
        }
        
        // Add the text
        const text = document.createElement('span');
        text.textContent = customText;
        badge.appendChild(text);
        
        // Add the badge to the product
        product.appendChild(badge);
      });
    }
  };
})();
`;

  fs.writeFileSync(path.join(distDir, 'made-in-usa-badge.js'), js);
  console.log('✅ JS file created');
}

// Generate the README file
const generateReadme = () => {
  const readme = `# Made in USA Badge

A simple, customizable badge to showcase products made in the USA.

## Installation

Add these lines to your HTML:

\`\`\`html
<link href="https://cdn.jsdelivr.net/gh/made-in-usa-badge/assets@main/made-in-usa-badge.css" rel="stylesheet">
<script src="https://cdn.jsdelivr.net/gh/made-in-usa-badge/assets@main/made-in-usa-badge.js"></script>
\`\`\`

## Usage

Initialize the badge with your configuration:

\`\`\`html
<script>
  window.MadeInUSA.init({
    selector: ".product-container", // CSS selector for product containers
    style: "standard",             // "standard", "round", "ribbon", "flag"
    size: "md",                    // "sm", "md", "lg"
    position: "top-right",         // "top-left", "top-right", "bottom-left", "bottom-right", "center"
    animated: true,                // hover animation effect
    glowing: false,                // glowing effect
    showIcon: true,                // show flag icon
    customText: "MADE IN USA"      // custom badge text
  });
</script>
\`\`\`

## License

MIT
`;

  fs.writeFileSync(path.join(distDir, 'README.md'), readme);
  console.log('✅ README file created');
}

// Run the build process
try {
  console.log('🏁 Building Made in USA Badge assets...');
  generateCSS();
  generateJS();
  generateReadme();
  console.log('🎉 Build completed! Assets are in the dist/badge-assets directory');
} catch (error) {
  console.error('❌ Build failed:', error);
  process.exit(1);
}
