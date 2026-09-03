import { cn } from "@gecko/ui/lib/utils";
import { Toaster } from "@gecko/ui/components/toast";

import { VirtualEventsProvider } from "@/context/virtual-events-context";

import { VirtualEventsHeader } from "./virtual-events-header";
import { VirtualEventsMainBody } from "./virtual-events-main-body";
import { VirtualEventsMainContent } from "./virtual-events-main-content";
import { VirtualEventsScheduleSidebar } from "./virtual-events-schedule-sidebar";
import { VirtualEventsSidebar } from "./virtual-events-sidebar";
import { VirtualEventsVideoPlayer } from "./virtual-events-video-player";

type VirtualEventsLayoutProps = {
  className?: string;
};

export function VirtualEventsLayout({ className }: VirtualEventsLayoutProps) {
  return (
    <VirtualEventsProvider>
      <div
        className={cn(
          "bg-background flex h-svh w-full flex-col overflow-hidden",
          "[--ve-header-height:3.5rem] [--ve-sidebar-width:28rem] [--ve-schedule-width:22rem]",
          className,
        )}
      >
        <VirtualEventsHeader />

        <div className="flex min-h-0 min-w-0 flex-1 overflow-hidden">
          <VirtualEventsMainBody>
            <VirtualEventsVideoPlayer />
            <div className="flex">
              <VirtualEventsMainContent />
              <VirtualEventsScheduleSidebar />
            </div>
          </VirtualEventsMainBody>

          <VirtualEventsSidebar />
        </div>
        <Toaster />
      </div>
    </VirtualEventsProvider>
  );
}
