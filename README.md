# Contact Studio

A modern, fast, and responsive contact management application built with React, Framer Motion, and Tailwind CSS. This app runs entirely in your browser, saving all your contacts securely in `localStorage`.



---

## Features

This application is packed with features to provide a smooth and intuitive user experience:

* **Full CRUD Functionality:** Create, Read, Update, and Delete contacts.
* **Rich Contact Form:** Add first, middle, and last names, multiple phone numbers, and an email address.
* ** Photo Uploads:** Upload a profile photo for each contact, which is saved as Base64 in local storage.
* ** Favourites System:** Mark contacts as "favourites" and filter the list to see only your favourite people.
* ** Blazing Fast Search:** Instantly search and filter contacts by name, phone number, or email.
* ** Dual Themes:** A beautiful, animated Light Mode and Dark Mode toggle that remembers your preference.
* ** Dual Views:** Switch between a modern **Grid View** and a compact **List View**.
* ** Alphabetical Grouping:** Contacts are automatically sorted and grouped by the first letter of their name.
* ** Collapsible Sections:** Collapse and expand alphabetical groups to keep your list tidy.
* ** Interactive Previews:** Click any contact to see a detailed preview modal with all their information and quick actions (Call, Message, Edit, Delete).
* ** Photo Viewer:** Click a contact's photo in the preview to see a larger, "pop-up" version.
* ** Photo Management:** Easily remove a contact's photo, which reverts them to their initial avatar.
* ** Merge Duplicates:** A utility to find and merge duplicate contacts, combining their phone numbers.
* ** Animated UI:** Smooth, delightful animations for all interactions, powered by **Framer Motion**.
* ** Persistent Storage:** All contacts and theme preferences are saved directly in your browser's `localStorage`—no account needed.

---

##  Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

You must have [Node.js](https://nodejs.org/en/) (which includes npm) installed on your computer.

### Installation

1.  **Clone the repository:**
    ```sh
    git clone [https://github.com/your-username/contact-studio.git](https://github.com/your-username/contact-studio.git)
    ```

2.  **Navigate to the project directory:**
    ```sh
    cd contact-studio
    ```

3.  **Install NPM packages:**
    ```sh
    npm install
    ```

4.  **Run the development server:**
    ```sh
    npm run dev
    ```

Open [http://localhost:5173](http://localhost:5173) (or whatever port your console indicates) in your browser to see the app in action!

---

##  Tech Stack

This project was built using a modern frontend stack:

* **Core:** [React 18](https://reactjs.org/) (with Hooks)
* **Build Tool:** [Vite](https://vitejs.dev/)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/)
* **Animations:** [Framer Motion](https://www.framer.com/motion/)
* **Icons:** [Lucide React](https://lucide.dev/)
* **Data Storage:** Browser `localStorage` API
