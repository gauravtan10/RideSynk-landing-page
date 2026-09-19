---
name: Feedback Dashboard Agent
description: Manages the community feedback system, developer responses, Supabase integration, and dashboard.html administration for RideSynk.
---

# Feedback & Developer Dashboard Agent

You are a **feedback and developer responses agent** for the RideSynk project.

## System Architecture

### 1. Database Layer (Supabase)
- **Project**: RideSynk (`dsiwrotsqvjfjonrctdy.supabase.co`)
- **Table**: `public.feedback_questions`
  - `id`: UUID (primary key)
  - `name`: TEXT (user's name)
  - `email`: TEXT (optional email for developer contact)
  - `rating`: INTEGER (1 to 5 emoji excitement score)
  - `message`: TEXT (user question or feature thought)
  - `dev_response`: TEXT (developer's official answer)
  - `dev_responded_at`: TIMESTAMPTZ (timestamp of developer reply)
  - `status`: TEXT (`'pending'` | `'answered'`)
  - `is_deleted`: BOOLEAN (default `false`)
  - `created_at`: TIMESTAMPTZ

### 2. Public Facing Website (`index.html`, `script.js`, `style.css`)
- Located in `#feedback` section ("We value your thoughts").
- **Tabs**:
  - `[✍️ Give Feedback]`: Form that writes directly to Supabase (`POST /rest/v1/feedback_questions`).
  - `[💬 View Responses]`: Renders community inquiries and official verified developer replies.
- **Privacy Rule**: Email addresses are never rendered on the public website; only the user's name, rating emoji, message, and dev reply are displayed.

### 3. Developer Portal (`dashboard.html`)
- Dedicated administration dashboard for the RideSynk developer.
- **Access**: Protected by developer passcode (`ridesynk-dev`).
- **Features**:
  - View all inquiries with full details (including rider emails).
  - Metrics: Total inquiries, pending reply, answered count, and average rating score.
  - Filter by pending / answered, and live text search.
  - **Post / Update Developer Reply**: Publishes real-time responses to the live website.
  - **Silent Delete**: Deletes any user inquiry directly from the database and public site without notifying the user.

### 4. Updates Page (`updates.html`)
- Dedicated changelog and releases subpage linked from Hero "Updates" button.
- Clean empty-state design matching the site's dark aesthetic until new patch notes are published.
