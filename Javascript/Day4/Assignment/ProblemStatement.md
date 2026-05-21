# PROBLEM DESCRIPTION

Build a Student Performance Analysis System that analyzes student data across
multiple subjects. You will work with student records, calculate statistics,
identify patterns, and generate insights using JavaScript's built-in data
structures: Arrays, Maps, and Sets.
 
### SAMPLE DATA STRUCTURE

```javascript
const students = [
    { id: 101, name: "Alice Johnson", age: 20, 
      subjects: ["Math", "Physics", "Chemistry"], 
      scores: [85, 90, 78] },
    { id: 102, name: "Bob Smith", age: 21, 
      subjects: ["Math", "Physics", "Chemistry"], 
      scores: [92, 88, 95] },
    { id: 103, name: "Charlie Brown", age: 19, 
      subjects: ["Math", "Physics", "Biology"], 
      scores: [78, 82, 85] },
    { id: 104, name: "Diana Prince", age: 20, 
      subjects: ["Math", "Chemistry", "Biology"], 
      scores: [95, 92, 89] },
    { id: 105, name: "Eve Davis", age: 22, 
      subjects: ["Physics", "Chemistry", "Biology"], 
      scores: [88, 85, 90] }
];
```

 

## PART 1: ARRAY OPERATIONS (20 points)

 

### Task 1.1: Filter and Sort (5 points)
-------------------------------------
- Filter students who scored above 85 in ALL subjects
- Sort students by their average score (descending order)
- Find students aged between 19-21
- Get list of students who study "Physics"

 

### Task 1.2: Array Transformations (5 points)
-------------------------------------------
- Create new array with only student names and their average scores
- Use map() to add "grade" property based on average:
  * A: 90-100
  * B: 80-89
  * C: 70-79
  * D: 60-69
  * F: below 60
- Flatten all subjects into a single array (including duplicates)

 

### Task 1.3: Array Aggregations (5 points)
----------------------------------------
- Calculate the overall class average across all subjects
- Find the highest score in each subject
- Count total number of students enrolled in each subject
- Use reduce() to find the student with highest overall average

 

### Task 1.4: Array Search Operations (5 points)
---------------------------------------------
- Find a student by ID using find()
- Check if any student scored below 70 using some()
- Check if all students passed (scored >= 60) using every()
- Get index of a specific student by name using findIndex()

 

## PART 2: MAP OPERATIONS (20 points)

 

### Task 2.1: Create Subject-Score Map (5 points)
----------------------------------------------
Create a Map where keys are subject names and values are arrays of all 
scores in that subject.
Example: Map { "Math" => [85, 92, 78, 95], "Physics" => [...], ... }

 

### Task 2.2: Student Performance Map (5 points)
---------------------------------------------
Create a Map with student ID as key and student object as value.
Add methods to:
- Get student by ID
- Update student scores
- Delete a student record
- Check if student exists

 

### Task 2.3: Grade Distribution Map (5 points)
--------------------------------------------
Create a Map showing count of students in each grade (A, B, C, D, F).
Example: Map { "A" => 2, "B" => 3, "C" => 1, ... }

 

### Task 2.4: Subject Statistics Map (5 points)
--------------------------------------------
Create a Map for each subject containing:
- Average score
- Highest score
- Lowest score
- Number of students enrolled
Example: Map { "Math" => { avg: 87.5, high: 95, low: 78, count: 4 }, ... }

 

## PART 3: SET OPERATIONS (20 points)

### Task 3.1: Unique Values (5 points)
-----------------------------------
- Create a Set of all unique subjects offered
- Create a Set of all unique ages
- Create a Set of all unique scores (across all students and subjects)

 

### Task 3.2: Set Operations - Union, Intersection, Difference (10 points)
-----------------------------------------------------------------------
Given students' subject enrollments, implement:

- UNION: Find all subjects taken by either Student A OR Student B
- INTERSECTION: Find common subjects between Student A AND Student B
- DIFFERENCE: Find subjects taken by Student A but NOT by Student B
- SYMMETRIC DIFFERENCE: Subjects taken by either A or B but not both

 
Example Implementation Required:
```javascript
function getUnion(set1, set2) { /* your code */ }
function getIntersection(set1, set2) { /* your code */ }
function getDifference(set1, set2) { /* your code */ }
function getSymmetricDifference(set1, set2) { /* your code */ }
```

 

### Task 3.3: Data Validation with Sets (5 points)
-----------------------------------------------
- Create a Set of valid subject names
- Validate if a student's subjects are all valid
- Remove duplicate subjects if any student is enrolled in same subject twice
- Find students with unique subject combinations

 

## PART 4: COMBINED OPERATIONS (20 points)

 

### Task 4.1: Leaderboard Generation (5 points)
--------------------------------------------
Create a leaderboard using Arrays, Maps, and Sets:
- Rank students by average score
- Handle ties (students with same average get same rank)
- Display: Rank, Name, Average Score, Grade
- Use Map to store ranks and Set to track unique average scores

 

### Task 4.2: Subject Performance Analysis (5 points)
--------------------------------------------------
For each subject, generate a report containing:
- Top 3 performers (use Array methods)
- Average score (use reduce)
- Number of students above average (use filter)
- Store results in a Map with subject as key

 

### Task 4.3: Student Grouping (5 points)
--------------------------------------
Group students using Maps:
- Group by grade (A, B, C, etc.)
- Group by age
- Group by number of subjects enrolled
- Each group should contain array of student objects

 

### Task 4.4: Data Deduplication and Merging (5 points)
----------------------------------------------------
- Given two arrays of student records, merge them removing duplicates
  (based on student ID)
- Use Set to track seen IDs
- Return merged array with unique students
- If duplicate found, keep the record with higher average score

 

## PART 5: UI IMPLEMENTATION (20 points)

 

### HTML Structure Requirements (8 points)
---------------------------------------
- Input section to add new student records
- Display section showing all students in a table
- Filter/Search controls:
  * Search by name
  * Filter by grade
  * Filter by subject
- Statistics dashboard showing:
  * Total students
  * Class average
  * Grade distribution
  * Subject-wise performance

 

### CSS Styling Requirements (7 points)
------------------------------------
- Responsive layout (works on mobile and desktop)
- Styled table with alternating row colors
- Color-coded grades (A=Green, B=Blue, C=Yellow, D=Orange, F=Red)
- Styled input forms and buttons
- Visual statistics section with cards or panels

 

### JavaScript Functionality (5 points)
------------------------------------
- Add new student dynamically
- Delete student from list
- Search/Filter functionality that updates display in real-time
- Calculate and display statistics dynamically
- All data operations must use Arrays, Maps, or Sets appropriately

 

## CONSTRAINTS
 

- Student IDs should be unique (use Set to validate)
- Scores must be between 0-100
- Minimum 1 subject, maximum 5 subjects per student
- Subject names should be validated against a Set of valid subjects
- Age must be between 18-30

 

## TEST CASES

 
### Test Case 1: Array Operations
------------------------------
```javascript
Input: Filter students with average > 85
Expected Output: Bob Smith (91.67), Diana Prince (92)
```
 

### Test Case 2: Map Operations
----------------------------
```javascript
Input: Get subject statistics for "Math"
Expected Output: { avg: 87.5, high: 95, low: 78, count: 4 }
```
 

### Test Case 3: Set Operations
----------------------------
```javascript
Input: Union of subjects for Alice and Bob
Expected Output: Set { "Math", "Physics", "Chemistry" }
```
 

### Test Case 4: Combined Operations
---------------------------------
```javascript
Input: Generate leaderboard
Expected Output: 
Rank 1: Diana Prince (92.00) - Grade A
Rank 2: Bob Smith (91.67) - Grade A
Rank 3: Eve Davis (87.67) - Grade B
Rank 4: Alice Johnson (84.33) - Grade B
Rank 5: Charlie Brown (81.67) - Grade B
```
 

### Test Case 5: Deduplication
---------------------------
```javascript
Input: 
array1 = [{ id: 101, name: "Alice", scores: [85, 90] }]
array2 = [{ id: 101, name: "Alice", scores: [90, 95] }, 
          { id: 106, name: "Frank", scores: [80, 85] }]
Expected Output: Merged array with 2 students (Alice with higher scores, Frank)
```