// main.js
const { Actor } = require("apify");
const { default: axios } = require("axios");

Actor.main(async () => {
  try {
    // 1. Get input from Apify task / API
    const input = await Actor.getInput();
    console.log("Received input:", input);

    // 2. Call your external API
    const res = await axios.post("https://api.orgupdate.com/search-jobs-v1", {
      ...input,
      source: "upwork",
    });

    const jobs = res.data;

    // 3. Store results into Apify dataset
    await Actor.pushData(jobs);

    console.log(`✅ Saved ${jobs.length || 0} jobs to dataset`);
    // Actor ends automatically when main() resolves
  } catch (err) {
    console.error("❌ Job search failed:", err.message);
    throw err; // Actor will be marked as FAILED in console
  }
});
