# Problem Statement: Library Management System

 
## Overview

Build a comprehensive Library Management System using TypeScript that demonstrates your understanding of **functions, types, classes, interfaces, and abstract classes**. This system should handle various library operations with specific business rules.


## Core Requirements
 

### 1. Type Definitions

Create the following custom types:

```typescript
// Define these types

type MembershipTier = 'Basic' | 'Premium' | 'VIP';

type ItemStatus = 'Available' | 'Borrowed' | 'Reserved' | 'Maintenance' | 'Lost';

type ItemCategory = 'Fiction' | 'NonFiction' | 'Reference' | 'Magazine' | 'Media';
```

 
Create additional types for:

- `BorrowRecord` (itemId, memberId, borrowDate, dueDate, returnDate?)

- `ReservationQueue` (memberId, reservationDate, priority)

 

### 2. Interfaces


#### IBorrowable Interface

```typescript
interface IBorrowable {

    borrow(memberId: string, borrowDate: Date): boolean;

    returnItem(returnDate: Date): number; // Returns late fee

    calculateLateFee(returnDate: Date): number;
}
```

 

#### IReservable Interface

```typescript
interface IReservable {

    reserve(memberId: string, tier: MembershipTier): boolean;

    cancelReservation(memberId: string): boolean;

    getNextInQueue(): string | null; // Returns next member ID
}
```

 

#### IRenewable Interface

```typescript
interface IRenewable {

    renew(memberId: string): boolean;

    getRenewalCount(): number;

    canRenew(): boolean;
}

```

 

### 3. Abstract Base Class

Create an abstract class `LibraryItem` with:

- Properties: `id`, `title`, `category`, `status`, `acquisitionDate`

- Abstract method: `getMaxBorrowDays(): number`

- Abstract method: `getMaxRenewals(): number`

- Concrete method: `getItemAge(): number` (days since acquisition)

- Concrete method: `updateStatus(newStatus: ItemStatus): void`

 

### 4. Concrete Classes

Implement the following classes extending `LibraryItem`:
 

#### Book Class

- Additional properties: `author`, `isbn`, `pageCount`

- Implements: `IBorrowable`, `IReservable`, `IRenewable`

- **Logic Challenge**:

  - Fiction books: 14 days borrow period, 2 renewals max

  - Non-Fiction books: 21 days borrow period, 3 renewals max

  - Reference books: Cannot be borrowed (throw error)

 
#### Magazine Class

- Additional properties: `issueNumber`, `publicationMonth`

- Implements: `IBorrowable`

- **Logic Challenge**:

  - 7 days borrow period, no renewals

  - Magazines older than 6 months: 14 days borrow period

 

#### DigitalMedia Class

- Additional properties: `format` (DVD/BluRay/AudioBook), `durationMinutes`

- Implements: `IBorrowable`, `IReservable`, `IRenewable`

- **Logic Challenge**:

   - DVDs: 5 days, 1 renewal

   - AudioBooks: 10 days, 2 renewals

   - Late fee is higher for media (see below)

 

### 5. Member Class

Create a `Member` class with:

- Properties: `memberId`, `name`, `email`, `tier`, `registrationDate`, `activeBorrows`, `totalBorrowHistory`

- **Logic Challenge - Borrowing Limits**:

  - Basic: 3 items max

  - Premium: 7 items max

  - VIP: 15 items max

- Method: `canBorrow(): boolean` (checks active borrow limit)

- Method: `getBorrowingPower(): number` (returns max items based on tier)


---
 

## Complex Business Logic Functions


### 1. Late Fee Calculation Logic

 
Implement a function `calculateLateFee(item: LibraryItem, dueDate: Date, returnDate: Date, memberTier: MembershipTier): number`


**Rules**:

- Books: $0.50 per day for first week, $1.00 per day after

- Magazines: $0.25 per day flat rate

- Digital Media: $2.00 per day flat rate

- **Tier Discounts**:

   - Basic: No discount

  - Premium: 25% off late fees
  
  - VIP: 50% off late fees

- **Special Rule**: If item is returned on the same day as due date but after 6 PM, charge 50% of one day's fee

 

### 2. Priority Reservation System

 

Implement a function `processPriorityQueue(reservationQueue: ReservationQueue[], memberTiers: Map<string, MembershipTier>): string`

 

**Rules**:

- VIP members get priority over Premium, Premium over Basic

- Within same tier, earliest reservation date gets priority

- If member has more than 2 active reservations, skip them

- Return the memberId of the next eligible person

 

### 3. Smart Renewal Logic

 

Implement a function `processRenewalRequest(item: LibraryItem & IRenewable, memberId: string, hasReservations: boolean): {success: boolean, message: string}`

 

**Rules**:

- Cannot renew if item has pending reservations

- Cannot renew if already at max renewals for that item type

- Cannot renew if return is already overdue

- Renewal extends due date by the original borrow period

- Each renewal adds 10% fee to potential late fees

 

### 4. Availability Checker

 

Implement a function `checkItemAvailability(item: LibraryItem, requestDate: Date, memberTier: MembershipTier): {available: boolean, availableDate: Date | null, canReserve: boolean}`

 

**Rules**:

- Check current status

- If borrowed, estimate return date

- If reserved, check queue position based on member tier

- If in maintenance, not available (cannot reserve)

- If lost, not available (cannot reserve)

 

### 5. Member Upgrade Eligibility

 

Implement a function `checkUpgradeEligibility(member: Member, borrowHistory: BorrowRecord[]): {eligible: boolean, recommendedTier: MembershipTier, reason: string}`

 

**Rules**:

- Basic → Premium: 20+ borrows in 6 months, less than 5% late returns

- Premium → VIP: 50+ borrows in 6 months, zero lost items, less than 2% late returns

- Calculate on-time return percentage

- Consider account age (must be member for at least 3 months)

 

---

 

## Edge Cases to Handle

 

1. **The Overflow Scenario**: Member tries to borrow when at limit

2. **The Time Traveler**: Return date is before borrow date

3. **The Impatient Reserver**: Member tries to reserve an available item

4. **The Duplicate**: Member tries to borrow same item twice

5. **The Category Confusion**: Reference book borrow attempt

6. **The Renewal Abuse**: Attempting renewal on non-renewable items

7. **The Status Lock**: Operations on items in Maintenance or Lost status

 

---

 

## Sample Inputs and Expected Outputs

 

### Example 1: Late Fee Calculation

**Input:**

```
Item: Book (Fiction)

Due Date: 2026-05-01

Return Date: 2026-05-12 (11 days late)

Member Tier: Premium
```

**Expected Output:**

```
Late Fee: $5.25

Calculation: (7 days * $0.50) + (4 days * $1.00) = $7.00

Premium Discount (25%): $7.00 - $1.75 = $5.25
```

 

### Example 2: Member Borrowing Limit

**Input:**

```
Member: John (Basic Tier)

Current Active Borrows: 3

Attempting to borrow: 4th item
```

**Expected Output:**

```
canBorrow(): false

Message: "Borrowing limit reached. Basic members can borrow maximum 3 items."
```

 

### Example 3: Priority Queue Processing

**Input:**

```
Reservation Queue:

1. Member A (Basic, reserved on 2026-05-10)

2. Member B (VIP, reserved on 2026-05-15)

3. Member C (Premium, reserved on 2026-05-12)

4. Member D (Basic, reserved on 2026-05-08)
```

**Expected Output:**

```
Next Member ID: Member B

Reason: VIP tier has highest priority
```

 

### Example 4: Availability Checker

**Input:**

```
Item: Magazine (Currently Borrowed)

Estimated Return: 2026-05-20

Request Date: 2026-05-18

Member Tier: Basic

Has Reservations: Yes (2 VIP members in queue)
```

**Expected Output:**

```
{
  available: false,

  availableDate: null (Basic member is behind VIP members),

  canReserve: true
}
```

 

### Example 5: Upgrade Eligibility Check

**Input:**

```
Member: Sarah (Premium Tier)

Account Age: 8 months

Borrows in last 6 months: 52

Late Returns: 1 out of 52

Lost Items: 0
```

**Expected Output:**

```
{
  eligible: true,

  recommendedTier: 'VIP',

  reason: "52 borrows in 6 months, 1.92% late returns, zero lost items"
}
```

 

### Example 6: Magazine Borrow Period

**Input:**

```
Magazine Issue: January 2026

Publication Date: 2026-01-01

Current Date: 2026-05-18

Age: 4.5 months
```

**Expected Output:**

```
Borrow Period: 7 days

Reason: Magazine is less than 6 months old
```

 

### Example 7: Renewal Request Validation

**Input:**

```
Item: Book (Fiction, already renewed 2 times)

Max Renewals: 2

Has Reservations: false

Is Overdue: false
```

**Expected Output:**
```
{
  success: false,

  message: "Maximum renewals reached for this item type"
}
```
---