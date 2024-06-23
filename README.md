# Angular Assignment: Star Wars Character Viewer with Bootstrap Integration
# Coding Assignment
In this assignment, you will be building a small front-end application using Angular that interfaces with the Star Wars API (SWAPI). The application will display a filterable list of characters from the Star Wars movie franchise, enhanced with Bootstrap for styling and layout.

# App Overview
The application consists of:

• Main View: Displays a list of characters and a filter section.
• Filter Section: Allows users to filter characters based on movie appearances, species, and birth year range.
• Detail View: Shows detailed information about a selected character.

# Bootstrap Integration
• Styling: Utilizes Bootstrap for consistent styling and responsive design.
• Components: Uses Bootstrap components where applicable to enhance user interface elements.

# Character List
• Display: A simple list of character names.
• Interaction: Clicking on a character's name opens the detail view for that character.

# Filter

• Options: Users can filter characters based on:
  • Movie appearances (e.g., Episode IV: A New Hope)
  • Species (e.g., Human)
  • Birth year range (e.g., between 30 BBY and 5 ABY).

• Behavior: All filter settings are applied using an AND relationship.

# Character Details
• Displayed Information: Shows detailed information about a character including:
    • Name
    • Species
    • Movies appeared in
    • Spaceships associated with the character

# API Usage

    • Endpoint: Utilizes the /people endpoint from SWAPI.
    • Filtering: As SWAPI does not support filtering, data is fetched and filtered client-side to minimize unnecessary API requests.

# Angular Features Used
Routing: Each character's detail view is accessible via a unique URL (/characters/:id).

# Installation and Running the Application

 To run the application locally:

1. Clone the repository from GitHub:

    git clone (https://github.com/ShwetaOjha1701/Angular-Assignment.git)

2. Navigate into the project directory:

cd Angular-Assignment

3. Install dependencies using npm:

 npm install

4. Install Bootstrap using npm:

npm install bootstrap

5. import Bootstrap styles into your angular.json file:

 "styles": [
             
              "node_modules/bootstrap/dist/css/bootstrap.min.css"
            ],

6. Start the Angular development server:
 
 ng serve






