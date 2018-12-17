export default function () {
    // to comply with the kwarc privacy policy
    // we load the banner script
    const policyScript = document.createElement("script");
    policyScript.setAttribute("src", "https://privacy.kwarc.info/policy.js");
    policyScript.setAttribute("type", "text/javascript");
    document.body.appendChild(policyScript);
}
