import { Routes, Route } from "react-router-dom"
import { AppShell } from "@/components/layout/app-shell"
import { Toaster } from "@/components/ui/toast"
import { HomePage } from "@/pages/home"
import { AccordionPage } from "@/pages/accordion"
import { AlertPage } from "@/pages/alert"
import { AlertDialogPage } from "@/pages/alert-dialog"
import { AvatarPage } from "@/pages/avatar"
import { AvatarGroupPage } from "@/pages/avatar-group"
import { BadgePage } from "@/pages/badge"
import { BreadcrumbPage } from "@/pages/breadcrumb"
import { ButtonPage } from "@/pages/button"
import { CalendarPage } from "@/pages/calendar"
import { CardPage } from "@/pages/card"
import { CheckboxPage } from "@/pages/checkbox"
import { ComboboxPage } from "@/pages/combobox"
import { CommandPage } from "@/pages/command"
import { ContextMenuPage } from "@/pages/context-menu"
import { DateInputPage } from "@/pages/date-input"
import { DatePickerPage } from "@/pages/date-picker"
import { DialogPage } from "@/pages/dialog"
import { DirectionPage } from "@/pages/direction"
import { DropdownMenuPage } from "@/pages/dropdown-menu"
import { EmptyPage } from "@/pages/empty"
import { FieldPage } from "@/pages/field"
import { InputPage } from "@/pages/input"
import { InputOtpPage } from "@/pages/input-otp"
import { KbdPage } from "@/pages/kbd"
import { LabelPage } from "@/pages/label"
import { NativeSelectPage } from "@/pages/native-select"
import { NumberFieldPage } from "@/pages/number-field"
import { PaginationPage } from "@/pages/pagination"
import { PopoverPage } from "@/pages/popover"
import { ProgressPage } from "@/pages/progress"
import { RadioGroupPage } from "@/pages/radio-group"
import { ScrollAreaPage } from "@/pages/scroll-area"
import { SelectPage } from "@/pages/select"
import { SeparatorPage } from "@/pages/separator"
import { SheetPage } from "@/pages/sheet"
import { ToastPage } from "@/pages/toast"
import { SpinnerPage } from "@/pages/spinner"
import { SwitchPage } from "@/pages/switch"
import { TablePage } from "@/pages/table"
import { TabsPage } from "@/pages/tabs"
import { TextareaPage } from "@/pages/textarea"
import { TooltipPage } from "@/pages/tooltip"
import { SidebarPage } from "@/pages/sidebar"
import { ChatBubblePage } from "@/pages/chat-bubble"
import { ChatHeadPage } from "@/pages/chat-head"
import { ColorPickerPage } from "@/pages/color-picker"
import { DataTablePage } from "@/pages/data-table"
import { ReplyBoxPage } from "@/pages/reply-box"
import { TypingIndicatorPage } from "@/pages/typing-indicator"
import { MetricCardPage } from "@/pages/metric-card"
import { ChartsPage } from "@/pages/charts"
import { TelephoneInputPage } from "@/pages/telephone-input"
import { SearchInputPage } from "@/pages/search-input"
import { FileInputPage } from "@/pages/file-input"
import { DropZonePage } from "@/pages/drop-zone"
import { CounterPage } from "@/pages/counter"
import { CodeSnippetPage } from "@/pages/code-snippet"
import { FiltersPage } from "@/pages/filters"

export function App() {
  return (
    <AppShell>
      <Toaster />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/components/accordion" element={<AccordionPage />} />
        <Route path="/components/alert" element={<AlertPage />} />
        <Route path="/components/alert-dialog" element={<AlertDialogPage />} />
        <Route path="/components/avatar" element={<AvatarPage />} />
        <Route path="/components/avatar-group" element={<AvatarGroupPage />} />
        <Route path="/components/badge" element={<BadgePage />} />
        <Route path="/components/breadcrumb" element={<BreadcrumbPage />} />
        <Route path="/components/button" element={<ButtonPage />} />
        <Route path="/components/calendar" element={<CalendarPage />} />
        <Route path="/components/card" element={<CardPage />} />
        <Route path="/components/checkbox" element={<CheckboxPage />} />
        <Route path="/components/combobox" element={<ComboboxPage />} />
        <Route path="/components/command" element={<CommandPage />} />
        <Route path="/components/context-menu" element={<ContextMenuPage />} />
        <Route path="/components/date-input" element={<DateInputPage />} />
        <Route path="/components/date-picker" element={<DatePickerPage />} />
        <Route path="/components/dialog" element={<DialogPage />} />
        <Route path="/components/direction" element={<DirectionPage />} />
        <Route path="/components/dropdown-menu" element={<DropdownMenuPage />} />
        <Route path="/components/empty" element={<EmptyPage />} />
        <Route path="/components/field" element={<FieldPage />} />
        <Route path="/components/input" element={<InputPage />} />
        <Route path="/components/input-otp" element={<InputOtpPage />} />
        <Route path="/components/kbd" element={<KbdPage />} />
        <Route path="/components/label" element={<LabelPage />} />
        <Route path="/components/native-select" element={<NativeSelectPage />} />
        <Route path="/components/number-field" element={<NumberFieldPage />} />
        <Route path="/components/pagination" element={<PaginationPage />} />
        <Route path="/components/popover" element={<PopoverPage />} />
        <Route path="/components/progress" element={<ProgressPage />} />
        <Route path="/components/radio-group" element={<RadioGroupPage />} />
        <Route path="/components/scroll-area" element={<ScrollAreaPage />} />
        <Route path="/components/select" element={<SelectPage />} />
        <Route path="/components/separator" element={<SeparatorPage />} />
        <Route path="/components/sheet" element={<SheetPage />} />
        <Route path="/components/toast" element={<ToastPage />} />
        <Route path="/components/spinner" element={<SpinnerPage />} />
        <Route path="/components/switch" element={<SwitchPage />} />
        <Route path="/components/table" element={<TablePage />} />
        <Route path="/components/tabs" element={<TabsPage />} />
        <Route path="/components/textarea" element={<TextareaPage />} />
        <Route path="/components/tooltip" element={<TooltipPage />} />
        <Route path="/components/sidebar" element={<SidebarPage />} />
        <Route path="/components/chat-bubble" element={<ChatBubblePage />} />
        <Route path="/components/chat-head" element={<ChatHeadPage />} />
        <Route path="/components/color-picker" element={<ColorPickerPage />} />
        <Route path="/components/data-table" element={<DataTablePage />} />
        <Route path="/components/reply-box" element={<ReplyBoxPage />} />
        <Route path="/components/typing-indicator" element={<TypingIndicatorPage />} />
        <Route path="/components/metric-card" element={<MetricCardPage />} />
        <Route path="/components/charts" element={<ChartsPage />} />
        <Route path="/components/telephone-input" element={<TelephoneInputPage />} />
        <Route path="/components/search-input" element={<SearchInputPage />} />
        <Route path="/components/file-input" element={<FileInputPage />} />
        <Route path="/components/drop-zone" element={<DropZonePage />} />
        <Route path="/components/counter" element={<CounterPage />} />
        <Route path="/components/filters" element={<FiltersPage />} />
        <Route path="/components/code-snippet" element={<CodeSnippetPage />} />
      </Routes>
    </AppShell>
  )
}

export default App
