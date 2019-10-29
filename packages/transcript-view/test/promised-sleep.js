export default function promisedSleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
