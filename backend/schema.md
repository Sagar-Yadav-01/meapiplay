# MongoDB Schema Documentation

The application uses a single collection `profiles` to store the user's data.

## Collection: `profiles`

| Field | Type | Description |
|-------|------|-------------|
| `name` | String | **Required**. Full name of the user. |
| `email` | String | **Required**. Contact email. |
| `education` | String | Degree and University details. |
| `skills` | [String] | Array of skill names (e.g., "React", "Node.js"). |
| `projects` | [Object] | Array of project objects. |
| `projects.title` | String | Project details. |
| `projects.description`| String | Brief description. |
| `projects.links` | [String] | List of relevant URLs (GitHub, Demo). |
| `work` | [Object] | Array of work experience. |
| `work.company` | String | Company name. |
| `work.position` | String | Job title. |
| `work.startDate` | String | Start date (YYYY-MM). |
| `work.endDate` | String | End date or "Present". |
| `work.description` | String | Details of responsibilities. |
| `links` | Object | Social links. |
| `links.github` | String | GitHub Profile URL. |
| `links.linkedin` | String | LinkedIn Profile URL. |
| `links.portfolio` | String | Personal Site URL. |
