# LinkedIn Company Filter Extension

This Chrome extension allows you to filter out job postings from specific companies on LinkedIn. Once a company is blocked, all future job listings from that company will be automatically removed. You can manage your blocklist through a simple popup interface.

---

## Features

- Adds a block button next to each job post
- Click to instantly hide all jobs from that company
- View and manage your blocklist in a popup
- Import/export your blocklist as JSON
- Clear all blocked companies with one click

---

## Installation Instructions

1. Download the ZIP file of the extension
2. Open Chrome and go to `chrome://extensions/`
3. Enable Developer Mode (top right corner)
4. Drag and drop the ZIP file into the page  
   or click "Load unpacked" and select the unzipped folder

---

## How to Use

### Blocking Companies

- Visit [linkedin.com/jobs](https://linkedin.com/jobs)
- You will see a block icon next to each job post's company name
- Click the icon to block all jobs from that company

### Managing the Blocklist

- Click the extension icon in your Chrome toolbar
- You’ll see the Hiding List:
  - Remove individual companies
  - Click "Clear All" to unblock everything
  - Click "Export" to download your list as JSON
  - Click "Import" to restore a previously saved list

---

## Data Storage

- Blocked companies are stored locally using `chrome.storage.local`
- Your list is saved persistently until you clear it manually
- Data does not sync across devices

---

## Troubleshooting

- If the extension doesn’t appear to work:
  - Refresh the LinkedIn Jobs page
  - Make sure the extension is enabled in `chrome://extensions`
  - Reinstall if needed

---

## License

This project is free to use and modify. No attribution required.
