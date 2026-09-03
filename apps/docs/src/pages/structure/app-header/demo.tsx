import * as React from "react";
import geckoLogoUrl from "@/assets/gecko-logo.svg";
import {
  AppHeader,
  AppHeaderAccountSwitcher,
  AppHeaderActions,
  AppHeaderControls,
  AppHeaderLogo,
  AppHeaderUserMenu,
} from "@gecko/ui/components/app-header";

export function AppHeaderDemo() {
  const [callOnline, setCallOnline] = React.useState(true);
  const [conversationOnline, setConversationOnline] = React.useState(true);
  const [darkMode, setDarkMode] = React.useState(
    () =>
      typeof document !== "undefined" &&
      document.documentElement.classList.contains("dark"),
  );

  return (
    <AppHeader className="static">
      <AppHeaderLogo src={geckoLogoUrl} alt="Gecko" />
      <AppHeaderActions>
        <AppHeaderAccountSwitcher
          label="Gecko"
          accounts={[
            { id: "gecko", label: "Gecko" },
            { id: "sandbox", label: "Sandbox org" },
          ]}
        />
        <AppHeaderControls
          call={{
            pressed: callOnline,
            onPressedChange: setCallOnline,
          }}
          conversation={{
            pressed: conversationOnline,
            onPressedChange: setConversationOnline,
          }}
        />
        <AppHeaderUserMenu
          name="Liam Young"
          avatar={{ name: "Liam Young" }}
          items={[
            {
              id: "theme",
              label: `Switch to ${darkMode ? "light" : "dark"} mode`,
              onSelect: () => {
                const next = !darkMode;
                document.documentElement.classList.toggle("dark", next);
                setDarkMode(next);
              },
            },
            { id: "settings", label: "User settings", separatorBefore: true },
            { id: "security", label: "Security preferences" },
            { id: "accounts", label: "My accounts" },
            {
              id: "logout",
              label: "Logout",
              variant: "destructive",
              separatorBefore: true,
            },
          ]}
        />
      </AppHeaderActions>
    </AppHeader>
  );
}
