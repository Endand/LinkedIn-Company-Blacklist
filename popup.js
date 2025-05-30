
document.addEventListener("DOMContentLoaded", () => {
  const listEl = document.getElementById("companyList");
  const clearBtn = document.getElementById("clearAll");

  chrome.storage.local.get("blockedCompanies", res => {
    const companies = res.blockedCompanies || [];
    console.log("Blocked companies:", companies);

    companies.forEach(company => {
      const li = document.createElement("li");

      const nameSpan = document.createElement("span");
      nameSpan.textContent = company;
      nameSpan.className = "company-name";

      const btn = document.createElement("button");
      btn.innerHTML = "&times;";
      btn.className = "remove";
      btn.onclick = () => {
        const updated = companies.filter(c => c !== company);
        chrome.storage.local.set({ blockedCompanies: updated }, () => {
          location.reload();
        });
      };

      li.appendChild(nameSpan);
      li.appendChild(btn);
      listEl.appendChild(li);
    });
  });

  clearBtn.addEventListener("click", () => {
    chrome.storage.local.set({ blockedCompanies: [] }, () => {
      location.reload();
    });
  });
});
