
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { MadeInUSABadgeProps } from '@/components/MadeInUSABadge';
import { generateBadgeInjectionCode, generateBadgeCSS } from '@/utils/usaBadgeUtils';

interface CodeSnippetGeneratorProps {
  badgeConfig: MadeInUSABadgeProps;
}

const CodeSnippetGenerator: React.FC<CodeSnippetGeneratorProps> = ({ badgeConfig }) => {
  const [selector, setSelector] = useState('.product-card');
  const [integrationMethod, setIntegrationMethod] = useState('script');
  const { toast } = useToast();

  const handleCopy = (code: string, type: string) => {
    navigator.clipboard.writeText(code);
    toast({
      title: `${type} code copied`,
      description: `The ${type} code has been copied to your clipboard.`,
    });
  };

  const getScriptCode = () => {
    return `
<!-- Made in USA Badge - Add this to your website -->
<link href="https://cdn.example.com/made-in-usa-badge.css" rel="stylesheet">
<script src="https://cdn.example.com/made-in-usa-badge.js"></script>
<script>
  // Initialize the badge
  window.MadeInUSA.init({
    selector: "${selector}",
    style: "${badgeConfig.style}",
    size: "${badgeConfig.size}",
    position: "${badgeConfig.position}",
    animated: ${!!badgeConfig.animated},
    glowing: ${!!badgeConfig.glowing},
    showIcon: ${!!badgeConfig.showIcon},
    ${badgeConfig.customText ? `customText: "${badgeConfig.customText}",` : ''}
  });
</script>
`;
  };

  const getHTMLCode = () => {
    return `
<!-- Made in USA Badge - Copy this HTML into your product template -->
<div class="made-in-usa-badge" style="
  position: absolute;
  ${badgeConfig.position === 'top-left' ? 'top: 10px; left: 10px;' : 
    badgeConfig.position === 'top-right' ? 'top: 10px; right: 10px;' :
    badgeConfig.position === 'bottom-left' ? 'bottom: 10px; left: 10px;' :
    badgeConfig.position === 'bottom-right' ? 'bottom: 10px; right: 10px;' :
    'top: 50%; left: 50%; transform: translate(-50%, -50%);'}
  background-color: ${badgeConfig.style === 'flag' ? 'transparent' : 
    badgeConfig.style === 'ribbon' ? '#BF0A30' : '#002868'};
  color: ${badgeConfig.style === 'flag' ? '#002868' : '#ffffff'};
  padding: ${badgeConfig.size === 'sm' ? '4px 8px' : 
    badgeConfig.size === 'md' ? '6px 12px' : '8px 16px'};
  border-radius: ${badgeConfig.style === 'round' ? '9999px' : 
    badgeConfig.style === 'ribbon' ? '0 4px 4px 0' : '4px'};
  font-weight: bold;
  z-index: 10;
  display: flex;
  align-items: center;
  gap: 4px;
  ${badgeConfig.style === 'flag' ? 
    `background-image: repeating-linear-gradient(45deg, #BF0A30, #BF0A30 10px, #FFFFFF 10px, #FFFFFF 20px);` : ''}
  ${badgeConfig.animated ? 'transition: transform 0.3s;' : ''}
  ${badgeConfig.glowing ? 'box-shadow: 0 0 15px rgba(191, 10, 48, 0.5);' : ''}
">
  ${badgeConfig.showIcon ? '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path><line x1="4" x2="4" y1="22" y2="15"></line></svg>' : ''}
  <span>${badgeConfig.customText || 'MADE IN USA'}</span>
</div>
`;
  };

  const getReactCode = () => {
    return `
import React from 'react';

// Made in USA Badge Component
const MadeInUSABadge = () => {
  return (
    <div className="made-in-usa-badge">
      ${badgeConfig.showIcon ? '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path><line x1="4" x2="4" y1="22" y2="15"></line></svg>' : ''}
      <span>${badgeConfig.customText || 'MADE IN USA'}</span>
    </div>
  );
};

// Example product card with the badge
const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <div className="relative">
        <img src={product.image} alt={product.name} />
        <MadeInUSABadge />
      </div>
      <h3>{product.name}</h3>
      <p>{product.price}</p>
    </div>
  );
};

// Don't forget to add this CSS to your stylesheet
/*
.made-in-usa-badge {
  position: absolute;
  ${badgeConfig.position === 'top-left' ? 'top: 10px; left: 10px;' : 
    badgeConfig.position === 'top-right' ? 'top: 10px; right: 10px;' :
    badgeConfig.position === 'bottom-left' ? 'bottom: 10px; left: 10px;' :
    badgeConfig.position === 'bottom-right' ? 'bottom: 10px; right: 10px;' :
    'top: 50%; left: 50%; transform: translate(-50%, -50%);'}
  background-color: ${badgeConfig.style === 'flag' ? 'transparent' : 
    badgeConfig.style === 'ribbon' ? '#BF0A30' : '#002868'};
  color: ${badgeConfig.style === 'flag' ? '#002868' : '#ffffff'};
  padding: ${badgeConfig.size === 'sm' ? '4px 8px' : 
    badgeConfig.size === 'md' ? '6px 12px' : '8px 16px'};
  border-radius: ${badgeConfig.style === 'round' ? '9999px' : 
    badgeConfig.style === 'ribbon' ? '0 4px 4px 0' : '4px'};
  font-weight: bold;
  z-index: 10;
  display: flex;
  align-items: center;
  gap: 4px;
  ${badgeConfig.style === 'flag' ? 
    `background-image: repeating-linear-gradient(45deg, #BF0A30, #BF0A30 10px, #FFFFFF 10px, #FFFFFF 20px);` : ''}
  ${badgeConfig.animated ? 'transition: transform 0.3s;' : ''}
  ${badgeConfig.glowing ? 'box-shadow: 0 0 15px rgba(191, 10, 48, 0.5);' : ''}
}

${badgeConfig.animated ? `
.made-in-usa-badge:hover {
  transform: ${badgeConfig.position === 'center' ? 'translate(-50%, -50%) scale(1.05)' : 'scale(1.05)'};
}
` : ''}
*/

export default ProductCard;
`;
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Integration Code</CardTitle>
        <CardDescription>Copy the code to add the badge to your website</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="selector">Product Container Selector</Label>
            <Input
              id="selector"
              value={selector}
              onChange={(e) => setSelector(e.target.value)}
              placeholder=".product-card, .product-container, etc."
            />
            <p className="text-sm text-gray-500">
              CSS selector for the product containers where badges will be added
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="integration-type">Integration Method</Label>
            <Select value={integrationMethod} onValueChange={setIntegrationMethod}>
              <SelectTrigger id="integration-type">
                <SelectValue placeholder="Select integration method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="script">Script Tag</SelectItem>
                <SelectItem value="html">HTML / CSS</SelectItem>
                <SelectItem value="react">React Component</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Tabs defaultValue="code" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="code">Code</TabsTrigger>
              <TabsTrigger value="preview">Preview</TabsTrigger>
            </TabsList>
            <TabsContent value="code">
              <Textarea
                className="min-h-[200px] font-mono text-sm"
                readOnly
                value={
                  integrationMethod === 'script'
                    ? getScriptCode()
                    : integrationMethod === 'html'
                    ? getHTMLCode()
                    : getReactCode()
                }
              />
            </TabsContent>
            <TabsContent value="preview">
              <div className="border rounded-md p-4 min-h-[200px] bg-gray-50">
                <div className="relative w-full h-48 bg-gray-200 rounded-md flex items-center justify-center">
                  <span className="text-gray-500">Product Image Placeholder</span>
                  <div
                    className="absolute"
                    style={{
                      top: badgeConfig.position?.includes('top') ? '10px' : 
                            badgeConfig.position?.includes('bottom') ? 'auto' : '50%',
                      bottom: badgeConfig.position?.includes('bottom') ? '10px' : 'auto',
                      left: badgeConfig.position?.includes('left') ? '10px' : 
                           badgeConfig.position?.includes('right') ? 'auto' : '50%',
                      right: badgeConfig.position?.includes('right') ? '10px' : 'auto',
                      transform: badgeConfig.position === 'center' ? 'translate(-50%, -50%)' : 'none',
                    }}
                  >
                    <div
                      className={`inline-flex items-center gap-1.5 font-bold
                                 ${badgeConfig.style === 'standard' || badgeConfig.style === 'flag' ? 'rounded-md' : ''}
                                 ${badgeConfig.style === 'round' ? 'rounded-full' : ''}
                                 ${badgeConfig.style === 'ribbon' ? 'rounded-r-md' : ''}
                                 ${badgeConfig.style === 'flag' ? 'usa-stripes-bg text-usa-blue' : 
                                   badgeConfig.style === 'ribbon' ? 'bg-usa-red text-usa-white' : 
                                   'bg-usa-blue text-usa-white border-2 border-usa-white'}
                                 ${badgeConfig.size === 'sm' ? 'text-xs py-1 px-2' : 
                                   badgeConfig.size === 'md' ? 'text-sm py-1.5 px-3' : 
                                   'text-base py-2 px-4'}
                                 ${badgeConfig.glowing ? 'usa-badge-shadow' : ''}
                                 ${badgeConfig.animated ? 'hover:scale-105 transition-transform' : ''}
                                `}
                    >
                      {badgeConfig.showIcon && (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path>
                          <line x1="4" x2="4" y1="22" y2="15"></line>
                        </svg>
                      )}
                      <span>{badgeConfig.customText || 'MADE IN USA'}</span>
                    </div>
                  </div>
                </div>
                <div className="mt-2">
                  <p className="font-medium">Example Product</p>
                  <p className="text-sm text-gray-500">$99.99</p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full"
          onClick={() =>
            handleCopy(
              integrationMethod === 'script'
                ? getScriptCode()
                : integrationMethod === 'html'
                ? getHTMLCode()
                : getReactCode(),
              integrationMethod
            )
          }
        >
          Copy {integrationMethod === 'script' ? 'Script' : integrationMethod === 'html' ? 'HTML' : 'React'} Code
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CodeSnippetGenerator;
