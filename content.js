
const blockedKey = "blockedCompanies";

function addIcons() {
  const jobCards = document.querySelectorAll('div.job-card-container, div.job-card-list');
  jobCards.forEach(card => {
    const subtitleContainer = card.querySelector('.artdeco-entity-lockup__subtitle');
    const companySpan = subtitleContainer?.querySelector('span');

    const companyName = companySpan?.innerText?.trim();
    if (!companyName || subtitleContainer.querySelector('.block-icon')) return;

    const icon = document.createElement("span");
    icon.textContent = " 👁️";
    icon.style.cursor = "pointer";
    icon.style.marginLeft = "5px";
    icon.className = "block-icon";

    icon.addEventListener("click", () => {
      console.log("👁️ Clicked for company:", companyName);
      chrome.storage.local.get([blockedKey], (res) => {
        const blocked = res[blockedKey] || [];
        if (!blocked.includes(companyName)) {
          blocked.push(companyName);
          console.log("🚫 Adding to blocklist:", blocked);
          chrome.storage.local.set({ [blockedKey]: blocked }, () => {
            console.log("✅ Blocklist saved.");
            removeBlocked();
          });
        }
      });
    });

    subtitleContainer.appendChild(icon);
  });
}

function removeBlocked() {
  chrome.storage.local.get([blockedKey], (res) => {
    const blocked = res[blockedKey] || [];
    console.log("🧹 Blocked companies:", blocked);
    const jobCards = document.querySelectorAll('div.job-card-container, div.job-card-list');
    jobCards.forEach(card => {
      const subtitleContainer = card.querySelector('.artdeco-entity-lockup__subtitle');
      const companySpan = subtitleContainer?.querySelector('span');
      const companyName = companySpan?.innerText?.trim();
      if (blocked.includes(companyName)) {
        const jobLi = card.closest("li");
        if (jobLi) {
          console.log("❌ Removing job LI for:", companyName);
          jobLi.remove();
        }
      }
    });
  });
}

const observer = new MutationObserver(() => {
  addIcons();
  removeBlocked();
});

observer.observe(document.body, { childList: true, subtree: true });

addIcons();
removeBlocked();
