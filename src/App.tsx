import { Routes, Route } from "react-router-dom"
import { AppShell } from "@/components/layout/app-shell"
import { HomePage } from "@/pages/home"
import { AccordionPage } from "@/pages/accordion"
import { AlertPage } from "@/pages/alert"
import { AlertDialogPage } from "@/pages/alert-dialog"
import { AvatarPage } from "@/pages/avatar"
import { AvatarGroupPage } from "@/pages/avatar-group"
import { BadgePage } from "@/pages/badge"
import { BreadcrumbPage } from "@/pages/breadcrumb"
import { ButtonPage } from "@/pages/button"
import { ButtonGroupPage } from "@/pages/button-group"
import { CalendarPage } from "@/pages/calendar"
import { CardPage } from "@/pages/card"
import { CheckboxPage } from "@/pages/checkbox"
import { ComboboxPage } from "@/pages/combobox"
import { CommandPage } from "@/pages/command"
import { ContextMenuPage } from "@/pages/context-menu"
import { DatePickerPage } from "@/pages/date-picker"
import { DialogPage } from "@/pages/dialog"
import { DirectionPage } from "@/pages/direction"
import { DropdownMenuPage } from "@/pages/dropdown-menu"
import { EmptyPage } from "@/pages/empty"
import { FieldPage } from "@/pages/field"
import { InputPage } from "@/pages/input"
import { InputGroupPage } from "@/pages/input-group"
import { InputOtpPage } from "@/pages/input-otp"
import { KbdPage } from "@/pages/kbd"
import { LabelPage } from "@/pages/label"
import { NativeSelectPage } from "@/pages/native-select"
import { PaginationPage } from "@/pages/pagination"
import { PopoverPage } from "@/pages/popover"
import { ProgressPage } from "@/pages/progress"
import { RadioGroupPage } from "@/pages/radio-group"
import { ScrollAreaPage } from "@/pages/scroll-area"
import { SelectPage } from "@/pages/select"
import { SeparatorPage } from "@/pages/separator"
import { SheetPage } from "@/pages/sheet"
import { SkeletonPage } from "@/pages/skeleton"
import { SonnerPage } from "@/pages/sonner"
import { SpinnerPage } from "@/pages/spinner"
import { SwitchPage } from "@/pages/switch"
import { TablePage } from "@/pages/table"
import { TabsPage } from "@/pages/tabs"
import { TextareaPage } from "@/pages/textarea"
import { TogglePage } from "@/pages/toggle"
import { ToggleGroupPage } from "@/pages/toggle-group"
import { TooltipPage } from "@/pages/tooltip"

export function App() {
  return (
    <AppShell>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/components/accordion" element={<AccordionPage />} />
        <Route path="/components/alert" element={<AlertPage />} />
        <Route
          path="/components/alert-dialog"
          element={<AlertDialogPage />}
        />
        <Route path="/components/avatar" element={<AvatarPage />} />
        <Route path="/components/avatar-group" element={<AvatarGroupPage />} />
        <Route path="/components/badge" element={<BadgePage />} />
        <Route path="/components/breadcrumb" element={<BreadcrumbPage />} />
        <Route path="/components/button" element={<ButtonPage />} />
        <Route
          path="/components/button-group"
          element={<ButtonGroupPage />}
        />
        <Route path="/components/calendar" element={<CalendarPage />} />
        <Route path="/components/card" element={<CardPage />} />
        <Route path="/components/checkbox" element={<CheckboxPage />} />
        <Route path="/components/combobox" element={<ComboboxPage />} />
        <Route path="/components/command" element={<CommandPage />} />
        <Route
          path="/components/context-menu"
          element={<ContextMenuPage />}
        />
        <Route
          path="/components/date-picker"
          element={<DatePickerPage />}
        />
        <Route path="/components/dialog" element={<DialogPage />} />
        <Route path="/components/direction" element={<DirectionPage />} />
        <Route
          path="/components/dropdown-menu"
          element={<DropdownMenuPage />}
        />
        <Route path="/components/empty" element={<EmptyPage />} />
        <Route path="/components/field" element={<FieldPage />} />
        <Route path="/components/input" element={<InputPage />} />
        <Route
          path="/components/input-group"
          element={<InputGroupPage />}
        />
        <Route path="/components/input-otp" element={<InputOtpPage />} />
        <Route path="/components/kbd" element={<KbdPage />} />
        <Route path="/components/label" element={<LabelPage />} />
        <Route
          path="/components/native-select"
          element={<NativeSelectPage />}
        />
        <Route path="/components/pagination" element={<PaginationPage />} />
        <Route path="/components/popover" element={<PopoverPage />} />
        <Route path="/components/progress" element={<ProgressPage />} />
        <Route
          path="/components/radio-group"
          element={<RadioGroupPage />}
        />
        <Route
          path="/components/scroll-area"
          element={<ScrollAreaPage />}
        />
        <Route path="/components/select" element={<SelectPage />} />
        <Route path="/components/separator" element={<SeparatorPage />} />
        <Route path="/components/sheet" element={<SheetPage />} />
        <Route path="/components/skeleton" element={<SkeletonPage />} />
        <Route path="/components/sonner" element={<SonnerPage />} />
        <Route path="/components/spinner" element={<SpinnerPage />} />
        <Route path="/components/switch" element={<SwitchPage />} />
        <Route path="/components/table" element={<TablePage />} />
        <Route path="/components/tabs" element={<TabsPage />} />
        <Route path="/components/textarea" element={<TextareaPage />} />
        <Route path="/components/toggle" element={<TogglePage />} />
        <Route
          path="/components/toggle-group"
          element={<ToggleGroupPage />}
        />
        <Route path="/components/tooltip" element={<TooltipPage />} />
      </Routes>
    </AppShell>
  )
}

export default App
