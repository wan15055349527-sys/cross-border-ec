// Research Cleaner - Markdown 清洗工具
// 使用: node research-cleaner.js <input-file> [output-dir]

const fs = require("fs");
const path = require("path");

const VAULT_ROOT = __dirname;

function cleanMarkdown(content) {
    let result = content;
    
    // 处理 YAML frontmatter
    let frontmatter = "";
    const fmMatch = result.match(/^---\n[\s\S]*?\n---/);
    if (fmMatch) {
        frontmatter = fmMatch[0];
        result = result.slice(fmMatch[0].length);
    }
    
    // 确保标题层级合理
    const lines = result.split("\n");
    let hasH1 = false;
    const cleanLines = lines.map(line => {
        if (line.startsWith("# ") && !hasH1) {
            hasH1 = true;
            return line;
        } else if (line.startsWith("# ") && hasH1) {
            return line.replace("# ", "## ");
        }
        return line;
    });
    
    // 去除超长空行
    let cleaned = cleanLines.join("\n");
    cleaned = cleaned.replace(/\n{4,}/g, "\n\n\n");
    
    return { frontmatter, content: cleaned };
}

function extractSource(content) {
    const urlMatch = content.match(/https?:\/\/[^\s\)\"]+/g);
    const titleMatch = content.match(/^# (.+)$/m);
    return {
        title: titleMatch ? titleMatch[1].trim() : "Untitled",
        urls: urlMatch || []
    };
}

function suggestCategory(content) {
    const lower = content.toLowerCase();
    const keywords = {
        "AI": ["ai", "artificial intelligence", "machine learning", "deep learning", "llm", "gpt", "claude", "prompt", "agent", "model", "neural"],
        "Crypto": ["crypto", "blockchain", "bitcoin", "ethereum", "defi", "nft", "token", "web3", "solidity", "liquidity"],
        "US-Stocks": ["stock", "market", "etf", "nasdaq", "sp500", "trading", "portfolio", "valuation", "macro"],
        "Programming": ["code", "programming", "python", "javascript", "typescript", "api", "react", "node", "git", "deploy"],
        "Design": ["design", "ui", "ux", "figma", "color", "typography", "layout", "component", "prototype"],
        "Marketing": ["marketing", "seo", "growth", "conversion", "funnel", "audience", "brand", "content marketing"],
        "Finance": ["finance", "bank", "credit", "payment", "card", "capital", "investment", "risk"],
        "Photography": ["photography", "camera", "lens", "composition", "exposure", "lightroom", "photoshop"]
    };
    
    const scores = {};
    for (const [area, words] of Object.entries(keywords)) {
        scores[area] = words.filter(w => lower.includes(w)).length;
    }
    
    const best = Object.entries(scores).sort((a, b) => b[1] - a[1]);
    return best[0][1] > 0 ? best.filter(s => s[1] > 0).map(s => s[0]) : ["Uncategorized"];
}

function processFile(inputPath, outputDir) {
    const content = fs.readFileSync(inputPath, "utf8");
    const { content: cleaned } = cleanMarkdown(content);
    const { title, urls } = extractSource(content);
    const categories = suggestCategory(content);
    
    const date = new Date().toISOString().split("T")[0];
    const safeTitle = title.replace(/[\\\/:*?"<>|]/g, "").slice(0, 80);
    const filename = safeTitle + "-" + date + ".md";
    
    let newContent = "---\n";
    newContent += "created: " + date + "\n";
    newContent += "tags: [research, " + categories.join(", ") + "]\n";
    newContent += "status: cleaned\n";
    newContent += "source: " + (urls[0] || "") + "\n";
    newContent += "---\n\n";
    newContent += cleaned;
    
    const outputPath = path.join(outputDir, filename);
    fs.writeFileSync(outputPath, newContent, "utf8");
    
    return { inputPath, outputPath, title, categories, urls };
}

// CLI
const inputFile = process.argv[2];
const outputDir = process.argv[3] || path.join(VAULT_ROOT, "00-Inbox", "Cleaned");

if (!inputFile) {
    console.log("Usage: node research-cleaner.js <input-file> [output-dir]");
    console.log("Example: node research-cleaner.js 00-Inbox/Downloaded/article.md");
    process.exit(0);
}

const fullPath = path.resolve(VAULT_ROOT, inputFile);
if (!fs.existsSync(fullPath)) {
    console.error("File not found: " + fullPath);
    process.exit(1);
}

if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

const result = processFile(fullPath, outputDir);
console.log("Done");
console.log("  Input:  " + result.inputPath);
console.log("  Output: " + result.outputPath);
console.log("  Title:  " + result.title);
console.log("  Tags:   " + result.categories.join(", "));
console.log("  Links:  " + result.urls.length);
