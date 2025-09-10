# Jumpstarter UI

A React application built with PatternFly and TypeScript for Jumpstarter.

## Features

- **Dark Theme**: OpenShift-style dark theme with proper color variables
- **Left Navigation**: Sidebar with Exporters, Leases, and Clients sections
- **Header Bar**: Red Hat branding, project selector, notifications, and user menu
- **Responsive Layout**: PatternFly's responsive page layout
- **Interactive Navigation**: Clickable navigation items with active states
- **Exporter Details**: Detailed view with tabs for Details, Metrics, YAML, Events, and Jumpstarter Shell
- **Terminal Console**: Interactive terminal interface using xterm.js for shell access
- **TypeScript**: Full TypeScript support for type safety and better development experience

## Project Structure

```
src/
├── App.tsx                    # Main application component
├── App.css                    # OpenShift dark theme styling
├── index.tsx                  # React app entry point
├── types.ts                   # TypeScript type definitions
├── ExportersPage.tsx          # Exporters list page
├── LeasesPage.tsx             # Leases list page
├── ClientsPage.tsx            # Clients list page
├── ExporterDetailsPage.tsx    # Exporter details page with tabs
├── TerminalConsole.tsx        # Terminal console component
└── ShellPage.tsx              # Shell page (unused, shell is in details)

public/
└── index.html                 # HTML template

package.json                   # Dependencies and scripts
tsconfig.json                  # TypeScript configuration
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
- **@patternfly/react-table**: PatternFly table components
- **@patternfly/react-console**: PatternFly console components
- **@xterm/xterm**: Terminal emulator for shell interface
- **@xterm/addon-fit**: Terminal fitting addon
- **react**: React library
- **react-dom**: React DOM rendering
- **react-router-dom**: React routing
- **react-scripts**: Create React App scripts
- **typescript**: TypeScript compiler

## Navigation Sections

The left sidebar includes three main sections:

1. **Exporters** - Manage and configure exporters for your OpenShift cluster
   - Click on any exporter name to view detailed information
   - Includes tabs for Details, Metrics, YAML, Events, and Jumpstarter Shell
   - Interactive terminal console for device-specific shell access

2. **Leases** - View and manage lease information for your resources
   - Data table with filtering and sorting capabilities
   - Actions for Release and Extend operations

3. **Clients** - Manage client connections and configurations
   - Placeholder for future client management functionality

## Terminal Console

The application includes a sophisticated terminal console component that provides:

- **Interactive Shell**: Real terminal experience using xterm.js
- **Device-Specific Access**: Each exporter has its own shell session
- **Jumpstarter Commands**: Pre-configured with `jmp shell` and `j` commands
- **Connection Management**: Connect/Disconnect controls
- **Quick Commands**: Buttons for common operations
- **Responsive Design**: Automatically fits to container size

## Styling

The application uses a custom dark theme that closely matches the OpenShift console:

- Dark background colors (#151515, #1e1e1e, #2a2a2a)
- Light text colors (#f0f0f0, #d2d2d2, #b8bbbe)
- Red Hat brand colors for primary elements
- Proper contrast ratios for accessibility
- Hover and active states for interactive elements
- Terminal console with OpenShift-style dark theme

## TypeScript

The project is fully converted to TypeScript with:

- Type definitions for all data structures
- Proper typing for React components and hooks
- Interface definitions for exporters, leases, and clients
- Type safety for PatternFly component props

## Next Steps

This is a comprehensive implementation. You can extend it by:

- Adding more detailed content to each navigation section
- Implementing real data integration with OpenShift APIs
- Adding user authentication and authorization
- Implementing real-time updates for terminal console
- Adding more interactive components and forms
- Implementing proper routing with React Router
- Adding unit and integration tests

## PatternFly Documentation

This project follows PatternFly best practices. For more information, refer to:
- [PatternFly.org](https://www.patternfly.org/)
- [PatternFly React GitHub](https://github.com/patternfly/patternfly-react)