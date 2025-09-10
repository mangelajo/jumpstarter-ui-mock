# Jumpstarter UI

A react application built with PatternFly that follows the UI standards of OpenShift
at Red Hat.

## Features

- **Dark Theme**: OpenShift-style dark theme with proper color variables
- **Left Navigation**: Sidebar with Exporters, Leases, Clients, and Shell sections
- **Header Bar**: Red Hat branding, project selector, notifications, and user menu
- **Responsive Layout**: PatternFly's responsive page layout
- **Interactive Navigation**: Clickable navigation items with active states

## Project Structure

```
src/
├── App.js          # Main application component
├── App.css         # OpenShift dark theme styling
└── index.js        # React app entry point

public/
└── index.html      # HTML template

package.json        # Dependencies and scripts
```

## Getting Started

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Start Development Server**:
   ```bash
   npm start
   ```

3. **Open Browser**:
   Navigate to `http://localhost:3000` to view the application

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm eject` - Ejects from Create React App (one-way operation)

## Dependencies

- **@patternfly/react-core**: Core PatternFly React components
- **@patternfly/react-icons**: PatternFly icon library
- **@patternfly/react-styles**: PatternFly styling utilities
- **react**: React library
- **react-dom**: React DOM rendering
- **react-scripts**: Create React App scripts

## Navigation Sections

The left sidebar includes four main sections:

1. **Exporters** - Manage and configure exporters for your OpenShift cluster
2. **Leases** - View and manage lease information for your resources
3. **Clients** - Manage client connections and configurations
4. **Shell** - Access shell interface for your OpenShift cluster

## Styling

The application uses a custom dark theme that closely matches the OpenShift console:

- Dark background colors (#151515, #1e1e1e, #2a2a2a)
- Light text colors (#f0f0f0, #d2d2d2, #b8bbbe)
- Red Hat brand colors for primary elements
- Proper contrast ratios for accessibility
- Hover and active states for interactive elements

## Next Steps

This is a base implementation. You can extend it by:

- Adding more detailed content to each navigation section
- Implementing data tables and forms
- Adding more interactive components
- Integrating with real OpenShift APIs
- Adding routing between different views
- Implementing user authentication

## PatternFly Documentation

This project follows PatternFly best practices. For more information, refer to:
- [PatternFly.org](https://www.patternfly.org/)
- [PatternFly React GitHub](https://github.com/patternfly/patternfly-react)
