# Login and signup popups

## Scope
- Preserve the existing profile grid, mock members, colors, page layout, guest gate, and footer.
- Add frontend-only login and signup popups with no account, recovery, social sign-in, or data services.

## Implementation
- Add a reusable popup shell with a darkened backdrop, centered branding, close control, accessible dialog labels, and responsive scrolling.
- Build signup and login forms from shared styled fields and actions, matching the current Vela design.
- Connect the header, guest-gate, and in-popup links so only one popup is active at a time.
- Support closing with the X, backdrop click, and Escape; prevent placeholder form submissions.
- Keep mobile fields stackable while preserving usable birth-date controls.

## Validation
- Check desktop and mobile layouts in the live preview.
- Verify every open, switch, close, and submit-prevention interaction.
