# Profile Showcase

Create the initial homepage for a modern dating/profile discovery website.

For this first version, focus ONLY on the frontend homepage UI. Do not implement authentication, database, messaging, payments, APIs, or other backend functionality yet.

The homepage should closely reproduce the overall structure and visual feel of the reference website I provided, while keeping the implementation clean and editable.

Overall design

Dark navy/near-black theme.

Clean, compact dating/profile-discovery interface.

Desktop-first but fully responsive.

White/light-gray text.

Blue as the primary accent color.

Rounded profile cards.

Modern sans-serif typography.

The page should feel like a real production website, not a prototype.

Header

Create a compact dark header spanning the full width.

Left:

Website logo/name placeholder.

Right:

"LOGIN" button.

"Sign up" button.

Google login button.

Yahoo login button.

Keep the buttons visually compact and aligned horizontally on desktop.

On smaller screens, adapt the header responsively rather than allowing it to overflow.

Members section

Below the header, create the main members/discovery section.

Include:

A heading: "Members"

A member result count underneath or beside the heading.

A "Filters" button.

A responsive profile grid.

On a wide desktop screen, the grid should display approximately six profiles per row.

Each profile card should contain:

A large portrait/profile image.

A small green online indicator.

Username.

Age.

Use realistic placeholder profile photographs rather than empty gray boxes. The images should have varied people and appearances.

Cards should be visually compact and consistent.

Guest viewing behavior

The homepage represents an unauthenticated visitor.

Allow the visitor to see an initial group of profiles normally.

Further profiles should appear visually restricted:

Darkened/blurred profile content.

A centered registration gate over the restricted area.

The gate should look similar in purpose to:

"Want to see more profiles?"

"Sign up for free!"

Include a short explanatory sentence.

Then provide:

A prominent "Sign up" button.

"Or"

A "Log in" link.

The modal/gate should be centered over the profile area and visually stand out without completely hiding the rest of the page.

Footer

Create a dark footer at the bottom of the page.

Include:

Logo/name.

Short website description.

About

Terms & Conditions

Privacy Statement

Cookies

Pricing

Contact

Sponsors

Report

Also include a small minimum-age/legal notice.

Important implementation requirements

Build this as a clean React-based frontend.

Use reusable components where appropriate.

Keep the profile data as local mock data for now.

Do not create backend services yet.

Do not create authentication yet.

Do not create database tables yet.

Do not implement real Google/Yahoo authentication.

Do not implement payments.

Do not implement messaging.

The goal of this first step is simply to produce a convincing, functional frontend recreation of the reference homepage that we can inspect and modify later.

Make the layout responsive and make sure it looks good at desktop and mobile widths.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/818adf69-1ac7-4b36-94ca-aea2a949b776).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
