
import type { MadeInUSABadgeProps } from '@/components/MadeInUSABadge';

/**
 * Creates a badge that can be added to a product container
 */
export const createProductBadge = (props?: MadeInUSABadgeProps) => {
  // Return a simulated element structure without using JSX
  return { 
    type: 'MadeInUSABadge', 
    props: props || {} 
  };
};

/**
 * Wraps an element (like a product image) with a positioned USA badge
 */
export const wrapWithUSABadge = (
  children: any,
  badgeProps?: MadeInUSABadgeProps,
  containerClassName?: string
) => {
  // Return a simulated element structure without using JSX
  return {
    type: 'wrapper',
    props: {
      className: `relative inline-block ${containerClassName || ''}`,
      children: [
        children,
        { type: 'MadeInUSAPositioned', props: badgeProps || {} }
      ]
    }
  };
};

/**
 * Generate the JavaScript code to inject a badge onto a page
 * (This would be used in the actual plugin implementation)
 */
export const generateBadgeInjectionCode = (
  selector: string,
  badgeProps?: MadeInUSABadgeProps
): string => {
  const props = JSON.stringify(badgeProps || {});
  
  return `
  (function() {
    // Create badge element
    const badge = document.createElement('div');
    badge.className = 'made-in-usa-badge';
    badge.setAttribute('data-props', '${props}');
    
    // Find target elements
    const targets = document.querySelectorAll('${selector}');
    
    // Attach badge to each target
    targets.forEach(target => {
      // Make target position relative if not already
      const computedStyle = window.getComputedStyle(target);
      if (computedStyle.position === 'static') {
        target.style.position = 'relative';
      }
      
      // Clone badge and append
      const badgeClone = badge.cloneNode(true);
      target.appendChild(badgeClone);
    });
  })();
  `;
};

/**
 * Generate a CSS code snippet for the badge
 */
export const generateBadgeCSS = (badgeProps?: MadeInUSABadgeProps): string => {
  const { 
    style = 'standard',
    position = 'top-right',
    size = 'md',
    animated = true,
    glowing = true
  } = badgeProps || {};
  
  let positionCSS = '';
  
  switch(position) {
    case 'top-left':
      positionCSS = 'top: 10px; left: 10px;';
      break;
    case 'top-right':
      positionCSS = 'top: 10px; right: 10px;';
      break;
    case 'bottom-left':
      positionCSS = 'bottom: 10px; left: 10px;';
      break;
    case 'bottom-right':
      positionCSS = 'bottom: 10px; right: 10px;';
      break;
    case 'center':
      positionCSS = 'top: 50%; left: 50%; transform: translate(-50%, -50%);';
      break;
  }
  
  let styleCSS = '';
  
  // Just a simplified example - in a real plugin this would be more comprehensive
  switch(style) {
    case 'standard':
      styleCSS = `
        background-color: #002868;
        color: white;
        border: 2px solid white;
        border-radius: 4px;
      `;
      break;
    case 'round':
      styleCSS = `
        background-color: #002868;
        color: white;
        border: 2px solid white;
        border-radius: 9999px;
      `;
      break;
    case 'ribbon':
      styleCSS = `
        background-color: #BF0A30;
        color: white;
        border-radius: 0 4px 4px 0;
      `;
      break;
    case 'flag':
      styleCSS = `
        background-image: repeating-linear-gradient(
          45deg,
          #BF0A30,
          #BF0A30 10px,
          #FFFFFF 10px,
          #FFFFFF 20px
        );
        color: #002868;
        border-radius: 4px;
      `;
      break;
  }
  
  const sizeCSS = size === 'sm' ? 'font-size: 12px; padding: 4px 8px;' : 
                 size === 'md' ? 'font-size: 14px; padding: 6px 12px;' :
                 'font-size: 16px; padding: 8px 16px;';
  
  const animationCSS = animated ? 'transition: transform 0.3s; &:hover { transform: scale(1.05); }' : '';
  
  const glowCSS = glowing ? 'box-shadow: 0 0 15px rgba(191, 10, 48, 0.5);' : '';
  
  return `
    .made-in-usa-badge {
      position: absolute;
      ${positionCSS}
      ${styleCSS}
      ${sizeCSS}
      ${animationCSS}
      ${glowCSS}
      z-index: 10;
      font-weight: bold;
      display: flex;
      align-items: center;
      gap: 4px;
    }
  `;
};
