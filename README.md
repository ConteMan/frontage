<div align="center">
  <h1>frontage</h1>
  <p><b>面向 AI 编码助手的静态商业网站 Skill。</b></p>
  <sub>引导不懂代码的运营人员，从"我要做一个官网"到一个可预览、可交付的纯静态网站——zip 按需生成。</sub>
  <p>🌐 <a href="README.en.md">English</a> · <b>中文</b></p>
</div>

---

`frontage` 是一个面向 AI 编码助手（Codex、Claude Code 等）的 Skill。它通过编号问题引导不懂代码的运营人员一步步生成、预览、修改、校验多页面静态商业网站。AI 干活，运营只需要回答选项、双击 `index.html` 预览，并按需要选择站点目录、GitHub 管理、FTP 上传或 zip 打包。

> **v0.1.0 范围：企业 / 公司官网。** SaaS 落地页、APP 官网、游戏 / 开发者官网在后续版本中加入。

## 运营怎么用

1. 打开 Codex / Claude Code。
2. 输入类似的提示词：

   ```text
   使用 $frontage，以向导模式帮我做一个企业官网。
   ```

3. 按编号选项回答 AI 的提问。
4. 双击生成目录里的 `index.html` 预览效果。
5. 用自然语言告诉 AI 要改什么。
6. 满意后选择交付方式：站点目录、GitHub 管理、FTP 上传，或需要时生成 zip。
7. 按选定的部署目标发布，例如 Cloudflare Pages Direct Upload、GitHub Pages、FTP/SFTP 或主机面板。

整个过程运营**不需要**安装 Git、Node.js、本地服务器或前端构建工具。

## 安装

### Codex

**macOS / Linux**

```bash
mkdir -p ~/.codex/skills
git clone https://github.com/ConteMan/frontage.git ~/.codex/skills/frontage
```

**Windows PowerShell**

```powershell
$dir = "$env:USERPROFILE\.codex\skills"
mkdir $dir -Force | Out-Null
git clone https://github.com/ConteMan/frontage.git "$dir\frontage"
```

安装完成后重启 Codex（或开新会话），Skill 会被自动发现。

### Claude Code

两种方式任选一种。

**方式 A：通过 Plugin Marketplace**（需要 Claude Code v2.1.142+）

```text
/plugin marketplace add ConteMan/frontage
/plugin install frontage@frontage
```

**方式 B：手动安装到 Skills 目录**

**macOS / Linux**

```bash
mkdir -p ~/.claude/skills
git clone https://github.com/ConteMan/frontage.git ~/.claude/skills/frontage
```

**Windows PowerShell**

```powershell
$dir = "$env:USERPROFILE\.claude\skills"
mkdir $dir -Force | Out-Null
git clone https://github.com/ConteMan/frontage.git "$dir\frontage"
```

### 其他 AI 助手

从 [Releases](https://github.com/ConteMan/frontage/releases/latest) 下载 `frontage.zip`，然后：

- 解压到该助手的 skill 目录；或
- 通过该助手的 Skill 上传界面上传 zip。

## 更新

**Git 安装方式**

```bash
# macOS / Linux
git -C ~/.codex/skills/frontage pull          # Codex
git -C ~/.claude/skills/frontage pull         # Claude Code 手动安装
```

```powershell
# Windows PowerShell
git -C $env:USERPROFILE\.codex\skills\frontage pull
git -C $env:USERPROFILE\.claude\skills\frontage pull
```

**Claude Code Plugin Marketplace 安装方式**

```text
claude plugin update frontage
```

frontage 在每次任务开始时会做一次非阻塞的版本检查（`scripts/check-update.mjs`），最多每天一次，如果发现新版本会在聊天中提醒一行。它支持 Windows PowerShell 和 macOS 环境，只读取 GitHub 上的公共 VERSION 文件，不发送任何数据；离线、沙箱环境或没有 Node.js 时静默跳过。

## 目录结构

```text
SKILL.md                              Skill 入口和工作流
references/
  site-standards.md                   页面结构、文案规则、QA
  operator-guided-flow.md             向导模式的编号问题流程
  page-matrix.md                      不同站型对应的默认页面
  design-md-guide.md                  视觉风格与 design.md 使用
  brand-assets-guide.md               Logo / 图标生成规则
  image-policy.md                     图片角色与占位策略
  legal-page-templates.md             隐私 / 用户协议 / 联系页面处理
  deploy/
    cloudflare-pages.md               Cloudflare Pages Direct Upload 指南（需要 zip）
    github-static.md                  GitHub 管理静态站点指南（不需要 zip）
    ftp-upload.md                     FTP/SFTP 或主机面板上传指南（默认不需要 zip）
    _template.md                      新增部署目标的模板
assets/templates/
  corporate/                          企业官网模板（v0.1.0）
scripts/
  validate-static-site.mjs            HTML / 资源 / 导航校验
  package-static-site.mjs             纯 Node 校验 + 按需打包
  check-update.mjs                    跨平台非阻塞每日更新检查
  check-update.sh                     Bash 兼容入口
.claude-plugin/marketplace.json       Claude plugin marketplace 元数据
VERSION                               0.1.2
```

## 路线图

- 更多站型：SaaS 落地页、APP 官网、游戏 / 开发者官网。
- 更多部署目标：Vercel、Netlify、企业内部上传平台。
- 可选的 plugin marketplace 入口。

## 许可

MIT。详见 [LICENSE](LICENSE)。
