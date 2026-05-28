import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Customer } from '../../../model/model';

@Component({
  selector: 'app-customer-profile',
  imports: [CommonModule, FormsModule],
  templateUrl: './customer-profile.html',
  styleUrl: './customer-profile.css',
})

export class CustomerProfile {

  customer: Customer = {
    id: 1,
    firstName: 'Admin',
    lastName: 'Test',
    email: 'admin@gmail.com',
    phone: '9876543210',
    address: '123 Apple Street',
    membershipLevel: 'Gold',
    loyaltyPoints: 100,
    totalOrders: 10,
    joinDate: new Date(),
    profileImageUrl: '/favicon.ico',
    isActive: true,
    subscribeNewsletter: true,
    preferredCategory: 'Electronics',
  };

  showEmail = false;
  isEditMode = false;
  isProfileComplete = true;
  originalCustomer!: Customer;

  categories = ["Electronics", "Accessories", "Audio", "Computers"];

  isFormValid() {
    return this.customer.firstName.length > 0 && this.customer.lastName.length > 0 && this.customer.email.includes('@');
  }

  getMembershipColor() {
    switch (this.customer.membershipLevel) {
      case 'Premium': return 'gold';
      case 'Gold': return 'orange';
      case 'Silver': return 'silver';
      default: return 'gray';
    }
  }

  toggleEditMode() {
    this.isEditMode = true;
    this.originalCustomer = { ...this.customer };
  }

  saveProfile() {
    this.isEditMode = false;
    alert("Profile Saved Successfully")
  }

  cancelEdit() {
    this.customer = { ...this.originalCustomer };
    this.isEditMode = false;
  }

  onPhotoUpload(event: Event) {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files[0]) {
      const reader = new FileReader();

      reader.onload = () => {
        this.customer.profileImageUrl = reader.result as string;
      };
      reader.readAsDataURL(input.files[0]);
    }
  }

  validateField(event: Event) {
    console.log('Field validated');
  }

  updateNewsletterPreference(event: Event) {
    console.log('Newsletter updated');
  }
}