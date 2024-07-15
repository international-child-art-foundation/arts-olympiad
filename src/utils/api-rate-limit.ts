import Bottleneck from "bottleneck";

// This limiter is mostly just to make sure we don't ddos ourselves.
// Limits are permissive.
export const limiter = new Bottleneck({
  reservoir: 10, // initial value
  reservoirRefreshAmount: 10,
  reservoirRefreshInterval: 30 * 1000, // must be divisible by 250
 
  // also use maxConcurrent and/or minTime for safety
  maxConcurrent: 5,
  minTime: 100
});

// Listen to the "failed" event
limiter.on("failed", async (error, jobInfo) => {
  const id = jobInfo.options.id;
  console.warn(`Job ${id} failed: ${error}`);
 
  if (jobInfo.retryCount === 0) { // Here we only retry once
    console.log(`Retrying job ${id} in 2 seconds!`);
    return 1000;
  }
});

limiter.on("error", function (error) {
  console.log("Error fired");
  console.log(error);
});


export const expensiveActionLimiter = new Bottleneck({
  reservoir: 3,
  reservoirRefreshAmount: 3, 
  reservoirRefreshInterval: 60 * 1000,

  maxConcurrent: 5,
  minTime: 100
});

// Listen to the "failed" event
expensiveActionLimiter.on("failed", async (error, jobInfo) => {
  const id = jobInfo.options.id;
  console.warn(`Job ${id} failed: ${error}`);
 
  if (jobInfo.retryCount === 0) { // Here we only retry once
    console.log(`Retrying job ${id} in 2 seconds!`);
    return 1000;
  }
});

expensiveActionLimiter.on("error", function (error) {
  console.log("Error fired");
  console.log(error);
});
