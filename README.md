## Overview

Welcome to the Pricewise project, a comprehensive solution for tracking product prices on Amazon. This project is designed to scrape product details from Amazon, store the data in a MongoDB database, and send email notifications to users when there are changes in the product details. The project includes a web application with a user-friendly interface that allows users to search for products, view product details, and subscribe to product updates. The application is built with Next.js and Tailwind CSS, and it includes several components such as a home page, product details page, navbar, search bar, product card, price info card, and modal.

The server-side logic is implemented with serverless functions that handle various tasks such as connecting to the database, scraping product details, updating product information, and sending email notifications. The project also includes several utility functions for extracting information from web pages and formatting numbers.

# Technologies and Frameworks

- Next.js: A React framework for building web applications. It is used for both the frontend and the backend of the application.
- Tailwind CSS: A utility-first CSS framework for rapidly building custom designs. It is used for styling the application.
- TypeScript: A statically typed superset of JavaScript. It is used for writing the code.
- Mongoose: An Object Data Modeling (ODM) library for MongoDB and Node.js. It is used for defining the product schema and interacting with the MongoDB database.
- Nodemailer: A module for Node.js applications to allow easy email sending. It is used for sending email notifications to users.
- Axios: A promise-based HTTP client for the browser and Node.js. It is used for making HTTP requests to scrape product details from Amazon.
- Cheerio: A fast, flexible, and lean implementation of core jQuery designed specifically for the server. It is used for parsing the HTML response from the Amazon product page.
- React Responsive Carousel: A lightweight carousel component for React. It is used for displaying a carousel of images on the home page.
- Google Fonts: A library of free licensed font families. It is used for defining the font styles in the application.
