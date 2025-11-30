# Admin Dashboard

## Access

**URL:** https://shellmastery.com/admin/

**API Key:** `shellmastery_admin_2025_secure_key`

## Features

### Login Screen
- Minimalist terminal-themed interface
- Single password input field with blinking cursor aesthetic
- Placeholder: `_`
- Press Enter to authenticate
- Session-based auth (cleared when browser closes)
- Error message on failed login: "access denied"

### Dashboard (Post-Login)

#### Stats Section
Displays 4 key metrics:
- **Total Enrollments** - Number of students enrolled
- **Total Revenue** - Sum of all enrollment payments
- **Upcoming Meetings** - Count of future meetings
- **Active Courses** - Number of active courses

#### Upcoming Meetings Section
Table showing meetings in the next 30 days:
- Course name
- Start date/time
- Current enrollment count
- Capacity indicator with color coding:
  - Green: < 50% full
  - Yellow: 50-74% full
  - Orange: 75-99% full
  - Red: 100% full

#### Recent Enrollments Section
Table showing recent enrollments (up to 100):
- Student name
- Email address
- Course name
- Access code (highlighted in cyan)
- Enrollment date
- **Resend Email** button for each enrollment

### Security Features
- API key required in `X-API-Key` header
- Session storage (cleared on browser close)
- Hidden from site navigation (`_build: list: never`)
- No sensitive data in HTML source
- All data fetched after authentication

## API Endpoints Used

All endpoints require `X-API-Key` header:

```bash
# Get statistics
GET https://api.shitchell.com/v1/admin/stats

# Get upcoming meetings (next 30 days)
GET https://api.shitchell.com/v1/admin/meetings/upcoming

# Get recent enrollments (limit 100)
GET https://api.shitchell.com/v1/admin/enrollments

# Resend welcome email
POST https://api.shitchell.com/v1/admin/enrollments/{id}/resend-welcome
```

## Styling

Matches the terminal/hacker theme:
- Black background (#000)
- Green text (#00ff00)
- Cyan headers (#00ffff)
- Source Code Pro monospace font
- Terminal window borders (1px solid #00ff00)
- Hover effects on interactive elements

## Testing

1. Visit https://shellmastery.com/admin/
2. Verify login screen shows (no dashboard visible)
3. Enter API key: `shellmastery_admin_2025_secure_key`
4. Press Enter
5. Verify dashboard loads with:
   - Stats: 5 active courses, 1 enrollment, $0 revenue, 1 upcoming meeting
   - 1 meeting for "Bash Test" course on Dec 21, 2025
   - 1 enrollment for Shaun M (shauni3dud3@gmail.com)
6. Click "resend email" button
7. Verify it changes to "sent!" then back to "resend email"
8. Click "logout" button
9. Verify it returns to login screen

## Files

- Content: `/home/guy/code/git/github.com/shellmastery/website/content/admin/_index.md`
- Layout: `/home/guy/code/git/github.com/shellmastery/website/layouts/admin/list.html`
- Styles: Inline CSS in layout file (matches `/static/css/termhacker.css`)

## Deployment

Both website and API auto-deploy via GitHub Actions:

```bash
# Website changes
cd /home/guy/code/git/github.com/shellmastery/website
git add -A && git commit -m "message" && git push

# API changes
cd /home/guy/code/git/github.com/shitchell/api
git add -A && git commit -m "message" && git push
```

Monitor deployment:
```bash
gh run list --limit 1
```

## Notes

- The page is intentionally hidden from listings
- No link from main navigation (access via direct URL only)
- API key is stored in production config: `/var/www/api.shitchell.com/app/config.toml`
- Session storage means users must re-authenticate after closing browser
- Resend email function calls the same welcome email service used during enrollment
