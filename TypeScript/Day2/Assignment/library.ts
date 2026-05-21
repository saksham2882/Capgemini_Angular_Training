type MembershipTier = 'Basic' | 'Premium' | 'VIP';
type ItemStatus = 'Available' | 'Borrowed' | 'Reserved' | 'Maintenance' | 'Lost';
type ItemCategory = 'Fiction' | 'NonFiction' | 'Reference' | 'Magazine' | 'Media';

type BorrowRecord = {
    itemId: string,
    memberId: string,
    borrowDate: Date,
    dueDate: Date,
    returnDate?: Date
}

type ReservationQueue = {
    memberId: string,
    reservationDate: Date,
    priority?: number
}


interface IBorrowable {
    borrow(memberId: string, borrowDate: Date): boolean;
    returnItem(returnDate: Date): number;
    calculateLateFee(returnDate: Date): number;
}

interface IReservable {
    reserve(memberId: string, tier: MembershipTier): boolean;
    cancelReservation(memberId: string): boolean;
    getNextInQueue(): string | null;
}

interface IRenewable {
    renew(memberId: string): boolean;
    getRenewalCount(): number;
    canRenew(): boolean;
}


abstract class LibraryItem {
    id: string;
    title: string;
    category: ItemCategory;
    status: ItemStatus;
    acquisitionDate: Date;

    constructor(id: string, title: string, category: ItemCategory, acquisitionDate: Date, status: ItemStatus = 'Available') {
        this.id = id;
        this.title = title;
        this.category = category;
        this.acquisitionDate = acquisitionDate;
        this.status = status;
    }

    abstract getMaxBorrowDays(): number
    abstract getMaxRenewals(): number

    getItemAge(): number {
        const millisecondPerDay: number = 1000 * 60 * 60 * 24;
        return Math.floor((new Date().getTime() - this.acquisitionDate.getTime()) / millisecondPerDay);
    }

    updateStatus(newStatus: ItemStatus): void {
        this.status = newStatus;
    }
}


class Book extends LibraryItem implements IBorrowable, IReservable, IRenewable {
    author: string;
    isbn: string;
    pageCount: number;
    borrower: string | null = null;
    dueDate: Date | null = null;
    renewalCount: number = 0;
    reservationQueue: ReservationQueue[] = [];

    constructor(id: string, title: string, category: ItemCategory, acquisitionDate: Date, author: string, isbn: string, pageCount: number) {
        super(id, title, category, acquisitionDate);
        this.author = author;
        this.isbn = isbn;
        this.pageCount = pageCount;
    }

    getMaxBorrowDays(): number {
        if (this.category === 'Fiction') {
            return 14;
        }
        if (this.category === 'NonFiction') {
            return 21;
        }
        return 0;
    }

    getMaxRenewals(): number {
        if (this.category === 'Fiction') {
            return 2;
        }
        if (this.category === 'NonFiction') {
            return 3;
        }
        return 0;
    }

    borrow(memberId: string, borrowDate: Date): boolean {
        if (this.category === 'Reference') {
            throw new Error("Reference books cannot be borrowed");
        }
        if (this.status !== 'Available') return false;

        this.status = 'Borrowed';
        this.borrower = memberId;
        this.dueDate = new Date(borrowDate.getTime() + this.getMaxBorrowDays() * 24 * 60 * 60 * 1000);
        this.renewalCount = 0;
        return true;
    }

    returnItem(returnDate: Date): number {
        if (this.status !== 'Borrowed') return 0;
        const fee: number = this.calculateLateFee(returnDate);
        this.status = 'Available';
        this.borrower = null;
        this.dueDate = null;
        return fee;
    }

    calculateLateFee(returnDate: Date): number {
        if (!this.dueDate) {
            return 0;
        }
        const millisecondPerDay = 1000 * 60 * 60 * 24;
        let diffMilliSecond = returnDate.getTime() - this.dueDate.getTime();
        if (diffMilliSecond <= 0) return 0;

        let lateDays = Math.ceil(diffMilliSecond / millisecondPerDay);
        if (lateDays <= 7) {
            return lateDays * 0.50;
        }
        return (7 * 0.50) + ((lateDays - 7) * 1.00);
    }

    reserve(memberId: string, tier: MembershipTier): boolean {
        if (this.status === 'Available' || this.status === 'Maintenance' || this.status === 'Lost') {
            return false;
        }
        this.reservationQueue.push({
            memberId, reservationDate: new Date()
        });
        return true;
    }

    cancelReservation(memberId: string): boolean {
        const len = this.reservationQueue.length;
        this.reservationQueue = this.reservationQueue.filter(r => r.memberId !== memberId);
        return this.reservationQueue.length < len;
    }

    getNextInQueue(): string | null {
        if (this.reservationQueue.length === 0) {
            return null;
        }
        return this.reservationQueue[0].memberId;
    }

    renew(memberId: string): boolean {
        if (this.borrower !== memberId || !this.canRenew()) {
            return false;
        }
        this.renewalCount++;
        if (this.dueDate) {
            this.dueDate = new Date(this.dueDate.getTime() + this.getMaxBorrowDays() * 24 * 60 * 60 * 1000);
        }
        return true;
    }

    getRenewalCount(): number {
        return this.renewalCount;
    }

    canRenew(): boolean {
        return this.renewalCount < this.getMaxRenewals();
    }
}


class Magazine extends LibraryItem implements IBorrowable {
    issueNumber: string;
    publicationMonth: Date;
    borrower: string | null = null;
    dueDate: Date | null = null;

    constructor(id: string, title: string, acquisitionDate: Date, issueNumber: string, publicationMonth: Date) {
        super(id, title, 'Magazine', acquisitionDate);
        this.issueNumber = issueNumber;
        this.publicationMonth = publicationMonth;
    }

    getMaxBorrowDays(): number {
        const millisecondPerDay: number = 1000 * 60 * 60 * 24;
        const ageInDays: number = Math.floor((new Date().getTime() - this.acquisitionDate.getTime()) / millisecondPerDay);
        return ageInDays > 180 ? 14 : 7;
    }

    getMaxRenewals(): number {
        return 0;
    }

    borrow(memberId: string, borrowDate: Date): boolean {
        if (this.status !== 'Available') {
            return false;
        }
        this.status = 'Borrowed';
        this.borrower = memberId;
        this.dueDate = new Date(borrowDate.getTime() + this.getMaxBorrowDays() * 24 * 60 * 60 * 1000);
        return true;
    }

    returnItem(returnDate: Date): number {
        if (this.status !== 'Borrowed') {
            return 0;
        }
        const fee = this.calculateLateFee(returnDate);
        this.status = 'Available';
        this.borrower = null;
        this.dueDate = null;
        return fee;
    }

    calculateLateFee(returnDate: Date): number {
        if (!this.dueDate) {
            return 0;
        }
        const diffMilliSecond = returnDate.getTime() - this.dueDate.getTime();
        if (diffMilliSecond <= 0) return 0;
        let lateDays = Math.ceil(diffMilliSecond / (1000 * 60 * 60 * 24));
        return lateDays * 0.25;
    }
}


class DigitalMedia extends LibraryItem implements IBorrowable, IReservable, IRenewable {
    format: 'DVD' | 'BluRay' | 'AudioBook';
    durationMinutes: number;
    borrower: string | null = null;
    dueDate: Date | null = null;
    renewalCount: number = 0;
    reservationQueue: ReservationQueue[] = [];

    constructor(id: string, title: string, acquisitionDate: Date, format: 'DVD' | 'BluRay' | 'AudioBook', durationMinutes: number) {
        super(id, title, 'Media', acquisitionDate);
        this.format = format;
        this.durationMinutes = durationMinutes;
    }

    getMaxBorrowDays(): number {
        return this.format === 'AudioBook' ? 10 : 5;
    }

    getMaxRenewals(): number {
        return this.format === 'AudioBook' ? 2 : 1;
    }

    borrow(memberId: string, borrowDate: Date): boolean {
        if (this.status !== 'Available') {
            return false;
        }
        this.status = 'Borrowed';
        this.borrower = memberId;
        this.dueDate = new Date(borrowDate.getTime() + this.getMaxBorrowDays() * 24 * 60 * 60 * 1000);
        this.renewalCount = 0;
        return true;
    }

    returnItem(returnDate: Date): number {
        if (this.status !== 'Borrowed') {
            return 0;
        }
        const fee = this.calculateLateFee(returnDate);
        this.status = 'Available';
        this.borrower = null;
        this.dueDate = null;
        return fee;
    }

    calculateLateFee(returnDate: Date): number {
        if (!this.dueDate) {
            return 0;
        }
        const diffMilliSecond = returnDate.getTime() - this.dueDate.getTime();
        if (diffMilliSecond <= 0) return 0;
        let lateDays = Math.ceil(diffMilliSecond / (1000 * 60 * 60 * 24));
        return lateDays * 2.00;
    }

    reserve(memberId: string, tier: MembershipTier): boolean {
        if (this.status === 'Available' || this.status === 'Maintenance' || this.status === 'Lost') {
            return false;
        }
        this.reservationQueue.push({ memberId, reservationDate: new Date() });
        return true;
    }

    cancelReservation(memberId: string): boolean {
        const len = this.reservationQueue.length;
        this.reservationQueue = this.reservationQueue.filter(r => r.memberId !== memberId);
        return this.reservationQueue.length < len;
    }

    getNextInQueue(): string | null {
        if (this.reservationQueue.length === 0) {
            return null;
        }
        return this.reservationQueue[0].memberId;
    }

    renew(memberId: string): boolean {
        if (this.borrower !== memberId || !this.canRenew()) {
            return false;
        }
        this.renewalCount++;
        if (this.dueDate) {
            this.dueDate = new Date(this.dueDate.getTime() + this.getMaxBorrowDays() * 24 * 60 * 60 * 1000);
        }
        return true;
    }

    getRenewalCount(): number {
        return this.renewalCount;
    }

    canRenew(): boolean {
        return this.renewalCount < this.getMaxRenewals();
    }
}



class Member {
    memberId: string;
    name: string;
    email: string;
    tier: MembershipTier;
    registrationDate: Date;
    activeBorrows: string[] = [];
    totalBorrowHistory: BorrowRecord[] = [];

    constructor(memberId: string, name: string, email: string, tier: MembershipTier, registrationDate: Date = new Date()) {
        this.memberId = memberId;
        this.name = name;
        this.email = email;
        this.tier = tier;
        this.registrationDate = registrationDate;
    }

    getBorrowingPower(): number {
        if (this.tier === 'Basic') {
            return 3;
        } else if (this.tier === 'Premium') {
            return 7;
        } else if (this.tier === 'VIP') {
            return 15;
        } else {
            return 0;
        }
    }

    canBorrow(): boolean {
        return this.activeBorrows.length < this.getBorrowingPower();
    }
}


function calculateLateFeeGlobal(item: LibraryItem, dueDate: Date, returnDate: Date, memberTier: MembershipTier, renewalCount: number = 0): number {
    let diffMilliSecond: number = returnDate.getTime() - dueDate.getTime();
    let lateDays: number = 0;
    let millisecondPerDay: number = 1000 * 60 * 60 * 24;

    if (diffMilliSecond > 0) {
        lateDays = Math.ceil(diffMilliSecond / millisecondPerDay);
    }

    let isSameDayLate: boolean = false;

    if (diffMilliSecond <= 0 && returnDate.getDate() === dueDate.getDate() && returnDate.getMonth() === dueDate.getMonth() && returnDate.getFullYear() === dueDate.getFullYear()) {
        if (returnDate.getHours() >= 18) {
            isSameDayLate = true;
        }
    }

    if (lateDays === 0 && !isSameDayLate) {
        return 0;
    }

    let fee: number = 0;
    let dailyRate: number = 0;

    if (item instanceof Book) {
        if (isSameDayLate) {
            fee = 0.25;
        } else {
            if (lateDays <= 7) {
                fee = lateDays * 0.50;
            } else {
                fee = (7 * 0.50) + ((lateDays - 7) * 1.00);
            }
        }
        dailyRate = 0.50;
    }
    else if (item instanceof Magazine) {
        dailyRate = 0.25;
        if (isSameDayLate) {
            fee = dailyRate * 0.50;
        } else {
            fee = lateDays * dailyRate;
        }
    }
    else if (item instanceof DigitalMedia) {
        dailyRate = 2.0;
        if (isSameDayLate) {
            fee = dailyRate * 0.50;
        } else {
            fee = lateDays * dailyRate;
        }
    }

    if (memberTier === 'Premium') {
        fee = fee * 0.75;
    } else if (memberTier === 'VIP') {
        fee = fee * 0.50;
    }

    if (renewalCount > 0) {
        const penalty = 1 + (0.10 * renewalCount);
        fee = fee * penalty;
    }

    return parseFloat(fee.toFixed(2));
}


function processPriorityQueue(reservationQueue: ReservationQueue[], memberTiers: Map<string, MembershipTier>, activeReservationsMap: Map<string, number>): string | null {
    if (reservationQueue.length === 0) {
        return null;
    }

    const filteredQueue: ReservationQueue[] = reservationQueue.filter(q => {
        const activeRes: number = activeReservationsMap.get(q.memberId) || 0;
        return activeRes <= 2;
    })

    if (filteredQueue.length === 0) {
        return null;
    }

    filteredQueue.sort((a, b) => {
        const tierA: MembershipTier = memberTiers.get(a.memberId) || 'Basic';
        const tierB: MembershipTier = memberTiers.get(b.memberId) || 'Basic';

        const tierWeight = { 'VIP': 3, 'Premium': 2, 'Basic': 1 };

        if (tierWeight[tierA] !== tierWeight[tierB]) {
            return tierWeight[tierB] - tierWeight[tierA];
        }

        return a.reservationDate.getTime() - b.reservationDate.getTime();
    })

    return filteredQueue[0].memberId;
}


function processRenewalRequest(item: LibraryItem & IRenewable, memberId: string, hasReservations: boolean): { success: boolean, message: string } {
    let borrower: any = (item as any).borrower;
    let dueDate: Date = (item as any).dueDate as Date;

    if (borrower !== memberId) {
        return {
            success: false,
            message: "Member is not the current borrower"
        }
    }
    if (hasReservations) {
        return {
            success: false,
            message: "Cannot renew: item has pending reservations"
        };
    }
    if (!item.canRenew()) {
        return {
            success: false,
            message: "Maximum renewals reached for this item type"
        };
    }
    if (dueDate && new Date().getTime() > dueDate.getTime()) {
        return {
            success: false,
            message: "Cannot renew: return is already overdue"
        };
    }

    const success = item.renew(memberId);
    if (success) {
        return { success: true, message: "Renewal successful" };
    }
    else {
        return { success: false, message: "Renewal failed due to internal state" };
    }
}


function checkItemAvailability(item: LibraryItem, requestDate: Date, memberTier: MembershipTier, queue: ReservationQueue[] = [], memberTiers: Map<string, MembershipTier> = new Map()): { available: boolean, availableDate: Date | null, canReserve: boolean } {
    if (item.status === 'Maintenance' || item.status === 'Lost') {
        return {
            available: false,
            availableDate: null,
            canReserve: false
        };
    }
    if (item.status === 'Available') {
        return {
            available: true,
            availableDate: new Date(),
            canReserve: false
        };
    }

    let estimatedReturn: any = (item as any).dueDate || null;
    if (item.status === 'Borrowed' && queue.length === 0) {
        return {
            available: false,
            availableDate: estimatedReturn,
            canReserve: true
        };
    }

    let priority = { 'VIP': 3, 'Premium': 2, 'Basic': 1 }[memberTier];
    let position = 0;

    for (const res of queue) {
        const tier = memberTiers.get(res.memberId) || 'Basic';
        const qPriority = { 'VIP': 3, 'Premium': 2, 'Basic': 1 }[tier];
        if (qPriority > priority) {
            position++;
        }
    }

    if (estimatedReturn) {
        const extraDays = position * item.getMaxBorrowDays();
        estimatedReturn = new Date(estimatedReturn.getTime() + (extraDays * 24 * 60 * 60 * 1000));
    }

    return { available: false, availableDate: estimatedReturn, canReserve: true };
}


export function checkUpgradeEligibility(member: Member, borrowHistory: BorrowRecord[]): { eligible: boolean, recommendedTier: MembershipTier | null, reason: string } {
    const millisecondsPerMonth = 1000 * 60 * 60 * 24 * 30;
    const accountAgeInMonths = (new Date().getTime() - member.registrationDate.getTime()) / millisecondsPerMonth;

    if (accountAgeInMonths < 3) {
        return { eligible: false, recommendedTier: null, reason: "Account must be at least 3 months old" };
    }

    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const recentBorrows = borrowHistory.filter(b => b.borrowDate >= sixMonthsAgo);
    const totalBorrows = recentBorrows.length;

    let lateReturns = 0;
    let lostItems = 0;

    for (const record of recentBorrows) {
        if (!record.returnDate) continue;
        if (record.returnDate > record.dueDate) {
            lateReturns++;
        };
    }

    const latePercentage = totalBorrows > 0 ? (lateReturns / totalBorrows) * 100 : 0;

    if (member.tier === 'Basic') {
        if (totalBorrows >= 20 && latePercentage < 5) {
            return {
                eligible: true,
                recommendedTier: 'Premium',
                reason: `${totalBorrows} borrows in 6 months, ${latePercentage.toFixed(2)}% late returns`
            };
        }
    } else if (member.tier === 'Premium') {
        if (totalBorrows >= 50 && latePercentage < 2 && lostItems === 0) {
            return {
                eligible: true,
                recommendedTier: 'VIP',
                reason: `${totalBorrows} borrows in 6 months, ${latePercentage.toFixed(2)}% late returns, zero lost items`
            };
        }
    }
    return { eligible: false, recommendedTier: null, reason: "Does not meet volume or reliability criteria" };
}


console.log("Example 2: Member Borrowing Limit");
const john = new Member("M1", "John", "john@test.com", "Basic");
john.activeBorrows = ["I1", "I2", "I3"];
console.log(`canBorrow(): ${john.canBorrow()}`);

if (!john.canBorrow()) {
    console.log(`Message: "Borrowing limit reached. Basic members can borrow maximum ${john.getBorrowingPower()} items"`);
}


console.log("\nExample 6: Magazine Borrow Period");
const newMag = new Magazine("M2", "TechMonthly", new Date("2026-01-01"), "02", new Date("2026-01-01"));
console.log(`Borrow Period: ${newMag.getMaxBorrowDays()} days`);