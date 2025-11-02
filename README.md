# Contact Studio

A modern, fast, and responsive contact management application built with React, Framer Motion, and Tailwind CSS. This app runs entirely in your browser, saving all your contacts securely in `localStorage`.

**Live Application Link:** [**(https://contacts-list-theta.vercel.app/)**]



---

##  Features

* **Full CRUD Functionality:** Create, Read, Update, and Delete contacts.
* **Photo Uploads:** Upload profile photos, which are stored as Base64 strings in local storage.
* **Photo Management:** View photos in a "pop-up" modal and remove them, reverting to an initial-based avatar.
* **Blazing Fast Search:** Instantly filter contacts by name, phone number, or email.
* **Favourites System:** Mark contacts as "favourites" and filter the list.
* **Dual Themes:** A beautiful, animated Light/Dark Mode toggle that remembers your preference.
* **Dual Views:** Instantly switch between a modern **Grid View** and a compact **List View**.
* **Alphabetical Grouping:** Contacts are automatically sorted and grouped by their first letter, with collapsible sections.
* **Animated UI:** Smooth, delightful animations for all interactions, powered by **Framer Motion**.
* **Persistent Storage:** All contacts and theme preferences are saved directly in the browser's `localStorage`.

---

## Tech Stack

* **Core:** [React 18](https://reactjs.org/) (with Hooks)
* **Build Tool:** [Vite](https://vitejs.dev/)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/)
* **Animations:** [Framer Motion](https://www.framer.com/motion/)
* **Icons:** [Lucide React](https://lucide.dev/)
* **Data Storage:** Browser `localStorage` API

---

## Setup and Run Locally

To get a local copy up and running, follow these simple steps.

### Prerequisites

You must have [Node.js](https://nodejs.org/en/) (v18 or higher) and npm installed.

### Installation

1.  **Clone the repository:**
    ```sh
    git clone [https://github.com/siddharth-jd/Contacts-List](https://github.com/siddharth-jd/Contacts-List)
    ```

2.  **Install NPM packages:**
    ```sh
    npm install
    ```

3.  **Run the development server:**
    ```sh
    npm run dev
    ```

Open [http://localhost:5173](http://localhost:5173) (or the port shown in your terminal) to view the app.

---

## Design Choices & Assumptions

As the project description was open to interpretation, I made the following product and engineering decisions:

* **Storage (`localStorage`)**: I chose `localStorage` as the persistence layer to meet the requirement of a fully client-side application. This assumes the user does not need their contacts to sync across devices or browsers, as no backend or user authentication is involved.
* **Photo Storage (Base64)**: To store images within `localStorage`, I used the `FileReader` API to convert uploaded photos into Base64 strings. This keeps all contact data, including the image, in one place.
* **State Management**: I used React's built-in `useState`, `useEffect`, and `useMemo` hooks for state management. For this app's scale, "lifting state up" to the main `App.jsx` component was sufficient and avoided the need for external libraries like Redux or Zustand.
* **Error Handling**: I assumed that simple validation was sufficient. The form requires a first name and at least one phone number, enforced with a browser `alert()`. I did not implement more complex, non-blocking error states.
* **UI/UX (Framer Motion)**: I chose to integrate `Framer Motion` to make the application feel modern and responsive. I assumed that a smooth, animated user experience (for modals, pop-ups, and list filtering) was a key product goal.
* **Data Structure**: I assumed a contact should be able to have multiple phone numbers, so `phoneNumbers` is stored as an array of strings. The merge utility intelligently combines these arrays, removing duplicates.

---

## Library Notes

* **Vite**: Chosen over Create React App for its incredibly fast HMR (Hot Module Replacement) and quick build times.
* **Tailwind CSS**: Chosen for rapid prototyping and building a custom, responsive design directly within the JSX, without context-switching to separate CSS files.
* **Framer Motion**: Integrated to handle complex UI animations (like `layoutId` photo zooms and `AnimatePresence` for modals) declaratively and with high performance.
* **Lucide React**: Selected as the icon library for its simplicity, tree-shakability (keeping the bundle size small), and consistent design.
