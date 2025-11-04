# Apify - Upwork Jobs Scraper

## Overview

The **Upwork Jobs Scraper** is a powerful tool designed to scrape and aggregate job listings from multiple sources. Whether you're building a job portal, conducting market research, or tracking employment trends, this actor provides structured job data in real time.

## Features

- ✅ **Multi-Source Scraping** – Collect job listings from multiple job boards and career pages.
- 🔍 **Advanced Filtering** – Search by industry, location, company, and keywords.
- 📅 **Real-Time Data** – Fetch the latest job postings as they appear.
- 🏷️ **Structured Output** – Get clean JSON data with job titles, descriptions, salaries, and more.
- 🚀 **Fast & Scalable** – Optimized for speed and large-scale data collection.

## Use Cases

- **Job Aggregators** – Power your job board with fresh listings.
- **Recruitment Agencies** – Find and analyze hiring trends.
- **Market Research** – Track job demand across industries.

## Input Parameters

| Parameter        | Type    | Description                                                                          |
| ---------------- | ------- | ------------------------------------------------------------------------------------ |
| `countryName`    | String  | Select the country for job search. Default: "all".                                   |
| `companyName`    | String  | (Optional) Enter the company name to filter job listings.                            |
| `locationName`   | String  | (Optional) Enter the city or region.                                                 |
| `includeKeyword` | String  | (Optional) Comma-separated keywords (e.g., React, Next.js, remote, part time).       |
| `pagesToFetch`   | Integer | Number of pages to scrape. Minimum: 1. Default: 1.                                   |
| `datePosted`     | String  | Value can be "all", "24h", "48h", "3days", "7days", "14days". Default: "all". |

### Example Input:

```json
{
  "countryName": "usa",
  "companyName": "google",
  "locationName": "new york",
  "includeKeyword": "python, django",
  "pagesToFetch": 2
}
```

## Output Format

The actor returns structured job listings in JSON format:

```json
[
  {
    "job_title": "Frontend Developer",
    "company_name": "Tech Corp",
    "location": "Remote",
    "posted_via": "Upwork",
    "salary": "$75,000 - $90,000",
    "date": "2025-03-25",
    "URL": "https://example.com/job/frontend-dev"
  }
]
```

## How to Use

1. **Deploy on Apify** – Run the actor directly from the Apify platform.
2. **Schedule & Automate** – Set up periodic runs to keep your job database updated.
3. **Export Data** – Integrate with your CRM, website, or analytics platform.

## Why Use This Actor?

- **No Coding Required** – Easy-to-use with minimal setup.
- **Saves Time** – Automates job data collection.
- **Customizable** – Supports tailored scraping configurations.

## Get Started

1. Sign up on [Apify](https://apify.com/).
2. Search for **Upwork Jobs Scraper**.
3. Enter your search parameters and run the actor.

Start collecting job data effortlessly! 🚀
