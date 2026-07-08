// these are the default options
const defaultOptions = {
  headingStyle: "atx",
  hr: "___",
  bulletListMarker: "-",
  codeBlockStyle: "fenced",
  fence: "```",
  emDelimiter: "_",
  strongDelimiter: "**",
  linkStyle: "inlined",
  linkReferenceStyle: "full",
  imageStyle: "markdown",
  imageRefStyle: "inlined",
  frontmatter: "---\ncreated: {date:YYYY-MM-DD HH:mm}\ntags: [research, source]\nsource: {baseURI}\nauthor: {byline}\nurl: {baseURI}\n---\n\n# {pageTitle}\n\n## 来源信息\n- 来源: {baseURI}\n- 作者: {byline}\n- 时间: {date:YYYY-MM-DD}\n\n## 正文\n\n{content}\n\n---\n*Clipped via MarkDownload*",
  backmatter: "",
  title: "{pageTitle}",
  includeTemplate: true,
  saveAs: false,
  mdClipsFolder: 'Obsidian-Clips',
  downloadImages: false,
  imagePrefix: '{pageTitle}/',
  disallowedChars: '[]#^',
  downloadMode: 'downloadsApi',
  turndownEscape: true,
  contextMenus: true,
  obsidianIntegration: false,
  obsidianVault: "",
  obsidianFolder: "",
}

// function to get the options from storage and substitute default options if it fails
async function getOptions() {
  let options = defaultOptions;
  try {
    options = await browser.storage.sync.get(defaultOptions);
  } catch (err) {
    console.error(err);
  }
  if (!browser.downloads) options.downloadMode = 'contentLink';
  return options;
}

