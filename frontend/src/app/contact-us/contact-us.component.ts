import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms'; // Import Reactive Forms

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], // Import ReactiveFormsModule
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent {
  fb = inject(FormBuilder);
  isSubmitting = false;
  submitStatus: 'success' | 'error' | null = null;

  contactForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    subject: ['', Validators.required],
    message: ['', [Validators.required, Validators.minLength(10)]]
  });

  onSubmit(): void {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    this.submitStatus = null;
    console.log('Form Submitted!', this.contactForm.value);

    // Simulate sending data (replace with actual HTTP call later)
    setTimeout(() => {
      // Simulate success/error
      const success = Math.random() > 0.2; // 80% chance of success
      if (success) {
        this.submitStatus = 'success';
        this.contactForm.reset();
      } else {
        this.submitStatus = 'error';
      }
      this.isSubmitting = false;
    }, 1500);
  }

   // Helper getters for template validation
  get name() { return this.contactForm.get('name'); }
  get email() { return this.contactForm.get('email'); }
  get subject() { return this.contactForm.get('subject'); }
  get message() { return this.contactForm.get('message'); }
}