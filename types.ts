
import React from 'react';

export interface ServiceItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}