# Frost Swirl Gelato (FS Gelato) 🍦

A full-stack e-commerce web application for an artisanal gelato shop. This project features a robust Spring Boot backend API and a dynamic Angular frontend, allowing customers to browse gelato flavors, manage their shopping carts, process checkouts, and track their orders seamlessly.

## 🚀 Features

* **Product Catalog:** Browse gelato flavors, seasonal offerings, and menu items categorized dynamically.
* **Shopping Cart:** Add, remove, and manage items in a persistent shopping cart interface.
* **Checkout System:** Secure checkout process that captures customer information and finalizes orders.
* **Order Tracking:** Customers can view and track the status of their placed orders.
* **Company Pages:** Informational sections including Contact Us, Customer Service, and Company Home.

## 🛠️ Tech Stack

### Backend (Spring Boot)
* **Framework:** Java / Spring Boot
* **Build Tool:** Maven
* **Architecture:** RESTful API architecture with distinct layers for Controllers, Services, Repositories, and Entities.
* **Data Management:** Spring Data JPA / Hibernate (with initial data seeded via `data.sql`).

### Frontend (Angular)
* **Framework:** Angular (TypeScript)
* **Styling:** HTML / CSS
* **Package Manager:** npm
* **Key Modules:** Component-based UI, Routing (`app-routing.module.ts`), and HTTP Client Services for API communication (`base-http.service.ts`).

## 📂 Project Structure Overview

The repository is divided into two distinct workspaces to separate the client and server:

```text
fsgelato/
├── backend/                          # Spring Boot Java Application
│   ├── src/main/java/com/gabriel/
│   │   ├── config/                   # API and CORS configurations
│   │   ├── controller/               # API endpoints (Checkout, Order, Product, etc.)
│   │   ├── dto/                      # Data Transfer Objects (Purchase, PurchaseResponse)
│   │   ├── entity/                   # JPA Entities (Customer, Order, Product, etc.)
│   │   ├── repository/               # Data access layer interfaces
│   │   └── service/                  # Business logic implementation
│   └── src/main/resources/           # App properties (application.yml) and SQL seed data
│
├── frontend/                         # Angular Application
│   ├── src/app/
│   │   ├── checkout/                 # Checkout form and submission logic
│   │   ├── model/                    # TypeScript interfaces and models
│   │   ├── order-tracking/           # Order status and history UI
│   │   ├── product-category/         # Dynamic product browsing views
│   │   ├── service/                  # Angular services communicating with the backend
│   │   └── shopping-cart/            # Cart management UI
│   └── src/assets/                   # Images, icons, and static scenery assets
