import React, { createContext, useState, useContext } from "react";

const TabContext = createContext();

export const TabProvider = ({ children }) => {
  const [tabs, setTabs] = useState([]);

  const getActiveTab = () => tabs.find((tab) => tab.active);

  const addTab = (tab) => {
    setTabs((prevTabs) => {
      if (!prevTabs.find((t) => t.id === tab.id)) {
        return [...prevTabs, { ...tab, active: true }];
      }
      return prevTabs;
    });
  };

  const closeTab = (tabId) => {
    setTabs((prevTabs) => prevTabs.filter((tab) => tab.id !== tabId));
  };

  const setActiveTab = (tabId) => {
    setTabs((prevTabs) => {
      return prevTabs.map((tab) =>
        tab.id === tabId ? { ...tab, active: true } : { ...tab, active: false }
      );
    });
  };
  const resetTabs = () => {
    setActiveTab(null);
  };
  return (
    <TabContext.Provider
      value={{ tabs, addTab, closeTab, setActiveTab, getActiveTab, resetTabs }}
    >
      {children}
    </TabContext.Provider>
  );
};

export const useTabs = () => {
  return useContext(TabContext);
};
