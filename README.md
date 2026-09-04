# 🚀 Upwork Jobs Scraper – Scrape Upwork Jobs to JSON, CSV & Excel

Scrape and aggregate job listings from **Upwork** (upwork.com) search results – job title, company, location, salary, posting date and a direct apply link – and export them to JSON, CSV, Excel or an API in a single run.

[View on Apify Store](#)

## 📖 Overview

The **Upwork Jobs Scraper** is a data-extraction tool that turns Upwork job search results into structured data. Upwork is the world's largest freelancing marketplace for contract, project and hourly work.

Whether you are building a job board, running labour-market research, tracking a competitor's hiring, or feeding an AI agent with live job data, this Actor returns clean, ready-to-use results in real time – no browser automation or manual copy-paste on your side.

## ✨ Key Features

- **🔍 Full-Text Job Search** – Search Upwork by keyword, job title or skill and walk every result page automatically.
- **🎯 Precise Filtering** – Narrow results by country, city or region, company name, employment type and how recently a job was posted.
- **📅 Fresh Data** – Pull only jobs posted today, in the last 3 days, this week or this month.
- **🧱 Structured Output** – Every listing is parsed into consistent fields you can sort, filter and export.
- **⚡ Fast & Low-Cost** – Optimised for speed and minimal compute so runs stay cheap.
- **🔌 API & No-Code Ready** – Call it from Python, Node.js, cURL, Zapier, Make, or an MCP client.

## 🔌 Use this API from Claude (MCP)

Add this Actor as a tool in Claude Code (free trial), Claude Cowork (free trial), Cursor, or any other MCP client, via the hosted Apify MCP server. Use this Actor-specific URL:

```
https://mcp.apify.com/?tools=actors,docs,orgupdate/upwork-jobs-scraper
```

 Setup walkthrough:

https://youtu.be/jREWahDGhJM?si=Cg8nqMq0MViap5_8

Apify MCP integration docs: https://docs.apify.com/platform/integrations/mcp

With the server connected, your agent can search Upwork listings by title and city, compare postings across employers, and pull salary and apply links into a single structured answer.

## 💸 Pay per result

This Actor uses **pay-per-event** pricing. You are charged per job result returned, plus a tiny automatic actor-start fee (about $0.0001) per run. There is no monthly subscription and no charge for a run that returns nothing – see the FAQ below.

### Pay per run with crypto (x402)

This API supports agentic payments via the **x402** protocol. AI agents and MCP clients can pay for runs in USDC (on Base) with no Apify account or API token required: point your agent at the Apify MCP server and it can discover, pay for, and run this Actor autonomously. See the Apify x402 announcement for details.

## 🛠 Input Parameters

The Actor accepts the following input parameters in JSON format.

| Parameter | Type | Required | Description | Default | Valid Values |
|-----------|------|----------|-------------|---------|--------------|
| `includeKeyword` | String | **Yes** | Search terms, job title or skills. Comma-separated values are supported. | - | Any string (e.g. `"Product Manager"`, `"React, Node.js"`) |
| `locationName` | String | **Yes** | City, state or region to search in. | - | Any location string (e.g. `"London"`, `"New York, NY"`) |
| `countryName` | String | **Yes** | Country context for the search. | `"all"` | `"usa"`, `"uk"`, `"india"`, `"all"`, etc. |
| `pagesToFetch` | Integer | **Yes** | Number of result pages to walk. | `1` | Positive integers |
| `companyName` | String | No | Restrict results to a single employer (e.g. `"an agency"`). | - | Any company name |
| `jobType` | String | No | Filter by employment type. | - | `FULLTIME`, `PARTTIME`, `CONTRACTOR`, `INTERN` |
| `datePosted` | String | No | How recent the jobs should be. | `"all"` | `all`, `today`, `3days`, `week`, `month` |

### 💻 Example Input

```json
{
  "includeKeyword": "software engineer, python",
  "locationName": "new york",
  "countryName": "usa",
  "companyName": "an agency",
  "jobType": "FULLTIME",
  "datePosted": "week",
  "pagesToFetch": 3
}
```

## 📊 Output Data

Results are stored in the default Apify dataset and can be downloaded as JSON, CSV, Excel, XML or HTML, or pulled straight from the dataset API.

### Sample JSON Output

```json
[
  {
    "job_title": "Senior Frontend Developer",
    "company_name": "Tech Corp Inc.",
    "location": "New York, NY (Remote)",
    "posted_via": "Upwork",
    "salary": "$120,000 - $150,000 a year",
    "date": "2025-03-25",
    "job_type": "Full-time",
    "URL": "https://upwork.com/..."
  }
]
```

### Field Dictionary

- **job_title** – The role title as published by the employer.
- **company_name** – The organisation hiring for the role.
- **location** – City / region, or `Remote` where stated.
- **posted_via** – The board or source the posting was found on.
- **salary** – Pay or pay range, when the employer provides one.
- **date** – The posting date.
- **job_type** – Full-time, part-time, contract or internship, when stated.
- **URL** – Direct link to the job listing / application page.

Not every Upwork listing includes every field – `salary`, `job_type` and exact `date` vary by posting – so handle optional fields gracefully in your integration.

## 🧩 How to Use

1. **Run on Apify** – Open the Actor in Apify Console, fill in the input form and click *Start*.
2. **Schedule & automate** – Set the Actor to run on a schedule to keep a job database fresh.
3. **Export or integrate** – Send results to your app, CRM, spreadsheet or data warehouse.

## 👨‍💻 Programmatic Usage

Run this Actor from the Apify API with the official clients. Replace `orgupdate/upwork-jobs-scraper` with the real Actor ID from the Actor page.

### Python

```python
from apify_client import ApifyClient

client = ApifyClient("YOUR_APIFY_TOKEN")

run_input = {
    "includeKeyword": "Data Scientist",
    "locationName": "London",
    "countryName": "uk",
    "datePosted": "3days",
    "pagesToFetch": 1,
}

run = client.actor("orgupdate/upwork-jobs-scraper").call(run_input=run_input)

for item in client.dataset(run["defaultDatasetId"]).iterate_items():
    print(item)
```

### Node.js

```javascript
import { ApifyClient } from 'apify-client';

const client = new ApifyClient({ token: 'YOUR_APIFY_TOKEN' });

const input = {
    includeKeyword: 'DevOps',
    locationName: 'Berlin',
    countryName: 'germany',
    jobType: 'CONTRACTOR',
    pagesToFetch: 2,
};

const run = await client.actor('orgupdate/upwork-jobs-scraper').call(input);
const { items } = await client.dataset(run.defaultDatasetId).listItems();
items.forEach((item) => console.dir(item));
```

## 🔗 Integrations

Don't just scrape data – act on it:

- **Zapier / Make** – Trigger an email, Slack or database action whenever a new matching job appears.
- **Google Sheets** – Append new job listings to a spreadsheet for tracking and analysis.
- **Slack / Discord** – Post new openings to a channel for your team or community.
- **n8n** – Add this Actor to any n8n workflow with the Apify node (or the HTTP Request node), including as an AI-Agent tool.

## 🗂 Featured Tasks

Ready-to-run configurations that solve a specific problem. Save any of these as a Task on your account and run it in one click.

- **Find remote Upwork jobs via MCP** – let an AI agent pull remote listings with company, source and direct apply links.
- **Track an agency's open roles** – monitor one employer's postings on Upwork on a daily schedule.
- **Jobs posted in the last 3 days** – recent Upwork listings filtered by `datePosted`, feeding a database.
- **Salary benchmark by city** – aggregate Upwork pay ranges for one job title across multiple locations.

## 💡 Use Cases

- **Job boards & aggregators** – Populate a niche board with fresh Upwork listings, no manual entry.
- **Recruitment & sourcing** – See which companies are hiring for which roles, and where.
- **Market research** – Track hiring demand, titles and salaries across regions over time.
- **Lead generation** – Find companies actively hiring so you can time an outreach.

## ❓ FAQ / Troubleshooting

**No results returned?**
Check that `includeKeyword` is not empty, use a job-title style query (e.g. `"Registered Nurse"`) rather than a long descriptive phrase, verify the spelling of `locationName` and `countryName`, and try removing the `jobType` / `datePosted` filters. Increasing `pagesToFetch` also helps on thin markets.

**Am I charged for a run that returns no jobs?**
No. Pricing is pay-per-result, so a run that finds nothing only costs the automatic actor-start fee (about $0.0001), whatever the cause – a narrow query, a thin local market or an over-tight filter.

**Fewer results than expected?**
Some queries genuinely have few listings on Upwork. Broaden the keyword (e.g. `"engineer"` instead of `"senior backend engineer"`), widen `datePosted`, and raise `pagesToFetch`.

**Getting duplicates on a daily schedule?**
Set `datePosted` to `today` or `3days` so each run only returns recent postings, and de-duplicate on the `URL` field when writing to your database.

## 🌐 Where the Data Comes From

Every row this Actor returns starts as a public listing on Upwork (upwork.com). Employers and job boards publish those postings; this Actor reads the search results and parses them into fields. This is an independent tool. It is **not** affiliated with, endorsed by, or operated by Upwork, and it does not use a private Upwork API.

### How is this different from searching Upwork by hand?

Browsing Upwork gives you one page of cards at a time and makes you keep loading more. This Actor walks the pagination for you and returns the whole set in one run, already parsed into `job_title`, `company_name`, `location`, `salary`, `date` and `URL` – fields you can sort, filter and export. An afternoon of scrolling and copy-paste becomes a run of a few minutes.

### Does Upwork have a public jobs API?

Not one that returns search results you can reuse this way. That gap is what this Actor fills: pass a keyword and a location and you get structured JSON back.

## 🏢 About

This Actor is part of **Orgupdate**, a suite of job-market data tools and APIs covering the major job boards, aggregators and ATS platforms. For support or feature requests, open a ticket from the Actor page or the Apify Console.

Happy scraping! 🚀
