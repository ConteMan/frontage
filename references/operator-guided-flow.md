# Operator Guided Flow

## Purpose

Guide non-technical operators from "I need a website" to a usable first version without asking them to write a complete prompt.

## Conversation Rules

- Ask in Chinese by default unless the operator asks for another language.
- Ask at most three questions per message.
- Use numbered options. Accept numbers, mixed numbers, or free-text answers.
- Include a recommended default when the operator may not know the answer.
- Do not require technical terms such as HTML, CSS, hosting, repository, build, server, or deployment pipeline.
- When asking about visual style, briefly explain DESIGN.md as a "网站视觉说明书" and recommend it as the best way to match the operator's taste. Keep it optional.
- Do not block generation on non-critical unknowns. Use placeholders and mark them clearly.
- After at most three intake rounds, summarize choices and generate the first version.
- Do not package after first generation. Package only after preview, revisions, checklist, and an operator-selected zip-based handoff.

## Round 1: Website Direction

Ask these first:

```text
先选网站方向。可以直接回复编号，也可以补充说明。

1. 企业官网：介绍公司、服务和联系方式
2. 产品/服务落地页：突出单个产品、服务或活动
3. 招商加盟页：面向代理、渠道或合作伙伴
4. 品牌展示页：强调品牌形象、案例和实力
5. 不确定：请使用推荐默认值

公司/品牌名是什么？
主要希望访客做什么？例如联系我们、预约演示、获取报价、下载资料。
```

If the operator is unsure, default to "企业官网" and "联系我们".

## Round 2: Audience and Offer

Ask:

```text
再确认业务和客户。可以简单写，不需要专业术语。

1. 你的主要客户是谁？
2. 你主要提供什么产品或服务？
3. 你最想强调哪 1-3 个卖点？

如果不确定，可以回复“用推荐默认值”。
```

If details are thin, infer from the brand/business type and use neutral placeholders.

## Round 3: Style Calibration and Content

Ask:

```text
先做一个可选的风格校准。DESIGN.md 可以理解成“网站视觉说明书”，不需要写代码；如果你能从参考网站或风格库挑一个接近预期的 DESIGN.md，我会更稳定地贴合你想要的效果。

页面风格（推荐先选 1 或 2；不确定可选 4）：
1. 我从 styles.refero.design 或 getdesign.md 找到一个风格，会粘贴 DESIGN.md 或 URL
2. 我给你一个参考站点 URL，请先提取可见的颜色 / 字体 / 版式，整理成临时 DESIGN.md 给我确认
3. 我已有 DESIGN.md，待会粘贴给你
4. 我暂时不确定，先使用 frontage 内置预设：
   4a. 稳重可信  4b. 科技现代  4c. 高端专业  4d. 清爽简洁  4e. 活力增长

内容策略：
1. 先生成完整首版，缺失信息用占位符
2. 先生成精简版，后续慢慢补
3. 我会提供更多资料

页面范围：
1. 使用默认页面：首页、关于我们、服务、联系我们、隐私政策、用户协议
2. 只先做首页和联系页
3. 我想自己选择页面
```

If the operator does not choose, default to "稳重可信" for traditional services and "科技现代" for software, AI, data, manufacturing technology, or digital products.

If the operator chooses option 1, ask them to paste either the DESIGN.md content or the exact catalog page URL. If they have not picked one yet, suggest opening `styles.refero.design` for modern product styles or `getdesign.md/design-md` for industry-oriented business styles.

If the operator chooses option 2, fetch or inspect only the URL they provide, produce a short synthetic DESIGN.md summary, and ask them to confirm before generating the site.

## Confirmation Summary

Before creating files, summarize:

```text
我将按以下方向生成首版：

- 网站类型：
- 品牌名：
- 目标客户：
- 核心产品/服务：
- 主要卖点：
- 页面风格：
- 风格来源 / DESIGN.md 状态：
- 主要行动按钮（希望访客点击后做什么）：
- 默认页面：
- Logo/Icon 方向：
- 法务页面处理：
- 联系方式：
- 缺失信息处理：

如果没有问题，我会先生成可直接打开 index.html 预览的静态网站。
```

If the operator confirms or gives no objection, generate the site.

## Defaults

Use these defaults when information is missing:

- Website type: 企业官网
- Main action button: 联系我们
- Style: 稳重可信
- Design source: built-in preset, unless the operator provides a DESIGN.md, catalog URL, or reference site URL
- Language: 中文
- Sections: hero, trust strip, services, use cases, differentiators, process, proof placeholders, FAQ, final action area, footer
- Pages: index.html, about.html, services.html, contact.html, privacy.html, terms.html
- Contact: use a placeholder and label it "待补充"
- Proof: use clearly marked placeholders, never invent real customer names or numbers
- Logo/Icon: create simple SVG text or monogram assets by default
- Legal pages: prefer user-provided content. If missing, generate clearly labeled drafts requiring review.

## Post-preview Iteration

After first preview, offer focused revision choices:

```text
你可以按下面方向继续改：

1. 调整文案：更正式、更简短、更有销售感
2. 调整风格：粘贴 / 更换 DESIGN.md，或改成更科技、更高端、更清爽
3. 调整结构：增加/删除某个板块
4. 替换资料：公司介绍、产品说明、案例、联系方式
5. 替换用户协议或隐私政策内容
6. 调整 Logo/Icon
7. 选择交付方式 / 准备发布
```

When the operator chooses final handoff, ask for the preferred handoff method, then show this checklist and ask for confirmation:

```text
最终交付前请确认：

1. 页面范围是否正确：
2. 联系方式是否已替换：
3. 用户协议是否使用你提供的正式内容：
4. 隐私政策是否使用你提供的正式内容：
5. Logo/Icon 是否可以先用当前版本：
6. 是否还有“待补充”占位内容：
7. 交付方式：
   7a. 只要站点目录，后续用 GitHub 管理
   7b. 只要站点目录，后续用 FTP/SFTP 或主机面板上传
   7c. 需要 zip，用于 Cloudflare Pages Direct Upload 或其他上传平台
   7d. 先不确定，暂时只交付站点目录
```

If the operator chooses a zip-based handoff, remind them to compress the contents of the site directory so the zip root contains `index.html`. If they choose GitHub, FTP/SFTP, hosting panel upload, or "not sure yet", keep the handoff as a site directory and do not create a zip by default.
