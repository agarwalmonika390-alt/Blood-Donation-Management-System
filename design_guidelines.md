# Blood Donation Management System - Design Guidelines

## Design Approach
**Selected Framework:** Material Design-inspired approach with healthcare sensibilities
**Rationale:** This is a utility-focused, information-dense management system requiring clarity, efficiency, and trust-building visual cues appropriate for healthcare contexts.

## Layout System

**Container Strategy:**
- Maximum width: 1280px centered container with 24px horizontal padding
- Single-column layout for optimal data visibility and form completion
- Card-based sections with elevated surfaces for visual separation
- Tailwind spacing primitives: 2, 4, 6, 8, 12, 16, 20 for consistent rhythm

**Primary Sections:**
1. Header/Title Area (py-8): Application title, subtitle "Save Lives Through Your Generosity", and statistics dashboard
2. Registration Card (mb-8): Donor registration form in elevated card container
3. Search/Filter Bar (mb-6): Blood group filter and search controls
4. Data Table Card: Comprehensive donor listing with actions

## Typography Hierarchy

**Font Stack:** 
- Primary: Inter (Google Fonts) for clean, professional readability
- Fallback: system-ui, -apple-system

**Type Scale:**
- H1 (Application Title): text-4xl, font-bold, tracking-tight
- H2 (Section Headers): text-2xl, font-semibold
- Body/Table Text: text-base, font-normal, leading-relaxed
- Labels: text-sm, font-medium, uppercase tracking-wide
- Helper Text: text-sm, text-muted

## Component Library

**Statistics Dashboard (Header Area):**
- Grid of 4 metric cards displaying: Total Donors, A+ Count, B+ Count, O+ Count
- Each card: rounded-lg, p-6, with large number (text-3xl font-bold) and label below
- Icon integration: Use Heroicons for blood drop, users, and medical symbols

**Registration Form Card:**
- Elevated card: rounded-xl, shadow-lg, p-8
- Input Fields: Full-width with consistent spacing (space-y-6)
  - Text inputs: rounded-lg borders, py-3 px-4, focus ring treatment
  - Select dropdown: Custom styled with chevron icon, matching text inputs
  - All inputs with floating or top-aligned labels
- Submit Button: Full-width on mobile (sm:w-auto on desktop), rounded-lg, py-3 px-8, font-semibold

**Search/Filter Section:**
- Horizontal flex layout: Search input (flex-1) + Blood group filter dropdown (w-48)
- Gap between elements: gap-4
- Inputs match form styling for consistency

**Data Table:**
- Elevated card container: rounded-xl, shadow-lg, overflow-hidden
- Table structure:
  - Header row: Sticky positioning, elevated background, font-semibold, uppercase, text-xs, tracking-wider
  - Data rows: Hover state with subtle background shift
  - Cells: py-4 px-6 spacing, align-middle
  - Zebra striping for improved readability
- Action Buttons Column:
  - Edit button: Icon button with rounded-md, mr-2
  - Delete button: Icon button with rounded-md
  - Both use icon-only design (Heroicons: pencil, trash)

**Alert/Toast Messages:**
- Fixed position: top-4 right-4
- Slide-in animation from right
- Rounded-lg, p-4, shadow-xl
- Icon + message layout with auto-dismiss (3 seconds)
- Success/Error variants with appropriate iconography

## Interaction Patterns

**Form Submission:**
- Disable button during processing with loading spinner
- Clear form fields on successful submission
- Smooth scroll to table after new donor added
- Inline validation feedback for phone number format

**Table Interactions:**
- Hover states on rows for improved scannability
- Delete confirmation: Modal dialog with backdrop blur
  - Dialog: max-w-md, rounded-2xl, p-6, centered
  - Two-button layout: Cancel (ghost style) + Confirm Delete (primary destructive)
  
**Edit Mode:**
- Inline editing: Row transforms into form inputs on edit click
- Save/Cancel buttons replace Edit/Delete actions
- Smooth transition without page reload

**Search/Filter:**
- Real-time filtering as user types or selects blood group
- "No results" state: Centered message with icon when filter yields no matches
- Clear filter button appears when active filter applied

## Spacing & Visual Rhythm

**Card Spacing:**
- Section gaps: space-y-8 for major sections
- Card internal padding: p-8 (desktop), p-6 (mobile)
- Form element spacing: space-y-6 for consistent vertical rhythm

**Table Spacing:**
- Row height: py-4 for comfortable touch targets
- Cell padding: px-6 for breathing room
- Border treatment: Subtle dividers between rows (not heavy lines)

## Responsive Behavior

**Breakpoint Strategy:**
- Mobile-first: Stack all elements vertically
- md (768px): Statistics grid 2x2, form remains stacked
- lg (1024px): Statistics grid 1x4, search/filter side-by-side, table shows all columns

**Mobile Table Optimization:**
- Card-based layout replacing table on mobile (<768px)
- Each donor as individual card: rounded-lg, p-4, mb-4
- Stacked information with clear labels
- Action buttons full-width at bottom of card

## Accessibility Standards

**Form Accessibility:**
- All inputs with associated labels (for/id pairing)
- Required field indicators (aria-required)
- Error messages with aria-live regions
- Keyboard navigation: Tab order follows logical flow

**Table Accessibility:**
- Proper table semantics: thead, tbody, th scope attributes
- Row selection with keyboard (Enter to edit, Delete for remove)
- Skip to content link for keyboard users
- Screen reader announcements for dynamic content changes

**Color Contrast:**
- Minimum WCAG AA compliance for all text
- Form inputs with sufficient contrast ratios
- Focus indicators clearly visible in all contexts

## Iconography

**Icon Library:** Heroicons (via CDN)
**Usage Points:**
- Statistics cards: blood-drop, user-group, chart-bar icons
- Form inputs: Prefix icons for visual anchoring (user, phone, identification)
- Action buttons: pencil-square, trash, check, x-mark
- Alert toasts: check-circle (success), exclamation-triangle (error)
- Empty states: inbox icon for "no donors found"

**Icon Sizing:**
- Default: w-5 h-5 for inline elements
- Large: w-8 h-8 for statistics and empty states
- Small: w-4 h-4 for input prefixes

## No Hero Image
This is a functional management application, not a marketing site. The interface opens directly to the working dashboard with immediate access to registration and donor data.