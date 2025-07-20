'use client';

import type { ReactNode } from 'react';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

interface Properties {
  children: ReactNode;
}

const ReactDndProvider = ({ children }: Properties) => {
  return <DndProvider backend={HTML5Backend}>{children}</DndProvider>;
};

export default ReactDndProvider;
