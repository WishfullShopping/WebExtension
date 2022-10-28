import { useEffect, useState } from "react";
import type { Message, Response } from "src/types";

export const Button: React.VFC = () => {
  const [currentTab, setCurrentTab] = useState<number>();
  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      // current tab info
      const currentTab = tabs[0];
      const currentTabId = currentTab.id ?? 0;
      setCurrentTab(currentTabId);
    });
  }, []);

  const handleClick = () => {
    // content script communication
    if (!currentTab) {
      return;
    }
    chrome.tabs.sendMessage<Message>(currentTab, { action: "getId" }, (res: Response) => {
        alert(res.updatedAt + " : " + res.id);
        // eslint-disable-next-line no-console
        console.log(res.data);
    });
  };

  if (!currentTab) return <div>Loading...</div>;

  return (
    <button onClick={handleClick} className="block p-2 mx-auto rounded border">
      Click Me!
    </button>
  );
};
