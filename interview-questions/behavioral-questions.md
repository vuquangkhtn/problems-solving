# Behavioral Questions

[[toc]]

## Question 1: Describe your current project and how it aligns with the company's goals.

- **Situation:** I work on Core Platform, the shared SDK and runtime behind NAB Platform. It supports miniapps such as payments, accounts, and products, as well as the shells that host them.
- **Task:** Help build and improve shared capabilities so miniapps can be reused across shells.
- **Actions:**
  - Contribute to the microfrontend platform that lets shells embed miniapps.
  - Support shared authentication, communication, and integration with NAB systems.
  - Work within a Domain-Driven Design model, where domain teams own business capabilities.
- **Result:** The platform helps domain teams deliver independently while reusing shared features, reducing duplication, and maintaining consistency across web and mobile.

### Follow-up question: What are the key challenges you are facing, and how are you addressing them?

- **Situation:** Core Platform relies on complex NAB SDK infrastructure and serves miniapps and shells owned by different domain teams.
- **Task:** Build enough technical and stakeholder context to contribute effectively and support teams using the platform.
- **Actions:**
  - Learn the platform's microfrontend and Backend for Frontend (BFF) architecture.
  - Work with domain teams to understand their use cases, constraints, and integration points.
  - Apply that context when contributing to platform improvements and answering team questions.
- **Result:** I can contribute more effectively and provide more relevant support across miniapps and shells.

## Question 2: Tell me about a time you explained a complex technical change to stakeholders.

- **Situation:** The team needed to migrate from Webpack to Vite.
- **Task:** Explain the change clearly to stakeholders and developers without overwhelming them with tooling details.
- **Actions:**
  - Explained the impact in practical terms: slow builds affected delivery speed, the old setup had limited maintenance support, and security findings needed attention.
  - Broke the migration into phases, checked dependency compatibility, and updated the configuration.
  - Validated the result with builds and tests.
  - Shared the timeline, migration steps, prompts, and commands needed by the team.
- **Result:** Reduced bundle size by 20%, improved hot reload and build performance, and gave the team a clear path to complete the migration safely.

## Question 3: Describe a project where you collaborated with others to achieve a common goal.

- **Situation:** Releases included contributions from multiple teams, making features and fixes difficult to identify, validate, and communicate.
- **Task:** Improve contribution tracking and make release communication more reliable.
- **Actions:**
  - Defined contribution requirements: a label, documentation, and a Test Summary Report with test evidence.
  - Used AI-assisted tracking to identify current and upcoming features and fixes for each release.
  - Created dashboards and automated release announcements and email preparation.
  - Gathered team requirements, refined the workflow, and maintained the solution.
- **Result:** Improved visibility into release contributions, increased confidence in release readiness, reduced manual effort, and made communications clearer.

## Question 4: Tell me about a time you disagreed with your team.

- **Situation:** The team discussed removing Lodash and implementing the required utility functions internally.
- **Task:** Help the team choose an approach based on technical and business trade-offs rather than personal preference.
- **Actions:**
  - Compared the benefits and risks of keeping the dependency versus reimplementing the utilities.
  - Considered bundle size, security findings, maintenance effort, correctness, and test coverage.
  - Shared my concerns, listened to the team's reasoning, and worked toward an evidence-based decision.
- **Decision:** Move to `es-toolkit` and implement a utility internally only when `es-toolkit` has no equivalent.
- **Result:**
  - Reduced the dependency surface and avoided maintaining custom copies of utilities that already have a supported implementation.
  - Used the library's published benchmark as supporting evidence: **up to 97% smaller bundle size and 2–3× faster runtime performance than Lodash** ([es-toolkit documentation](https://github.com/toss/es-toolkit/blob/main/docs/intro.md)).
  - Measured the actual project outcome with before/after bundle analysis, dependency/security findings, and targeted benchmarks for utilities such as `get` and `pick`; the published benchmark is a reference point, not a guarantee for every application.

## Question 5: Tell me about a time you influenced other teams during a breaking change.

- **Situation:** A common SDK introduced a breaking change, such as UI decoupling or the Webpack-to-Vite migration, and consumer teams needed to take action.
- **Task:** Help consumer teams understand the impact and migrate safely.
- **Actions:**
  - Identified which consumers and integration points were affected.
  - Explained the reason for the change and the actions required from each team.
  - Provided migration steps, examples, timelines, prompts, and commands.
  - Supported teams during adoption and clarified issues as they appeared.
- **Result:** Consumer teams had clearer ownership of the migration and could adapt to the breaking change with fewer surprises.

## Question 6: How do you prioritize competing tasks?

- **Situation:** Platform work, security findings, hotfixes, and miniapp or shell support can compete for attention.
- **Task:** Prioritize work according to company risk and team impact.
- **Actions:**
  - Prioritize security findings because NAB operates in a banking environment.
  - When tasks have similar priority, handle the task that is not blocking other teams first.
  - Prioritize a hotfix release over non-blocking support work when the hotfix protects users or unblocks delivery.
  - Communicate the trade-offs and revised expectations to stakeholders.
- **Result:** Critical security risks and delivery blockers are handled first while lower-priority work remains visible and managed.

## Question 7: Tell me about a mistake, failure, or unexpected problem during a project.

- **Situation:** A compatibility issue occurred while upgrading from Webpack 4 to Webpack 5. The second miniapp could not load because its package/runtime identifier was same with first miniapp or shell.
- **Task:** Restore stability and complete the Webpack upgrade without disrupting the other miniapps and shells.
- **Actions:**
  - Reproduced the failure with two or more miniapps or shells and compared it with a successful single-app scenario.
  - Investigated the failure sequence: the first app loaded, but the second app failed when its Webpack runtime was initialized. when replacing the second app with a different miniapp, the both apps loaded successfully.
  - Checked the Webpack 5 changes and identified the actual cause: multiple builds had the same `package.json.name`, and no unique Webpack runtime name was configured.
  - Fixed the collision by assigning each miniapp and shell a unique package/runtime identity, including [`output.uniqueName`](https://webpack.js.org/configuration/output/#outputuniquename) where required.
  - Added a multi-app smoke test and configuration review to catch duplicate runtime names before release.
- **Result:**
  - The issue was resolved, the miniapps loaded successfully together, and the Webpack 5 migration was completed safely.
  - **Lesson:** A migration can contain several breaking changes, so known changes should be separated from the observed root cause. For multi-build applications, test the real composition — not only each miniapp in isolation - and check breaking change changelog carefully instead of assuming the official documentation is complete.

## Question 8: Tell me about a time your communication did not go as planned.

- **Situation:** During a presentation, I could not explain my idea clearly to my colleagues.
- **Task:** Communicate a technical idea confidently and make sure the audience understood it.
- **Actions:**
  - Recognized that I had not prepared and practiced enough.
  - Reflected on where the explanation became unclear.
  - Improved my preparation by structuring the main message, anticipating questions, and practicing before future presentations.
- **Result:** I became more deliberate and confident when presenting technical ideas, and I learned to treat preparation as part of the communication work.

## Question 9: Tell me about a time you took ownership of a complex technical problem.

- **Situation:** The ecosystem used two different UI libraries, so the SDK duplicated the same logic to support both.
- **Task:** Remove the duplication while allowing the SDK to work with both UI libraries.
- **Actions:**
  - Identified the duplicated logic and the dependency coupling inside the common SDK.
  - Decoupled UI-library-specific dependencies into their own repositories.
  - Used HOCs and a Context Provider to share common SDK state with both UI libraries.
  - Coordinated the design so each UI library could adapt the shared behavior independently.
- **Result:** Reduced duplicated code, improved separation of concerns, and made the SDK easier to maintain and extend.

## Question 10: Tell me about a time you worked with ambiguity.

- **Situation:** The NAB SDK infrastructure was large, complex, and unfamiliar, while Core Platform served miniapps and shells owned by different domain teams.
- **Task:** Build enough understanding to contribute effectively without having complete context at the beginning.
- **Actions:**
  - Studied the microfrontend and Backend for Frontend architecture.
  - Reviewed existing implementations and mapped the relationships between shells, miniapps, SDK packages, and backend services.
  - Asked targeted questions and worked directly with domain teams.
  - Applied the knowledge while contributing to platform improvements.
- **Result:** I became more effective at contributing to Core Platform and providing relevant support to miniapps and shells.

## Question 11: Tell me about a time you improved an inefficient process.

- **Situation:** It was difficult to forecast upcoming features and prepare communication for released features and fixes.
- **Task:** Improve release visibility and reduce manual communication work.
- **Actions:**
  - Used AI-assisted tracking to identify upcoming and recently released features and fixes.
  - Created dashboards to make release information easier to review.
  - Automated release announcements and email preparation.
  - Validated the generated information before sharing it with stakeholders.
- **Result:** Release preparation became more predictable, required less manual effort, and produced clearer communication.
