import React, { createContext, useContext, useState } from 'react';

const LayoutContext = createContext();

export const LayoutProvider = ({ children }) => {
  const [bottomSection, setBottomSection] = useState(null);
  //const [showChatInput, setShowChatInput] = useState(false);
  
  return (
    <LayoutContext.Provider value={{
      bottomSection,
      setBottomSection,
    //   showChatInput,
    //   setShowChatInput
    }}>
      {children}
    </LayoutContext.Provider>
  );
};

export const useLayout = () => {
  const context = useContext(LayoutContext);
  if (!context) {
    throw new Error('useLayout must be used within a LayoutProvider');
  }
  return context;
};