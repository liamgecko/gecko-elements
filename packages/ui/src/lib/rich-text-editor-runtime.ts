// Narrow, private boundary around the vendored TinyMCE 4 runtime.
export interface LegacyEditor {
  initialized?: boolean;
  settings: Record<string, unknown>;
  getContent(options?: { format?: string }): string;
  setContent(html: string): void;
  insertContent(html: string): void;
  focus(): void;
  remove(): void;
  setMode(mode: "readonly" | "design"): void;
  isDirty(): boolean;
  setDirty(dirty: boolean): void;
  on(events: string, callback: () => void): void;
  getBody(): HTMLElement;
  getDoc(): Document;
  getContainer(): HTMLElement;
  undoManager: { clear(): void };
  serializer: {
    addNodeFilter(
      names: string,
      callback: (nodes: Array<{ firstChild?: { value: string } }>) => void,
    ): void;
  };
}

export interface LegacyRuntime {
  majorVersion: string;
  minorVersion: string;
  init(options: Record<string, unknown>): Promise<LegacyEditor[]>;
}

export const legacyEmailConfig = {
  format: "raw",
  plugins:
    "autoresize link image code table hr textcolor lists colorpicker charmap paste fullpage",
  toolbar:
    "undo redo | formatselect fontselect fontsizeselect | bold italic underline strikethrough forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image table | hr charmap pastetext removeformat code",
  cleanup: false,
  verify_html: false,
  menubar: false,
  branding: false,
  browser_spellcheck: true,
  contextmenu: false,
  valid_children: "+body[style]",
  convert_urls: false,
  relative_urls: false,
  remove_script_host: false,
  paste_data_images: false,
};

/** Preserve the Admin serializer workaround; do not change email markup here. */
export function preserveLegacyStyles(editor: LegacyEditor) {
  editor.serializer.addNodeFilter("script,style", (nodes) => {
    for (const node of nodes) {
      if (!node.firstChild?.value) continue;
      node.firstChild.value = node.firstChild.value
        .replace(/(<!--\[CDATA\[|\]\]-->)/g, "\n")
        .replace(/^[\r\n]*|[\r\n]*$/g, "")
        .replace(
          /^\s*((<!--)?(\s*\/\/)?\s*<!\[CDATA\[|(<!--\s*)?\/\*\s*<!\[CDATA\[\s*\*\/|(\/\/)?\s*<!--|\/\*\s*<!--\s*\*\/)\s*[\r\n]*/gi,
          "",
        )
        .replace(
          /\s*(\/\*\s*\]\]>\s*\*\/(-->)?|\s*\/\/\s*\]\]>(-->)?|\/\/\s*(-->)?|\]\]>|\/\*\s*-->\s*\*\/|\s*-->\s*)\s*$/g,
          "",
        );
    }
  });
}
