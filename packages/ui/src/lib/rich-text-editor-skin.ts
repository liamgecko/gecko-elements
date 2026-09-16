import { editorToolbarIconsCss } from "@geckolabs/elements/lib/rich-text-editor-icons";

// Gecko's skin layer for TinyMCE 4's unmodified Modern/Lightgray layout.
// This stylesheet is injected into the UI frame only, never the authored document.
const regularFont = new URL(
  "../assets/fonts/Satoshi-Regular.woff2",
  import.meta.url,
).href;
const mediumFont = new URL(
  "../assets/fonts/Satoshi-Medium.woff2",
  import.meta.url,
).href;
const boldFont = new URL("../assets/fonts/Satoshi-Bold.woff2", import.meta.url)
  .href;

export const editorChromeCss = `
@font-face { font-family:GeckoEditor; src:url("${regularFont}") format("woff2"); font-weight:400; font-display:swap; font-feature-settings:"salt" 1; }
@font-face { font-family:GeckoEditor; src:url("${mediumFont}") format("woff2"); font-weight:500; font-display:swap; font-feature-settings:"salt" 1; }
@font-face { font-family:GeckoEditor; src:url("${boldFont}") format("woff2"); font-weight:600 700; font-display:swap; font-feature-settings:"salt" 1; }
:root { --rte-control-radius:calc(var(--rte-radius, 7.2px) - 4px); }
html,body { height:100%; overflow:hidden; margin:0; padding:0; background:var(--rte-background); color:var(--rte-foreground); }
html { color-scheme:light; } html[data-dark] { color-scheme:dark; }
.mce-tinymce { box-sizing:border-box; height:100% !important; border:0; box-shadow:none; }
.mce-tinymce > .mce-container-body { display:flex; flex-direction:column; height:100%; }
.mce-edit-area { box-shadow:none; flex:1; min-height:0; border-color:var(--rte-border); border-top-width:0 !important; }
.mce-edit-area iframe { height:100% !important; }
.mce-container,.mce-container *,.mce-widget,.mce-widget * { font-family:GeckoEditor,system-ui,sans-serif; font-size:14px; text-shadow:none; -webkit-font-smoothing:antialiased; }
.mce-container .mce-ico,.mce-widget .mce-ico { font-family:tinymce; font-size:16px; -webkit-font-smoothing:antialiased; }
.mce-panel,.mce-menu,.mce-foot,.mce-window-head,.mce-window-body { background:var(--rte-background); background-image:none; border-color:var(--rte-border); }
.mce-container,.mce-container *,.mce-widget,.mce-widget * { color:var(--rte-foreground); }

/* A compact, quiet toolbar with the same 32px controls as Elements. */
.mce-top-part::before { box-shadow:none; }
.mce-toolbar-grp { padding:8px; background:var(--rte-muted); border-bottom:1px solid var(--rte-border); }
.mce-toolbar .mce-btn-group { margin:0 6px 0 0; padding:0; border:0; }
.mce-toolbar .mce-btn-group > .mce-container-body { display:inline-flex; align-items:center; gap:2px; }
.mce-toolbar .mce-btn { margin:0; border:0; border-radius:4px; }
.mce-toolbar .mce-btn button { display:flex; align-items:center; justify-content:center; height:32px; min-height:32px; padding:7px; gap:4px; }
.mce-toolbar .mce-ico { width:18px; height:18px; }
.mce-toolbar .mce-listbox { width:106px; }
.mce-toolbar .mce-listbox:nth-child(3) { width:64px; }
.mce-toolbar .mce-listbox button { width:100%; min-width:0 !important; justify-content:flex-start; padding:6px 24px 6px 8px; }
.mce-toolbar .mce-listbox .mce-txt { font-weight:500; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
.mce-toolbar .mce-splitbtn .mce-open { width:18px; padding:0; border:0; }
.mce-toolbar .mce-splitbtn > button { display:inline-flex; }
.mce-toolbar .mce-splitbtn { display:inline-flex; }
/* TinyMCE's legacy caret margin assumes inline buttons rather than centred flex controls. */
.mce-toolbar .mce-btn .mce-caret { margin:0; align-self:center; flex-shrink:0; border-top-color:var(--rte-muted-foreground); }
.mce-toolbar .mce-listbox .mce-caret { top:50%; transform:translateY(-50%); }
.mce-toolbar .mce-btn:is(:hover,:focus,:active,.mce-active,.mce-opened) .mce-caret { border-top-color:var(--rte-muted-foreground); }
.mce-toolbar .mce-btn:is(.mce-active,.mce-opened) :is(button,.mce-txt,.mce-ico) { color:var(--rte-foreground); }
.mce-btn { background:transparent; background-image:none; border:1px solid transparent; border-radius:var(--rte-control-radius); box-shadow:none; }
.mce-btn button { box-sizing:border-box; min-height:30px; padding:5px 7px; line-height:20px; font-weight:500; }
.mce-btn .mce-txt { font-size:14px; line-height:20px; }
.mce-btn:hover,.mce-btn:focus { background:var(--rte-accent); border-color:transparent; box-shadow:none; }
.mce-btn.mce-active,.mce-btn.mce-active:hover,.mce-btn.mce-active:focus { background:var(--rte-accent); border-color:var(--rte-border); box-shadow:none; }
.mce-btn button,.mce-btn .mce-txt,.mce-btn .mce-ico,.mce-label { color:var(--rte-foreground); }
.mce-btn.mce-disabled,.mce-btn.mce-disabled:hover { opacity:.4; background:transparent; border-color:transparent; cursor:default; }
.mce-btn.mce-disabled button { cursor:default; }
.mce-caret { border-top-color:var(--rte-muted-foreground); }
.mce-toolbar .mce-listbox { background:transparent; border-color:transparent; }
/* Same foreground/5 overlay as DataTableColumnHeader's sorting control. */
.mce-toolbar .mce-btn:not(.mce-disabled):is(:hover,.mce-active,.mce-opened) { background:color-mix(in oklab,var(--rte-foreground) 5%,transparent); }
.mce-listbox .mce-txt { font-weight:500; }
.mce-listbox button { padding-left:10px; padding-right:26px; }
.mce-splitbtn .mce-open { border-left:1px solid transparent; }
.mce-splitbtn:hover .mce-open,.mce-splitbtn.mce-active .mce-open { border-left-color:var(--rte-border); }
.mce-btn button:focus-visible,.mce-checkbox:focus-visible,.mce-close:focus-visible { outline:2px solid var(--rte-ring); outline-offset:1px; }

/* Popups keep TinyMCE's keyboard handling and positioning. Long menus must
   fit below a wrapped toolbar rather than being clamped over their trigger. */
.mce-toolbar .mce-btn.mce-opened { z-index:auto; border-bottom-color:transparent; }
.mce-menu { max-height:min(320px,calc(100vh - 112px)); overflow-y:auto; padding:4px; border:1px solid var(--rte-border); border-radius:var(--rte-radius); box-shadow:var(--rte-elevation-md); }
.mce-menu-item { margin:1px 0; padding:6px 8px; border-radius:var(--rte-control-radius); background:transparent; }
.mce-menu-item .mce-text { font-size:14px; font-weight:500; line-height:20px; }
.mce-menu-item:hover,.mce-menu-item:focus,.mce-menu-item.mce-selected,.mce-menu-item.mce-active { background:var(--rte-accent); }
.mce-menu-item:hover .mce-text,.mce-menu-item:focus .mce-text,.mce-menu-item.mce-selected .mce-text,.mce-menu-item.mce-active .mce-text { color:var(--rte-foreground); }
.mce-menu-item .mce-shortcut { font-size:12px; font-weight:500; color:var(--rte-muted-foreground); }
.mce-menu-item-sep,.mce-menu-item-sep:hover { height:1px; margin:4px -4px; padding:0; border:0; background:var(--rte-border); border-radius:0; }
.mce-menu-item.mce-disabled,.mce-menu-item.mce-disabled:hover,.mce-menu-item.mce-disabled:focus,.mce-menu-item.mce-disabled:hover:focus { background:transparent; }
.mce-menu-item.mce-disabled .mce-text,.mce-menu-item.mce-disabled .mce-ico { color:var(--rte-muted-foreground); opacity:.5; }
.mce-menu-item-expand .mce-caret { border-left-color:var(--rte-muted-foreground); }

/* Dialog dimensions remain managed by TinyMCE's layout engine. */
#mce-modal-block { background:var(--rte-backdrop); }
#mce-modal-block.mce-in { opacity:1; }
.mce-window { max-width:calc(100vw - 16px); max-height:calc(100vh - 16px); overflow:auto; border:1px solid var(--rte-border); border-radius:var(--rte-radius); box-shadow:var(--rte-elevation-md); background:var(--rte-background); }
.mce-window-head { border-bottom:1px solid var(--rte-border); }
.mce-window-head .mce-title { font-family:GeckoEditor,system-ui,sans-serif; font-size:18px; font-weight:700; line-height:24px; }
.mce-window-head .mce-close { color:var(--rte-muted-foreground); background:transparent; border-radius:var(--rte-control-radius); text-shadow:none; }
.mce-window-head .mce-close:hover { background:var(--rte-accent); color:var(--rte-foreground); }
.mce-window-body .mce-listbox { border-color:var(--rte-input); }
.mce-window .mce-btn:hover { border-color:var(--rte-input-hover); }
.mce-window .mce-btn:focus { border-color:var(--rte-ring); }
.mce-window .mce-label { font-size:13px; font-weight:500; }
.mce-foot { border-top:1px solid var(--rte-border); background:var(--rte-background); }
.mce-foot .mce-btn { border-color:var(--rte-input); background:var(--rte-background); }
.mce-foot .mce-btn:hover { background:var(--rte-accent); }
.mce-primary,.mce-foot .mce-primary,.mce-primary:hover,.mce-foot .mce-primary:hover { background:var(--rte-primary); border-color:var(--rte-primary); }
.mce-primary button,.mce-primary .mce-txt { color:var(--rte-primary-foreground); }
.mce-primary:hover { filter:brightness(.95); }
.mce-combobox input { border-color:var(--rte-input); }
.mce-combobox .mce-btn { border-color:var(--rte-input); }
.mce-textbox { box-sizing:border-box; padding:5px 8px; font-family:GeckoEditor,system-ui,sans-serif; font-size:14px; background:var(--rte-input-background); border:1px solid var(--rte-input); border-radius:var(--rte-control-radius); color:var(--rte-foreground); box-shadow:none; }
.mce-textbox:hover { border-color:var(--rte-input-hover); }
.mce-textbox:focus { outline:none; border-color:var(--rte-ring); box-shadow:0 0 0 2px color-mix(in srgb,var(--rte-ring) 30%,transparent); }
textarea.mce-textbox { font-family:ui-monospace,SFMono-Regular,Consolas,monospace; font-size:13px; line-height:1.5; }
.mce-combobox,.mce-listbox { background:var(--rte-input-background); border-color:var(--rte-input); color:var(--rte-foreground); }
.mce-checkbox i { background:var(--rte-input-background); border-color:var(--rte-input); border-radius:var(--rte-control-radius); box-shadow:none; }
.mce-checkbox.mce-checked i { background:var(--rte-primary); border-color:var(--rte-primary); color:var(--rte-primary-foreground); }
.mce-tabs { border-color:var(--rte-border); }
.mce-tab { border-color:transparent; background:transparent; color:var(--rte-muted-foreground); }
.mce-tab.mce-active { border-color:var(--rte-border); background:var(--rte-background); color:var(--rte-foreground); }
.mce-statusbar { background:var(--rte-background); border-top:1px solid var(--rte-border); }
.mce-path,.mce-path-item,.mce-path-divider,.mce-branding { font-size:11px; font-weight:500; color:var(--rte-muted-foreground); }
/* TooltipContent geometry and tokens, with medium-weight editor tooltip labels. */
.mce-tooltip { padding:4px; margin:0; opacity:1; filter:none; }
.mce-tooltip-inner { box-sizing:border-box; width:fit-content; max-width:320px; padding:6px 12px; border:1px solid var(--rte-foreground); background:var(--rte-foreground); color:var(--rte-background); border-radius:calc(var(--rte-radius) - 2px); font-family:GeckoEditor,system-ui,sans-serif; font-size:12px; font-weight:500; line-height:16px; text-align:start; text-shadow:none; box-shadow:var(--rte-elevation-md); }
.mce-tooltip-arrow { display:none; }
${editorToolbarIconsCss}
`;
