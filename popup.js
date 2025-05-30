
document.addEventListener("DOMContentLoaded", () => {
  const listEl = document.getElementById("companyList");
  const clearBtn = document.getElementById("clearAll");
  const exportBtn = document.getElementById("exportBtn");
  const importBtn = document.getElementById("importBtn");
  const fileInput = document.getElementById("fileInput");

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

  exportBtn.addEventListener("click", () => {
    chrome.storage.local.get("blockedCompanies", res => {
      const blob = new Blob([JSON.stringify(res.blockedCompanies || [])], {
        type: "application/json"
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "blocked_companies.json";
      a.click();
      URL.revokeObjectURL(url);
    });
  });

  importBtn.addEventListener("click", () => {
    fileInput.click();
  });

  fileInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const list = JSON.parse(reader.result);
        if (Array.isArray(list)) {
          chrome.storage.local.set({ blockedCompanies: list }, () => {
            location.reload();
          });
        } else {
          alert("Invalid file format.");
        }
      } catch (err) {
        alert("Failed to read file.");
      }
    };
    reader.readAsText(file);
  });
});
