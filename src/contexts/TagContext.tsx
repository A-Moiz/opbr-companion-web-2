'use client';

import React, { createContext, useContext, ReactNode } from 'react';

interface TagContextType {
  tags: string[];
}

const TagContext = createContext<TagContextType | undefined>(undefined);

export const TagProvider = ({ children }: { children: ReactNode }) => {
  return <TagContext.Provider value={{ tags }}>{children}</TagContext.Provider>;
};

export const useTags = () => {
  const context = useContext(TagContext);
  if (context === undefined) {
    throw new Error('useTags must be used within a TagProvider');
  }
  return context;
};

export default useTags;
