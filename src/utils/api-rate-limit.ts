import Bottleneck from "bottleneck";

// This limiter is mostly just to make sure we don't ddos ourselves.
// Limits are permissive.
export const limiter = new Bottleneck({
  reservoir: 40, // initial value
  reservoirRefreshAmount: 15,
  reservoirRefreshInterval: 30 * 1000, // must be divisible by 250
 
  // also use maxConcurrent and/or minTime for safety
  maxConcurrent: 5,
  minTime: 100
});


// limiter.on("error", function (error) {
//   console.log(error);
// });

// limiter.on("failed", function (error, jobInfo) {
//   console.log(error, jobInfo);
// });

