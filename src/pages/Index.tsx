
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import MadeInUSABadge, { MadeInUSABadgeProps } from '@/components/MadeInUSABadge';
import BadgeConfigurator from '@/components/BadgeConfigurator';
import ProductCardDemo from '@/components/ProductCardDemo';
import CodeSnippetGenerator from '@/components/CodeSnippetGenerator';
import { MadeInUSAProvider, useMadeInUSA } from '@/context/MadeInUSAContext';
import { Flag } from 'lucide-react';

const IndexContent = () => {
  const {
    defaultStyle,
    defaultSize,
    defaultPosition,
    defaultAnimated,
    defaultGlowing,
    defaultShowIcon,
    defaultCustomText,
  } = useMadeInUSA();

  const [badgeConfig, setBadgeConfig] = useState<MadeInUSABadgeProps>({
    style: defaultStyle,
    size: defaultSize,
    position: defaultPosition,
    animated: defaultAnimated,
    glowing: defaultGlowing,
    showIcon: defaultShowIcon,
    customText: defaultCustomText,
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <div className="flex items-center justify-center mb-4">
          <Flag className="w-10 h-10 text-usa-red mr-2" />
          <h1 className="text-4xl font-bold">Made in USA Badge</h1>
        </div>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          A customizable, eye-catching badge for ecommerce stores to proudly showcase American-made products
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <Card className="bg-usa-red/10 col-span-1">
          <CardContent className="p-6">
            <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
              <div className="rounded-full bg-usa-red/20 p-3">
                <Flag className="h-6 w-6 text-usa-red" />
              </div>
              <h3 className="text-xl font-bold">Highlight American Quality</h3>
              <p className="text-gray-600">
                Show customers your products are made with American quality and craftsmanship
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-usa-blue/10 col-span-1">
          <CardContent className="p-6">
            <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
              <div className="rounded-full bg-usa-blue/20 p-3">
                <svg className="h-6 w-6 text-usa-blue" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect width="18" height="18" x="3" y="3" rx="2" />
                  <path d="M7 7h.01M7 12h.01M12 7h.01M12 12h.01M12 17h.01M17 7h.01M17 12h.01M17 17h.01" />
                </svg>
              </div>
              <h3 className="text-xl font-bold">Easy to Customize</h3>
              <p className="text-gray-600">
                Multiple styles, sizes, and positions to match your brand perfectly
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-green-100 col-span-1">
          <CardContent className="p-6">
            <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
              <div className="rounded-full bg-green-200 p-3">
                <svg className="h-6 w-6 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2v4M5 4l1 2M3 9h2M4 14l2-1M12 18v4M20 9h-2M18 14l-2-1M19 4l-1 2" />
                  <circle cx="12" cy="11" r="4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold">Simple Implementation</h3>
              <p className="text-gray-600">
                Just copy and paste our code into your site to get started
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="demo" className="w-full mb-10">
        <TabsList className="grid grid-cols-3 mb-8 w-full max-w-md mx-auto">
          <TabsTrigger value="demo">Demo</TabsTrigger>
          <TabsTrigger value="customize">Customize</TabsTrigger>
          <TabsTrigger value="install">Get Code</TabsTrigger>
        </TabsList>

        <TabsContent value="demo">
          <div className="space-y-8">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold mb-2">See It In Action</h2>
              <p className="text-gray-600">Here's how the badge looks on product cards</p>
            </div>
            <ProductCardDemo badgeConfig={badgeConfig} />
          </div>
        </TabsContent>

        <TabsContent value="customize">
          <div className="space-y-8">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold mb-2">Customize Your Badge</h2>
              <p className="text-gray-600">Adjust the settings to match your brand style</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <BadgeConfigurator onConfigChange={setBadgeConfig} currentConfig={badgeConfig} />
              
              <div>
                <h3 className="text-xl font-bold mb-4">Preview</h3>
                <div className="border rounded-lg p-6 h-full flex flex-col">
                  <div className="flex-1 flex items-center justify-center mb-6 relative">
                    <div className="relative bg-gray-100 w-full h-64 rounded-md flex items-center justify-center">
                      <p className="text-gray-400">Product Image</p>
                      <MadeInUSABadge {...badgeConfig} className="absolute" style={{
                        top: badgeConfig.position?.includes('top') ? '10px' : 
                              badgeConfig.position?.includes('bottom') ? 'auto' : '50%',
                        bottom: badgeConfig.position?.includes('bottom') ? '10px' : 'auto',
                        left: badgeConfig.position?.includes('left') ? '10px' : 
                             badgeConfig.position?.includes('right') ? 'auto' : '50%',
                        right: badgeConfig.position?.includes('right') ? '10px' : 'auto',
                        transform: badgeConfig.position === 'center' ? 'translate(-50%, -50%)' : 'none',
                      }} />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold">Current Configuration</h3>
                    <ul className="text-sm space-y-1 text-gray-600">
                      <li><span className="font-medium">Style:</span> {badgeConfig.style}</li>
                      <li><span className="font-medium">Size:</span> {badgeConfig.size}</li>
                      <li><span className="font-medium">Position:</span> {badgeConfig.position}</li>
                      <li><span className="font-medium">Animated:</span> {badgeConfig.animated ? 'Yes' : 'No'}</li>
                      <li><span className="font-medium">Glowing:</span> {badgeConfig.glowing ? 'Yes' : 'No'}</li>
                      <li><span className="font-medium">Show Icon:</span> {badgeConfig.showIcon ? 'Yes' : 'No'}</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="install">
          <div className="space-y-8">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold mb-2">Add to Your Site</h2>
              <p className="text-gray-600">Copy the code and add it to your ecommerce platform</p>
            </div>
            
            <CodeSnippetGenerator badgeConfig={badgeConfig} />
          </div>
        </TabsContent>
      </Tabs>

      <div className="text-center mt-16 mb-10">
        <h2 className="text-2xl font-bold mb-4">Ready to showcase your American-made products?</h2>
        <p className="text-lg text-gray-600 mb-6">
          Our Made in USA badge helps your customers identify and trust products manufactured in America.
        </p>
        <div className="inline-flex gap-2">
          <MadeInUSABadge style="standard" size="lg" />
          <MadeInUSABadge style="round" size="lg" />
          <MadeInUSABadge style="ribbon" size="lg" />
          <MadeInUSABadge style="flag" size="lg" />
        </div>
      </div>

      <footer className="mt-20 pt-8 border-t text-center text-gray-500 text-sm">
        <p>Made in USA Badge Generator © 2025</p>
      </footer>
    </div>
  );
};

const Index = () => {
  return (
    <MadeInUSAProvider>
      <IndexContent />
    </MadeInUSAProvider>
  );
};

export default Index;
