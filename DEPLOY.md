# Deploy to GCP Cloud Run

## 1. One-time setup (do this before hackathon day)

```powershell
# Login
gcloud auth login

# Create project (change date to today)
gcloud projects create hackathon-agent-20260618 --name="Hackathon Agent"

# Set it as default
gcloud config set project hackathon-agent-20260618

# Enable required APIs
gcloud services enable run.googleapis.com cloudbuild.googleapis.com containerregistry.googleapis.com

# Set billing account (required for Cloud Run)
# Go to: https://console.cloud.google.com/billing and link the project
```

## 2. Set environment variables in Cloud Run

After first deploy, set these via Cloud Console > Cloud Run > hackathon-agent-app > Edit & Deploy > Variables:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
ANTHROPIC_API_KEY=sk-ant-...
NEXT_PUBLIC_APP_URL=https://hackathon-agent-app-xxxx-ew.a.run.app
NEXT_PUBLIC_FEATURE_CHAT=true
NEXT_PUBLIC_FEATURE_MULTI_AGENT=true
NEXT_PUBLIC_FEATURE_DASHBOARD=true
NEXT_PUBLIC_FEATURE_QR_SHARE=true
```

## 3. Deploy

```powershell
cd C:\Projects\hackathon-agent-app
gcloud builds submit --config cloudbuild.yaml
```

## 4. After deploy

- Copy the Cloud Run URL (shown in output)
- Update `NEXT_PUBLIC_APP_URL` to that URL
- Redeploy: `gcloud builds submit --config cloudbuild.yaml`
- Open the app, click 📱 button → QR code appears pointing to your live URL

## 5. Toggle features

Set any `NEXT_PUBLIC_FEATURE_*` to `false` in Cloud Run env vars to hide that section.
Redeploy to take effect (or use a secrets manager for instant toggle).

---

## Hackathon Day Prompt

Copy this into Claude Code on the day, replacing [TOPIC]:

```
The hackathon topic is: [TOPIC].

Using the existing skeleton in C:\Projects\hackathon-agent-app, adapt it for this topic:
1. Update the home page hero text in src/app/page.tsx for [TOPIC]
2. Replace placeholder chart data in src/components/DashboardCharts.tsx with realistic [TOPIC] metrics
3. Update the orchestrator agent system prompt in src/app/api/multi-agent/route.ts to be a [TOPIC] expert
4. Rename and update the 3 SUB_AGENTS in the same file with [TOPIC]-specific specialists
5. Add one Supabase migration in supabase/migrations/002_topic.sql for any [TOPIC]-specific data if needed
6. Update page titles and descriptions throughout
Keep feature flags, QR share, and the overall structure intact.
Then run: npm run build to verify it compiles.
```
