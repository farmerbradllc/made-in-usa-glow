
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { BadgeStyle, BadgeSize, BadgePosition, MadeInUSABadgeProps } from '@/components/MadeInUSABadge';
import { useMadeInUSA } from '@/context/MadeInUSAContext';
import { useToast } from '@/components/ui/use-toast';

interface BadgeConfiguratorProps {
  onConfigChange: (config: MadeInUSABadgeProps) => void;
  currentConfig: MadeInUSABadgeProps;
}

const BadgeConfigurator: React.FC<BadgeConfiguratorProps> = ({ onConfigChange, currentConfig }) => {
  const { updateDefaults } = useMadeInUSA();
  const { toast } = useToast();

  const handleChange = (key: keyof MadeInUSABadgeProps, value: any) => {
    onConfigChange({ ...currentConfig, [key]: value });
  };

  const handleSaveAsDefault = () => {
    updateDefaults({
      defaultStyle: currentConfig.style,
      defaultSize: currentConfig.size,
      defaultPosition: currentConfig.position,
      defaultAnimated: currentConfig.animated,
      defaultGlowing: currentConfig.glowing,
      defaultShowIcon: currentConfig.showIcon,
      defaultCustomText: currentConfig.customText,
    });
    
    toast({
      title: "Settings saved",
      description: "Your badge configuration has been saved as default",
    });
  };

  const copyCSS = () => {
    const css = `
/* Made in USA Badge CSS */
.made-in-usa-badge {
  position: absolute;
  ${currentConfig.position === 'top-left' ? 'top: 10px; left: 10px;' : 
    currentConfig.position === 'top-right' ? 'top: 10px; right: 10px;' :
    currentConfig.position === 'bottom-left' ? 'bottom: 10px; left: 10px;' :
    currentConfig.position === 'bottom-right' ? 'bottom: 10px; right: 10px;' :
    'top: 50%; left: 50%; transform: translate(-50%, -50%);'}
  background-color: ${currentConfig.style === 'flag' ? 'transparent' : 
    currentConfig.style === 'ribbon' ? '#BF0A30' : '#002868'};
  color: ${currentConfig.style === 'flag' ? '#002868' : '#ffffff'};
  padding: ${currentConfig.size === 'sm' ? '4px 8px' : 
    currentConfig.size === 'md' ? '6px 12px' : '8px 16px'};
  border-radius: ${currentConfig.style === 'round' ? '9999px' : 
    currentConfig.style === 'ribbon' ? '0 4px 4px 0' : '4px'};
  font-weight: bold;
  z-index: 10;
  ${currentConfig.animated ? 'transition: transform 0.3s;' : ''}
  ${currentConfig.glowing ? 'box-shadow: 0 0 15px rgba(191, 10, 48, 0.5);' : ''}
}

${currentConfig.style === 'flag' ? `
.made-in-usa-badge {
  background-image: repeating-linear-gradient(
    45deg,
    #BF0A30,
    #BF0A30 10px,
    #FFFFFF 10px,
    #FFFFFF 20px
  );
}
` : ''}

${currentConfig.animated ? `
.made-in-usa-badge:hover {
  transform: ${currentConfig.position === 'center' ? 'translate(-50%, -50%) scale(1.05)' : 'scale(1.05)'};
}
` : ''}
    `;
    
    navigator.clipboard.writeText(css);
    toast({
      title: "CSS Copied",
      description: "Badge CSS has been copied to clipboard",
    });
  };

  const copyHTML = () => {
    const html = `
<!-- Made in USA Badge -->
<div class="made-in-usa-badge">
  ${currentConfig.showIcon ? '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path><line x1="4" x2="4" y1="22" y2="15"></line></svg>' : ''}
  <span>${currentConfig.customText || 'MADE IN USA'}</span>
</div>
    `;
    
    navigator.clipboard.writeText(html);
    toast({
      title: "HTML Copied",
      description: "Badge HTML has been copied to clipboard",
    });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Badge Configurator</CardTitle>
        <CardDescription>Customize your Made in USA badge</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="style">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="style">Style</TabsTrigger>
            <TabsTrigger value="position">Position</TabsTrigger>
            <TabsTrigger value="effects">Effects</TabsTrigger>
          </TabsList>
          
          <TabsContent value="style" className="space-y-4">
            <div className="space-y-2">
              <Label>Badge Style</Label>
              <Select 
                value={currentConfig.style} 
                onValueChange={(value) => handleChange('style', value as BadgeStyle)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select style" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="standard">Standard</SelectItem>
                  <SelectItem value="round">Round</SelectItem>
                  <SelectItem value="ribbon">Ribbon</SelectItem>
                  <SelectItem value="flag">Flag</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label>Badge Size</Label>
              <Select 
                value={currentConfig.size} 
                onValueChange={(value) => handleChange('size', value as BadgeSize)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sm">Small</SelectItem>
                  <SelectItem value="md">Medium</SelectItem>
                  <SelectItem value="lg">Large</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label>Custom Text</Label>
              <Input 
                value={currentConfig.customText || ''} 
                onChange={(e) => handleChange('customText', e.target.value)}
                placeholder="MADE IN USA"
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch 
                id="showIcon"
                checked={!!currentConfig.showIcon}
                onCheckedChange={(checked) => handleChange('showIcon', checked)}
              />
              <Label htmlFor="showIcon">Show flag icon</Label>
            </div>
          </TabsContent>
          
          <TabsContent value="position" className="space-y-4">
            <div className="space-y-2">
              <Label>Badge Position</Label>
              <Select 
                value={currentConfig.position} 
                onValueChange={(value) => handleChange('position', value as BadgePosition)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select position" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="top-left">Top Left</SelectItem>
                  <SelectItem value="top-right">Top Right</SelectItem>
                  <SelectItem value="bottom-left">Bottom Left</SelectItem>
                  <SelectItem value="bottom-right">Bottom Right</SelectItem>
                  <SelectItem value="center">Center</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </TabsContent>
          
          <TabsContent value="effects" className="space-y-4">
            <div className="flex items-center space-x-2">
              <Switch 
                id="animated"
                checked={!!currentConfig.animated}
                onCheckedChange={(checked) => handleChange('animated', checked)}
              />
              <Label htmlFor="animated">Animated</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch 
                id="glowing"
                checked={!!currentConfig.glowing}
                onCheckedChange={(checked) => handleChange('glowing', checked)}
              />
              <Label htmlFor="glowing">Glowing effect</Label>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="flex space-x-2">
          <Button variant="outline" onClick={copyHTML}>Copy HTML</Button>
          <Button variant="outline" onClick={copyCSS}>Copy CSS</Button>
        </div>
        <Button onClick={handleSaveAsDefault}>Save as Default</Button>
      </CardFooter>
    </Card>
  );
};

export default BadgeConfigurator;
