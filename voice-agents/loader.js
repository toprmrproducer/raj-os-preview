const agents = {
  "1": "emb_z9iBPg_Sor8bdYgUyhg3e9pWCvumQjPIXfAKvqE8URo",
  "2": "emb_R6kUxYEnE_sZanJz1RnJagAx-yuBrm2WQMJoaYowOek",
  "3": "emb_ngM6eKN3yO3-F2_ikJKqc4SecVVVrbGAUvTe0UAewLU",
  "4": "emb_4mtol5uax6wPNtSyGwPcz7ZqPS4M6L1I_OOHHaTyC9g",
};

const params = new URLSearchParams(window.location.search);
const selected = agents[params.get("agent")] || agents["1"];
const script = document.createElement("script");
script.id = "dograh-widget";
script.src = `https://app.auto4you.in/embed/dograh-widget.js?token=${encodeURIComponent(selected)}&environment=production&apiEndpoint=${encodeURIComponent("https://api.auto4you.in")}`;
script.async = true;
script.addEventListener("load", () => {
  document.querySelector("#status").textContent = "Agent loaded. Use the voice control to begin.";
});
script.addEventListener("error", () => {
  document.querySelector("#status").textContent = "Dograh Cloud is under maintenance. Please retry shortly.";
});
document.head.append(script);
