import geckoLogoUrl from "@/assets/gecko-logo.svg";
import avatarUrl from "@/assets/avatar.jpg";
import * as React from "react";
import { useNavigate } from "react-router-dom";

import {
  AppHeader as AppHeaderRoot,
  AppHeaderAccountSwitcher,
  AppHeaderActions,
  AppHeaderControls,
  AppHeaderLogo,
  AppHeaderUserMenu,
} from "@gecko/ui/components/app-header";

export function AppHeader() {
  const navigate = useNavigate();
  const [callOnline, setCallOnline] = React.useState(true);
  const [conversationOnline, setConversationOnline] = React.useState(true);
  const [userMenuOpen, setUserMenuOpen] = React.useState(false);
  const [darkMode, setDarkMode] = React.useState(() =>
    typeof document !== "undefined"
      ? document.documentElement.classList.contains("dark")
      : false,
  );

  const applyTheme = React.useCallback((nextDarkMode: boolean) => {
    document.documentElement.classList.toggle("dark", nextDarkMode);
  }, []);

  React.useEffect(() => {
    applyTheme(darkMode);
  }, [darkMode, applyTheme]);

  return (
    <AppHeaderRoot>
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
          avatar={{ name: "Liam Young", src: avatarUrl }}
          open={userMenuOpen}
          onOpenChange={setUserMenuOpen}
          items={[
            {
              id: "theme",
              label: `Switch to ${darkMode ? "light" : "dark"} mode`,
              onSelect: () => {
                const next = !darkMode;
                applyTheme(next);
                setDarkMode(next);
                setUserMenuOpen(false);
              },
            },
            {
              id: "settings",
              label: "User settings",
              separatorBefore: true,
              onSelect: () => navigate("/user-settings"),
            },
            {
              id: "security",
              label: "Security preferences",
              onSelect: () => navigate("/security-preferences"),
            },
            {
              id: "accounts",
              label: "My accounts",
              onSelect: () => navigate("/my-accounts"),
            },
            {
              id: "logout",
              label: "Logout",
              variant: "destructive",
              separatorBefore: true,
              onSelect: () => navigate("/logout"),
            },
          ]}
        />
      </AppHeaderActions>
    </AppHeaderRoot>
  );
}
