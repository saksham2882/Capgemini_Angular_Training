# Assignment: Student Registration Form for Online Learning Platform

## Objective 

Create a comprehensive student registration form for "EduLearn Academy" - an online learning platform. The form should demonstrate your understanding of HTML form elements, input types, validation, and best practices.


## Problem Description

EduLearn Academy is launching a new online learning platform and needs a professional registration form for new students. You are hired as a web developer to create this registration form that collects all necessary information from prospective students while demonstrating proper use of HTML5 form elements and validation.


## Form Requirements


### 1. Required Form Elements

Your registration form must include the following HTML form elements:

- form - Main form container with proper attributes
- input - Various input types for different data
- textarea - For multi-line text input (comments, bio)
- select - Dropdown menus for selections
- option - Options within dropdowns
- optgroup - Grouped options (e.g., countries by continent)
- button - Action buttons
- label - Labels for all form controls
- fieldset - Group related fields together
- legend - Titles for fieldsets
- datalist - Autocomplete suggestions
- output - Display calculated results


### 2. Input Types to Include

Demonstrate the following HTML5 input types:

1. text - Name, username, general text
2. password - Secure password entry
3. email - Email validation
4. tel - Phone number
5. url - Website/portfolio link
6. number - Numeric values (age, budget)
7. range - Slider for ratings/preferences
8. date - Date of birth, start date
9. time - Preferred time
10. datetime-local - Session scheduling
11. month - Course start month
12. week - Week selection
13. color - Theme preference
14. search - Search functionality
15. file - Document/image uploads
16. checkbox - Multiple choice selections
17. radio - Single choice from options
18. hidden - Hidden values (user ID, etc.)
19. submit - Form submission
20. reset - Clear form
21. button - Custom actions
22. image - Image as submit button
 

### 3. Important Attributes

Use these attributes appropriately throughout your form:
 

Form Attributes:

- action, method, enctype, autocomplete, target
 

Input Attributes:

- required, placeholder, value, readonly, disabled
- autofocus, pattern, min, max, minlength, maxlength
- step, multiple, accept, size, checked
- name, id (and corresponding 'for' in labels)
 

### 4. Validation Requirements

Implement proper HTML5 validation:

- Required fields for essential information
- Email format validation
- URL format validation
- Number and date range restrictions
- Pattern matching for specific formats (phone, username)
- File type restrictions for uploads
- Minimum/maximum length for text inputs
 

### 5. Form Sections

Organize the form into logical sections:

1. **Personal Information**
   - Name (First, Middle, Last)
   - Date of Birth
   - Gender (Radio buttons)
   - Profile Picture Upload
 

2. **Contact Details**
   - Email Address
   - Phone Number
   - Website/Portfolio URL
   - Address (with country/city selection)
 

3. **Account Setup**
   - Username
   - Password (with confirmation)
   - Security Question

your registration form into the following logical sections using fieldset and legend:


1. Personal Information
   - Full Name (First, Middle, Last)
   - Date of Birth (with age restriction: 16-60 years)
   - Gender selection
   - Profile Picture upload (image files only)
 

2. Contact Details
   - Email Address (with validation)
   - Phone Number (with pattern)
   - Website/Portfolio (optional)
   - Country and City selection
   - Full Address (textarea)
 

3. Account Setup
   - Username (alphanumeric, 5-20 characters)
   - Password (strong password requirements)
   - Confirm Password
   - Security Question with Answer


4. Educational & Professional Details
   - Highest Education Level
   - Field of Study
   - Years of Experience (range slider 0-40)
   - Primary Skill (with autocomplete suggestions)

   Deliverables

Submit the following:
 

1. RegistrationForm.html
   - Well-structured, semantic HTML5 code
   - Proper indentation and formatting
   - Comments explaining different sections
   - All form elements properly labeled with 'for' attribute
   - Organized into logical fieldsets


2. Code Quality
   - Clean, readable code
   - Meaningful names for IDs and names
   - Proper nesting of elements
   - Valid HTML5 syntax


## Grading Criteria 

Your assignment will be evaluated on:


1. Completeness (40 points)
   - All 22 input types included
   - All required form elements present
   - All sections implemented

2. Validation (25 points)
   - Proper use of required attribute
   - Correct validation patterns
   - Appropriate min/max values
   - File type restrictions 

3. Code Quality (20 points)
   - Proper HTML structure
   - Clean, formatted code
   - Meaningful IDs and names
   - Good use of comments
 

4. Usability (15 points)
   - Logical organization with fieldsets
   - All inputs have labels
   - Placeholder text where appropriate
   - Clear form structure
 

Bonus Points (10 points):
- Add CSS styling for professional appearance
- Create a welcome.html confirmation page
- Add JavaScript for password matching validation
- Implement custom error messages

Submission Guidelines
 

1. File Name: RegistrationForm.html
2. Ensure your code is well-commented
3. Test your form in a modern web browser (Chrome, Firefox, Edge)
4. Verify all validation rules work correctly
5. Submit by the deadline specified by your instructor