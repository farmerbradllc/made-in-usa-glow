
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { BadgeStyle, BadgeSize, BadgePosition } from '@/components/MadeInUSABadge';

interface MadeInUSAContextType {
  defaultStyle: BadgeStyle;
  defaultSize: BadgeSize;
  defaultPosition: BadgePosition;
  defaultAnimated: boolean;
  defaultGlowing: boolean;
  defaultShowIcon: boolean;
  defaultCustomText: string | undefined;
  updateDefaults: (settings: Partial<MadeInUSASettings>) => void;
}

interface MadeInUSASettings {
  defaultStyle: BadgeStyle;
  defaultSize: BadgeSize;
  defaultPosition: BadgePosition;
  defaultAnimated: boolean;
  defaultGlowing: boolean;
  defaultShowIcon: boolean;
  defaultCustomText: string | undefined;
}

const defaultSettings: MadeInUSASettings = {
  defaultStyle: 'standard',
  defaultSize: 'md',
  defaultPosition: 'top-right',
  defaultAnimated: true,
  defaultGlowing: true,
  defaultShowIcon: true,
  defaultCustomText: undefined,
};

export const MadeInUSAContext = createContext<MadeInUSAContextType>({
  ...defaultSettings,
  updateDefaults: () => {},
});

export const useMadeInUSA = () => useContext(MadeInUSAContext);

export const MadeInUSAProvider: React.FC<{ children: ReactNode; initialSettings?: Partial<MadeInUSASettings> }> = ({
  children,
  initialSettings = {},
}) => {
  const [settings, setSettings] = useState<MadeInUSASettings>({
    ...defaultSettings,
    ...initialSettings,
  });

  const updateDefaults = (newSettings: Partial<MadeInUSASettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  return (
    <MadeInUSAContext.Provider value={{ ...settings, updateDefaults }}>
      {children}
    </MadeInUSAContext.Provider>
  );
};
