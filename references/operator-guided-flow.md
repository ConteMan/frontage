# Operator Guided Flow

## Purpose

Guide non-technical operators from "I need a website" to a usable first version without asking them to write a complete prompt.

## Conversation Rules

- Ask in Chinese by default unless the operator asks for another language.
- Ask at most three questions per message.
- Use numbered options. Accept numbers, mixed numbers, or free-text answers.
- Include a recommended default when the operator may not know the answer.
- Do not require technical terms such as HTML, CSS, hosting, repository, build, server, or deployment pipeline.
- Do not block generation on non-critical unknowns. Use placeholders and mark them clearly.
- After at most three intake rounds, summarize choices and generate the first version.
- Do not package after first generation. Package only after preview, revisions, checklist, and operator confirmation.

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

## Round 3: Style and Content

Ask:

```text
选择页面风格、页面范围和内容完整度：

页面风格：
1. 稳重可信
2. 科技现代
3. 高端专业
4. 清爽简洁
5. 我有参考网站或 DESIGN.md

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
2. 调整风格：更科技、更高端、更清爽
3. 调整结构：增加/删除某个板块
4. 替换资料：公司介绍、产品说明、案例、联系方式
5. 替换用户协议或隐私政策内容
6. 调整 Logo/Icon
7. 准备最终打包
```

When the operator chooses packaging, show this checklist and ask for confirmation:

```text
最终打包前请确认：

1. 页面范围是否正确：
2. 联系方式是否已替换：
3. 用户协议是否使用你提供的正式内容：
4. 隐私政策是否使用你提供的正式内容：
5. Logo/Icon 是否可以先用当前版本：
6. 是否还有“待补充”占位内容：
7. 是否确认现在打包：
```

Then remind them to compress the contents of the site directory so the zip root contains `index.html`.
