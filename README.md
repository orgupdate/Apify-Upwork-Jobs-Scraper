# 🚀 Upwork Jobs Scraper

The most efficient way to extract job listings directly from Upwork Jobs search results.

[View on Apify Store](#)

## 📖 Overview

The **Upwork Jobs Scraper** is a powerful data extraction tool designed to aggregate job listings from the Upwork Jobs search engine.

Whether you're building a job board, analyzing labor market trends, or automating lead generation for recruitment, this actor delivers structured, clean data in real-time.

## ✨ Key Features

- **🌍 Multi-Source Aggregation** – Access listings from thousands of job boards via a single Upwork search query.
- **🎯 Laser-Focused Filtering** – Filter by specific companies, exact locations, job types (Remote/Contract), and posting dates.
- **⚡ High Performance** – Optimized for speed and low-compute usage to save costs.
- **📅 Fresh Data** – Scrape "Posted 3 days ago" or "Today" to get the newest opportunities first.
- **🔌 API Ready** – Seamlessly integrates with Python, Node.js, Zapier, and Make.com.

## 🛠 Input Parameters

The actor accepts the following input parameters in JSON format.

| Parameter | Type | Required | Description | Default | Valid Values |
|-----------|------|----------|-------------|---------|--------------|
| `countryName` | String | No | The country context for the Upwork Search domain | "all" | "usa", "uk", "india", etc. |
| `includeKeyword` | String | **Yes** | The main search terms or specific skills | - | Any search string (e.g., "React", "Remote", "Marketing Manager") |
| `locationName` | String | No | Specific city, state, or region | - | Any location string (e.g., "San Francisco, CA") |
| `companyName` | String | No | Filter listings to a specific employer | - | Any company name (e.g., "Upwork", "Microsoft") |
| `jobType` | String | No | Filters by employment type | - | `FULLTIME`, `PARTTIME`, `CONTRACTOR`, `INTERN` |
| `datePosted` | String | No | How recent the jobs should be | "month" | `today`, `3days`, `week`, `month` |
| `pagesToFetch` | Integer | No | Number of pagination pages to scrape | 1 | Positive integers |

### 💻 Example Input Configuration

    {
      "countryName": "usa",
      "locationName": "new york",
      "includeKeyword": "software engineer, python",
      "companyName": "Upwork",
      "jobType": "FULLTIME",
      "datePosted": "week",
      "pagesToFetch": 3
    }

## 📊 Output Data

The results are stored in the default Apify dataset. You can download them in JSON, CSV, Excel, or XML formats.

### Sample JSON Output

    [
      {
        "job_title": "Senior Frontend Developer",
        "company_name": "Tech Corp Inc.",
        "location": "New York, NY (Remote)",
        "posted_via": "LinkedIn",
        "salary": "$120,000 - $150,000 a year",
        "date": "2025-03-25",
        "job_type": "Full-time",
        "URL": "https://www.Upwork.com/search?..."
      }
    ]

### Field Dictionary

- **job_title:** The official designation of the role.
- **company_name:** The organization hiring.
- **location:** Geographical location or "Remote" status.
- **posted_via:** The original platform where Upwork found the job (e.g., Monster, Greenhouse, LinkedIn).
- **salary:** Pay range (if provided by the employer).
- **URL:** Direct link to the job application or listing.


## How to Use

1. **Deploy on Apify** – Run the actor directly from the Apify platform.
2. **Schedule & Automate** – Set up periodic runs to keep your job database updated.
3. **Export Data** – Integrate with your CRM, website, or analytics platform.

## Why Use This Actor?

- **No Coding Required** – Easy-to-use with minimal setup.
- **Saves Time** – Automates job data collection.
- **Customizable** – Supports tailored scraping configurations.

## 👨‍💻 Programmatic Usage

You can run this actor via the Apify API using the official client libraries.

### Python

    from apify_client import ApifyClient

    # Initialize the client with your API token
    client = ApifyClient("YOUR_APIFY_TOKEN")

    # Prepare the Actor input
    run_input = {
        "countryName": "usa",
        "includeKeyword": "Data Scientist",
        "datePosted": "3days",
        "pagesToFetch": 1,
    }

    # Run the Actor and wait for it to finish
    run = client.actor("orgupdate/Upwork-jobs-scraper").call(run_input=run_input)

    # Fetch and print Actor results from the run's dataset (if there are any)
    for item in client.dataset(run["defaultDatasetId"]).iterate_items():
        print(item)

### Node.js

    import { ApifyClient } from 'apify-client';

    const client = new ApifyClient({
        token: 'YOUR_APIFY_TOKEN',
    });

    const input = {
        countryName: 'uk',
        includeKeyword: 'DevOps',
        jobType: 'CONTRACTOR',
    };

    (async () => {
        // Run the Actor and wait for it to finish
        const run = await client.actor('orgupdate/Upwork-jobs-scraper').call(input);

        // Fetch and print Actor results from the run's dataset (if there are any)
        const { items } = await client.dataset(run.defaultDatasetId).listItems();
        items.forEach((item) => {
            console.dir(item);
        });
    })();

## 🔗 Integrations

Don't just scrape data—act on it. You can integrate this actor with:

- **Zapier / Make.com:** Trigger an email or Slack notification whenever a new job matching your criteria is posted.
- **Upwork Sheets:** Automatically save new job listings into a spreadsheet for analysis.
- **Slack/Discord:** Create a bot that alerts your community about new job openings.

## 💡 Use Cases

- **Job Aggregators & Boards:** Populate your niche job board with fresh content daily without manual entry.
- **HR & Recruitment:** Analyze competitor hiring strategies by tracking their open positions.
- **Lead Generation:** Find companies currently hiring for specific roles to pitch your B2B services.
- **Salary Research:** Aggregate salary data across different regions and titles to create market reports.

## 📞 Support & Feedback

If you encounter any issues or have feature requests, please contact us through the Apify Console or check the actor page.

Happy Scraping! 🚀
