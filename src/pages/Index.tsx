
import React from 'react';
import { DAWWorkspace } from '@/components/DAWWorkspace';
import { Toaster } from '@/components/ui/toaster';

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <DAWWorkspace />
      <Toaster />
    </div>
  );
};

export default Index;
