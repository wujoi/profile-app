# User Profile Management App

SPA for managing user profiles, built using React. The app allows users to create, view, edit, and delete profiles. All data is stored and loaded from local storage.

## Features

- **Login**: Authenticate users with an email and password.
- **Create Profile**: Collect user information and store it in local storage.
- **View Profile**: Display the user's profile information.
- **Edit Profile**: Allow users to edit their profile information.
- **Delete Profile**: Prompt the user for confirmation before deleting their profile.

## Profile Data

- **Email** (required): Validates email syntax.
- **Password** (required): Must be 10-32 characters long, contain at least 2 uppercase letters, 2 numbers, and 1 special character.
- **Full name** (required): Minimum of 3 characters.
- **Phone number** (optional): Stored in E.164 International Format and displayed in a user-friendly format.
- **Favorite color** (required): Either blue, red, green, yellow, purple, black, or orange.
