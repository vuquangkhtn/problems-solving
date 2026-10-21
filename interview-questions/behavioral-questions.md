# Behavioral Questions

## Question 1: Can you describe a time when you had to explain a complex technical concept to a non-technical stakeholder? How did you ensure they understood?

### Key notes
Situation: Migrating from Webpack to Vite
Task: Explain why the migration matters without overwhelming developers with technical details.
Action:
- Explain the technical issues: old toolchain, slow builds, and lack of support for modern features, carried security findings.
- Simplify the explanation: Webpack was like maintaining an old car with unavailable repair parts, while Vite is like driving a new car with better performance and supported replacements.
- Provide the detail steps for the migration, plus the prompts and commands to automate the migration.
- Clarify the timeline and expectations for the migration, including when teams need to update their projects.
Result: Audiences understood the need for the migration and were able to follow the steps to update their projects.

### Talk track
One example was when we migrated from Webpack to Vite.

My responsibility was to explain why the migration was necessary without overwhelming developers with technical details.

I explained that our old toolchain was becoming outdated, builds were slow, and it lacked support for modern features. It also had security findings that needed to be addressed.

To make this easier to understand, I used an analogy. Maintaining Webpack was like maintaining an old car with spare parts that were no longer available, while Vite was like driving a newer car with better performance and supported replacement parts.

I also provided clear migration steps, along with prompts and commands to automate parts of the process. I clarified the timeline and explained when each team needed to update their projects.

As a result, teams understood why the migration mattered and had clear guidance to complete the migration.

## Question 2: Describe a project where you collaborated with others to achieve a common goal. What role did you play, and how did you contribute to the team's success?

### Key notes
- Project: Improving the Release Hub and technical communications.
- Common goal: Make platform updates easier to find and understand.
- My role: Created Release dashboards to keep track of release information. Use Cursor commands to automate the process of generating announcements and release emails.
- My contributions:
  - Automated the process of generating announcements and release emails, reducing manual effort for the team.
  - Collaborated with the team to gather requirements and ensure the solution met their needs.
  - Provided ongoing support and maintenance for the automated solution.
- Key takeaway: Supported the team in improving processes and reducing manual effort.

### Talk track
I worked on a project to improve the Release Hub and technical communications for our platform. The goal was to make platform updates easier for the team to find and understand.

My role was to create release dashboards to help track release information. I also used Cursor commands to automate the generation of release announcements and emails, which reduced manual work for the team.

During the project, I worked with the team to understand their requirements and make sure the solution met their needs. I also provided ongoing support and maintenance to keep the automation working properly.

Overall, I helped the team improve the release process, reduce repetitive tasks, and make our technical communications more efficient.

## Question 3: Describe your current project and how it aligns with the company's goals. What are the key challenges you are facing, and how are you addressing them?

### Key notes

Project: Core Platform — Shared SDK and runtime behind NAB Platform.

Main purpose: Support microfrontends, allowing miniapps to be reused across multiple shells.

Architecture:

Miniapps: Individual features like payments, accounts, and cards.

Shells: Host apps that contain and display miniapps.

Core Platform: The foundation that connects everything.

Key capabilities: Load miniapps, authentication, communication between features, and integration with NAB systems.

Benefits: Reuse features, reduce duplicated work, and maintain consistency across web and mobile.

My contribution: Build and improve the shared platform that makes this possible.

### Talk track
I am working on Core Platform, which is the Shared SDK and runtime monorepo behind NAB Platform.

The main purpose of Core Platform is to support a microfrontend architecture, allowing miniapps to be embedded into multiple shells. This means teams can build a feature once and reuse it across different host applications, rather than rebuilding the same feature for each app.

Think of it like a shopping centre. Each feature, such as payments, accounts, cards, and authentication, is like a shop. These are called miniapps. Different shells are like different shopping centres that can host these shops.

Core Platform provides the shared foundation that makes this possible. It helps shells load and run miniapps safely, while providing common capabilities such as authentication, communication between features, and integration with NAB systems.

It also helps teams avoid duplicating common functionality and keeps the platform consistent, secure, and maintainable across web and mobile.

In short, Core Platform enables NAB teams to build reusable features that can be delivered across multiple applications, improving development efficiency and consistency.
