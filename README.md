# Roaming Nomads Forum

Welcome to the Roaming Nomads Forum! This is a community-driven platform where travel enthusiasts and digital nomads can connect, share experiences, and discuss various topics related to travel and remote work.

## Project Overview

Roaming Nomads Forum is a web application designed to facilitate discussions and interactions among travelers and digital nomads. It includes features for posting threads, commenting, and engaging with other users.

## Technologies Used

### Frontend:

- JavaScript (for interactivity and dynamic content)
- CSS (for styling and layout)
- HTML (for structure and content)

### Getting Started

To get started with the Roaming Nomads Forum, follow these steps:

1. Clone the Repository:

```rust
  git clone https://github.com/Giphy-Project-Buddy-Group-14/React-Project--forum
```

2. Navigate to the Project Directory:

```rust
  cd React-Project--forum
```

3. Open the Project in a Browser:
   Simply open the index.html file in your preferred web browser.

## Contributing

We welcome contributions to the Roaming Nomads Forum! To contribute:

1. Fork the Repository
2. Create a New Branch:

```rust
git checkout -b feature/your-feature
```

3. Make Your Changes
4. Commit Your Changes:

```rust
git commit -am 'Add new feature'
```

5. Push to the Branch:

```rust
git push origin feature/your-feature
```

6. Create a Pull Request

### Entities (documents)

- **User:**

  - Each user must have a first and last name, email, and/or username.
  - First name and last name must be between 4 and 32 symbols.
  - Email must be a valid email and unique in the system.

- **Admin:**

  - Each admin must have a first and last name, email, and may have a phone number.
  - First name and last name must be between 4 and 32 symbols.
  - Email must be a valid email and unique in the system.

- **Post:**
  - Each post must have a user who created it, a title, content, comments, and how many likes it has received.
  - The title must be between 16 and 64 symbols.
  - The content must be between 32 symbols and 8192 symbols.
  - The post must have a user who created it.
  - Other users must be able to post replies.

### Public Part

The public part is accessible without authentication.

- On the home page, anonymous users are presented with the core features of the platform as well as how many people are using it and how many posts have been created so far.
- Anonymous users can register and log in.
- Anonymous users can see a list of the top 10 most commented posts and a list of the 10 most recently created posts.

### Private Part

The private part is accessible only if the user is authenticated.

- The user can log in and log out.
- Users can browse posts created by other users with an option to sort and filter them.
- Users can view a single post including its title, content, comments.

## License

This project is licensed under the MIT License. See the LICENSE file for details.
