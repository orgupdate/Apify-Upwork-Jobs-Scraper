// main.js
const { Actor } = require("apify");
const { default: axios } = require("axios");

// Free-plan Apify users generate no revenue on our pay-per-event pricing but
// still cost us SerpApi + platform usage, so their runs are capped hard.
// Paid users are charged per result, so they get the full search.
const FREE_LIMIT = 10;
const FREE_LIMITS = { maxResults: FREE_LIMIT, maxPages: 1, maxLocations: 1 };
const PAID_LIMITS = { maxResults: null, maxPages: 3, maxLocations: 5 };

// Job data goes stale, but re-hitting SerpApi for every repeat search is what
// runs up the bill. 24h is a reasonable middle ground.
const CACHE_TTL_MS = 24 * 60 * 60 * 1000;

const buildCacheKey = (input, isFreeUser) => {
  // Every field that changes the result set must be in the key, otherwise two
  // different searches collide and serve each other's cached data.
  const parts = [
    input.includeKeyword || input.keyword || "all",
    input.countryName || "anywhere",
    input.locationName || "",
    (input.targetLocations || []).join("|"),
    input.companyName || "",
    input.jobType || "",
    input.datePosted || "all",
    input.pagesToFetch || 1,
  ];
  const base = parts
    .join("-")
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, "_");
  const suffix = isFreeUser ? "_free" : "_paid";
  const truncated = base.slice(0, 256 - suffix.length).replace(/_+$/, "");
  return `${truncated}${suffix}`;
};

Actor.main(async () => {
  const input = (await Actor.getInput()) || {};
  const { userIsPaying } = Actor.getEnv();
  const isFreeUser = !userIsPaying;
  const limits = isFreeUser ? FREE_LIMITS : PAID_LIMITS;

  const cacheKey = buildCacheKey(input, isFreeUser);
  const store = await Actor.openKeyValueStore();
  const cached = await store.getValue(cacheKey);

  let jobs;
  if (cached && cached.cachedAt && Date.now() - cached.cachedAt < CACHE_TTL_MS) {
    jobs = Array.isArray(cached.data) ? cached.data : [];
  } else {
    const res = await axios.post("https://api.orgupdate.com/search-jobs-v1", {
      includeKeyword: input.includeKeyword,
      keyword: input.keyword,
      countryName: input.countryName,
      locationName: input.locationName,
      targetLocations: input.targetLocations,
      companyName: input.companyName,
      jobType: input.jobType,
      datePosted: input.datePosted,
      pagesToFetch: input.pagesToFetch,
      isFreeUser,
      maxResults: limits.maxResults,
      maxPages: limits.maxPages,
      maxLocations: limits.maxLocations,
      source: "upwork",
    });

    jobs = Array.isArray(res.data) ? res.data : [];
    await store.setValue(cacheKey, { data: jobs, cachedAt: Date.now() });
  }

  if (isFreeUser && jobs.length > FREE_LIMIT) {
    jobs = jobs.slice(0, FREE_LIMIT);
  }

  await Actor.pushData(jobs);
  console.log(`✅ Saved ${jobs.length} jobs to dataset`);
});
