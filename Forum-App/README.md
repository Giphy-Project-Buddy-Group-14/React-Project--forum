# Roaming Nomads Forum

Roaming Nomads is a travel forum for people who want to share their experiences, tips or just exciting experiences from memorable destinations from around the world, but especially from our beautiful homeland Bulgaria. 
The forum is a place where people can ask questions, share their itineraries, and connect with other travelers. It is also a great resource for people who are planning their trips to Bulgaria and want to learn more about the country's culture, history, and attractions. ***The forum has different sections for different types of travel, such as budget travel, luxury travel, family travel, solo travel, and adventure travel. It also has sections for different regions of Bulgaria, such as the Black Sea Coast, the Rhodope Mountains, and the capital city of Sofia.(NB! We'll change this section!)***


## Functional Requirements

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


