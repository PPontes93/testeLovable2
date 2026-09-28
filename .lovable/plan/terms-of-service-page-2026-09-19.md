&nbsp;

# Terms of Service page

## Scope

- Add a dedicated `/terms` page using the supplied 16-section Terms outline as the sole legal source.
- Preserve the exact `Last Updated: 7/9/2026` text and add the requested final membership acknowledgement.
- Keep unsupported contact details and legal provisions out; where the supplied source only identifies a topic, present it faithfully without inventing company-specific facts.

## Shared website design

- Extract the existing homepage header, brand, and footer into reusable site components without changing their appearance or authentication behavior.
- Reuse those exact components on the homepage and Terms page.
- Make the logo navigate to the homepage and change only the footer’s “Terms & Conditions” destination to `/terms`; leave other existing footer links unchanged because their routes do not exist.

## Terms presentation

- Use the existing dark colors, Manrope typography, button styling, spacing, borders, and responsive behavior.
- Present a readable centered legal document with numbered sections, paragraphs, and bullet lists.
- Include inline navigation only to routes that actually exist, including the homepage.
- Add route-specific title, description, Open Graph, and Twitter metadata.

## Verification

- Check `/terms` and `/` in the live preview.
- Confirm all 16 numbered sections, the exact updated date, acknowledgement, footer navigation, mobile readability, and no horizontal overflow.
- Confirm existing homepage and authentication controls still behave as before.