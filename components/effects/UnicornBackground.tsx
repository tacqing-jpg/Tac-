"use client";

import UnicornScene from "unicornstudio-react";

export function UnicornBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none" aria-hidden="true">
      <UnicornScene
        projectId="4jcGYIuySFD0xAWIwGTH"
        width="100%"
        height="100%"
        scale={1}
        dpi={1.5}
        sdkUrl="https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v2.2.5/dist/unicornStudio.umd.js"
      />
    </div>
  );
}
