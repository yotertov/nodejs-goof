import os
import json
import requests

GITHUB_TOKEN = os.getenv("GITHUB_TOKEN")

class Issue():
    def __init__(self, github_token) -> None:
        self.github_token = github_token
        self.scan_data = self._get_scan_data("snyk.json")
        self.base_url = "https://api.github.com"
        self.owner = "Torsten1014"
        self.repo = "nodejs-goof"
        
    def _get_scan_data(self, path: str) -> object:
        with open(path, "r") as data:
            scan_data = json.load(data)
        return scan_data
    
    def upload_issue(self) -> None:
        request_url =f"{self.base_url}/repos/{self.owner}/{self.repo}/issues"
        body = self._format_issue_body()
        headers = self._format_headers()
        response = requests.post(request_url, headers=headers, data=body)
        if not response.ok:
            print(f"Could not create issue. Status code: {response.status_code}, Reason: {response.text}")

    def _format_headers(self) -> object:
        headers = {
            "Accept": "application/vnd.github+json",
            "Authorization": f"Bearer {self.github_token}"
        }
        return headers

    def _format_issue_body(self) -> object:
        vulnerabilities = self.scan_data.get("vulnerabilities")
        if not vulnerabilities:
            return {
                "title": "No Security Issues Found",
                "body": "No action required"
            }
        body = ""
        for vuln in vulnerabilities:
            id = vuln.get("id")
            title = vuln.get("title")
            package_name = vuln.get("packageName")
            version = vuln.get("version")
            body.append(f"{title}\nid: {id}\npackage: {package_name}@{version}\n\n")
        issue_body = {
            "title": f"{len(vulnerabilities)} Critical Vulnerabilities Found",
            "body": body
        }
        return issue_body   

if __name__ == "__main__":
    issue = Issue(GITHUB_TOKEN)
    issue.upload_issue()
    