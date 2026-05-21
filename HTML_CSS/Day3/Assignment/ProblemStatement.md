# Problem Statement: Travel Agency Website
 
## Project Overview
Create a complete travel agency website using **HTML and CSS only** (no JavaScript). The website should consist of 3 interconnected pages showcasing various HTML elements and CSS styling techniques.
 
## Pages Required
 
### Page 1: Home Page (index.html)
**Objective:** Create an attractive landing page for the travel agency.
 
**Required HTML Elements:**
- Navigation bar with links to all 3 pages
- Hero section with heading and tagline
- Unordered list of featured destinations (minimum 4 items)
- Ordered list of "Top 5 Reasons to Travel with Us"
- At least 3 semantic HTML5 elements (header, nav, section, article, aside, footer)
- Images with proper alt text
- A table displaying "Popular Packages" with columns:
  - Destination
  - Duration (days)
  - Price
  - Package Type
  - (Minimum 5 rows of data)
- Footer with contact information and social media links
 
### Page 2: Booking Form (booking.html)
**Objective:** Create a comprehensive booking form for travel packages.
 
**Required HTML Elements:**
- Navigation bar (consistent with home page)
- Form with the following input types:
  - Text input (Name, Address)
  - Email input
  - Tel input (Phone Number)
  - Number input (Number of Travelers)
  - Date input (Travel Date)
  - Select dropdown (Destination)
  - Radio buttons (Travel Class: Economy, Business, First Class)
  - Checkboxes (Additional Services: Travel Insurance, Airport Pickup, Guided Tours)
  - Textarea (Special Requests)
  - Submit and Reset buttons
- All form fields should have proper labels
- Use fieldset and legend for grouping related form elements
- Include placeholder text where appropriate
- Footer (consistent with home page)
 
### Page 3: Gallery Page (gallery.html)
**Objective:** Showcase travel destination images and testimonials.
 
**Required HTML Elements:**
- Navigation bar (consistent across all pages)
- Definition list (dl, dt, dd) explaining different types of travel packages
- Grid of images (minimum 6 images) displaying destinations
- Blockquote elements with customer testimonials (minimum 3)
- Table showing "Office Locations" with columns:
  - City
  - Address
  - Phone
  - Email
  - (Minimum 4 rows)
- Footer (consistent with home page)
 
## CSS Requirements
 
### 1. CSS Selectors to Use:
You must demonstrate the use of the following selector types:
 
**Basic Selectors:**
- Element/Type selector (e.g., p, h1, table)
- Class selector (e.g., .highlight, .card)
- ID selector (e.g., #header, #booking-form)
- Universal selector (*)
 
**Combinators:**
- Descendant selector (e.g., nav a)
- Child selector (e.g., ul > li)
- Adjacent sibling selector (e.g., h2 + p)
- General sibling selector (e.g., h2 ~ p)
 
**Attribute Selectors:**
- [type="text"]
- [type="email"]
- Any other attribute selector
 
**Pseudo-classes:**
- :hover (for links and buttons)
- :focus (for form inputs)
- :first-child or :last-child
- :nth-child() or :nth-of-type()
 
**Pseudo-elements:**
- ::before or ::after
- ::first-letter or ::first-line
 
### 2. CSS Styling Requirements:
 
**Layout:**
- Use CSS Flexbox or CSS Grid for at least one section
- Proper spacing using margin and padding
- Box model properties (border, padding, margin)
 
**Typography:**
- Different font families (use web-safe fonts or Google Fonts)
- Font sizes, weights, and styles
- Text alignment, decoration, and transformation
- Line height and letter spacing
 
**Colors & Backgrounds:**
- Background colors and background images
- Color schemes (use a consistent color palette)
- Gradients (linear or radial) in at least one section
- RGBA or HSLA colors for transparency
 
**Tables:**
- Border-collapse property
- Styled table headers
- Alternating row colors using :nth-child(even) or :nth-child(odd)
- Hover effect on table rows
 
**Forms:**
- Styled input fields with borders and padding
- Focus states for inputs
- Styled buttons with hover effects
- Form layout using CSS
 
**Navigation:**
- Horizontal navigation bar
- Hover effects on navigation links
- Active/current page indication
 
**Responsive Considerations:**
- Use percentage or relative units (%, em, rem) where appropriate
- Max-width for containers
 
**Additional Styling:**
- Box-shadow on cards or containers
- Border-radius for rounded corners
- Transform property for hover effects (e.g., scale, rotate)
- Transition effects for smooth animations
 
## Technical Requirements
 
1. **File Organization:**
   - Create a separate CSS file (styles.css) and link it to all HTML pages
   - Alternatively, you may create page-specific CSS files
   - Use proper folder structure
 
2. **Code Quality:**
   - Proper HTML5 structure with DOCTYPE
   - Semantic HTML elements where appropriate
   - Valid HTML (use W3C validator)
   - Well-commented CSS code
   - Consistent indentation and formatting
   - Meaningful class and ID names
 
3. **Accessibility:**
   - All images must have alt attributes
   - Form labels properly associated with inputs
   - Sufficient color contrast
   - Proper heading hierarchy (h1, h2, h3, etc.)
 
4. **Cross-page Consistency:**
   - Navigation bar should be identical on all pages
   - Footer should be consistent
   - Color scheme and typography should be uniform
   - Same CSS file(s) used across all pages