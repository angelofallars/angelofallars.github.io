---
layout: "../../layouts/BlogPost.astro"
title: "BLUF your way into better communication"
pubDate: "May 18, 2026"
---

**Always state the conclusion first.** Afterwards, back up your conclusion with supporting details and evidence. This communication technique is called *Bottom Line Up Front*, or BLUF. It's a military practice that can also be beneficial for software engineers.

BLUF is how you explain to other teams that a big launch will slip if the teams deprioritize reducing tech debt in critical microservices.
It's also how you explain to your manager why downtime increased this month.

If you're doing deep technical work but stakeholders still seem concerned even after you communicate progress, risks, and timelines, then read along.

## Example

The Director of Engineering asks why platform uptime went below 99.9% this month.

Most people would answer with the bottom line, well, at the bottom. It feels natural and safe to build up reasoning towards a conclusion. But people don't need to ingest all the context. They just need the information necessary to make a decision.

Here's how someone would typically answer that question:

> "First, I looked at the monitoring dashboards and logs to figure out what was happening. I noticed some patterns, so I talked to the Reliability team to see what's going on.
>
> Two weeks ago, our platform went viral on social media and thousands of users signed up. The Capybara microservice's database in particular suffered from load-related faults we hadn't encountered before. One on-call engineer was able to resolve an incident causing total downtime for Capybara, but the incident resolution steps were never written down or shared with the team.
>
> So uptime went below 99.9% this month because recent load spikes caused incidents that only a few on-call engineers knew how to resolve. We don't have playbooks and runbooks for resolving those kinds of incidents."

If you answer this way, the director may get lost in the context and not even absorb the main point at the end.

Meanwhile, here's an example with BLUF:

> "Uptime went below 99.9% this month because recent load spikes caused incidents that only a few on-call engineers knew how to resolve. I recommend prioritizing runbooks for the top recent incidents this sprint so on-call engineers can resolve similar issues swiftly without relying on tribal knowledge."

Next, the director will probably ask why incident resolution time is high. Good! Now you can explain that load spiked over the past two weeks, the team encountered new failure modes, and the resolution steps were not documented in playbooks or runbooks.

The difference with BLUF is that it helps everyone understand your main point, even as you add more context.

## Actionable Advice

The next time you find yourself having to explain something, you probably already have the reasoning and conclusion in mind. Instead of explaining with the reasoning and context and ending with the main point, cut to the chase and start with the punchline. Add context as necessary afterwards to support your point.

When you start using BLUF, I suggest starting with this simple format:

- **What:** The main point, conclusion, or risk.
- **Why:** The impact, reasoning, and evidence behind your conclusion.
- **Next steps:** The decision or action that follows.

A security-related example:

  > "**[What]** The Next.js service is vulnerable **[Why]** because the deployed version is affected by a recently disclosed CVE. **[Next steps]** We should upgrade to a patched version now, redeploy the service, and review logs for suspicious activity while the vulnerable version was deployed."

By the way, I used the same Bottom Line Up Front technique to write this article. Try out BLUF to
see how it improves your communication with stakeholders!
