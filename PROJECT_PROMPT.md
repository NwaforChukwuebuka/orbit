# Workspace Booking Application - Development Prompt

This prompt provides a structured approach to building a workspace booking application using Next.js, NestJS, PostgreSQL, RabbitMQ, and Firebase. Each phase builds upon the previous one, ensuring a systematic development process.

## Development Approach

- **Sequential Development**: Complete each phase before moving to the next
- **Incremental Testing**: Verify each component as it's built
- **Documentation**: Document all APIs, components, and configurations
- **Version Control**: Use feature branches and semantic versioning
- **Code Quality**: Follow linting rules and maintain consistent code style

## Phase 1: Foundation Setup

**Goal**: Establish the development environment with all core technologies.

**Current State**: Empty project structure

**Implementation Steps**:
1. **Next.js Frontend Setup**
   ```bash
   cd client
   npm init -y
   npm install next react react-dom typescript @types/react @types/node
   npm install tailwindcss postcss autoprefixer
   npx tailwindcss init -p
   ```
   - Configure `next.config.js` for environment variables
   - Set up TypeScript configuration
   - Configure Tailwind CSS with custom theme

2. **NestJS Backend Setup**
   ```bash
   cd server
   npm init -y
   npm install @nestjs/common @nestjs/core @nestjs/platform-express reflect-metadata rxjs
   npm install -D @nestjs/cli typescript @types/node @types/express
   ```
   - Create main application module
   - Configure TypeScript for strict mode
   - Set up environment configuration

3. **PostgreSQL & Prisma Setup**
   ```bash
   cd ..
   npm install -g prisma
   cd prisma
   prisma init
   ```
   - Configure database connection in `.env`
   - Create initial schema with basic models
   - Set up Prisma client for database access

4. **RabbitMQ Configuration**
   ```bash
   cd server
   npm install amqplib @types/amqplib
   ```
   - Create RabbitMQ connection module
   - Configure message queue patterns
   - Set up error handling for connection issues

5. **Firebase Setup**
   ```bash
   cd client
   npm install firebase
   ```
   - Initialize Firebase with configuration
   - Set up authentication methods
   - Configure security rules

**Verification Checklist**:
- [ ] Frontend server starts without errors (`npm run dev`)
- [ ] Backend server connects and runs (`npm run start:dev`)
- [ ] Database connection verified through Prisma (`prisma db push`)
- [ ] RabbitMQ connection successful (test message queue)
- [ ] Firebase initialization successful (test authentication)

## Phase 2: User Authentication

**Goal**: Implement secure authentication with role-based access control.

**Current State**: Foundation setup completed

**Implementation Steps**:
1. **Firebase Authentication**
   - Implement sign-up, login, and logout functions
   - Set up email verification
   - Configure password reset functionality
   - Implement social authentication providers

2. **JWT Authentication in NestJS**
   ```bash
   cd server
   npm install @nestjs/jwt passport passport-jwt @nestjs/passport
   ```
   - Create JWT strategy and guard
   - Implement token generation and validation
   - Set up refresh token mechanism

3. **Authentication UI Components**
   - Create reusable form components
   - Implement login page with validation
   - Build registration page with field validation
   - Create password reset flow UI

4. **Role-Based Access Control**
   - Define user roles (admin, manager, user)
   - Create role guards for API endpoints
   - Implement role-based UI rendering
   - Set up role assignment during registration

5. **Protected Routes**
   - Create authentication context provider
   - Implement route guards for protected pages
   - Set up redirect logic for unauthenticated users
   - Create role-based route access control

**Verification Checklist**:
- [ ] User registration creates account and role
- [ ] Login generates valid JWT token
- [ ] Protected routes redirect unauthenticated users
- [ ] Role-based access restricts appropriate resources
- [ ] Password reset flow works end-to-end

## Phase 3: Workspace Management

**Goal**: Create workspace management system with visual representation.

**Current State**: Authentication system implemented

**Implementation Steps**:
1. **Workspace Data Models**
   ```prisma
   model Workspace {
     id          String   @id @default(uuid())
     name        String
     description String?
     capacity    Int
     floor       Int
     building    String
     amenities   String[]
     isActive    Boolean  @default(true)
     createdAt   DateTime @default(now())
     updatedAt   DateTime @updatedAt
     bookings    Booking[]
   }
   ```
   - Generate Prisma client
   - Create database migrations
   - Set up seed data for testing

2. **Workspace API**
   - Implement CRUD endpoints with validation
   - Create service layer for business logic
   - Add filtering and pagination
   - Implement search functionality

3. **Workspace UI Components**
   - Create workspace card component
   - Build workspace detail page
   - Implement workspace list with pagination
   - Create workspace management dashboard

4. **Floor Plan Visualization**
   - Design SVG-based floor plan component
   - Implement interactive workspace selection
   - Create color-coding for availability
   - Add tooltips for workspace details

5. **Search and Filtering**
   - Implement search bar with autocomplete
   - Create filter sidebar with multiple criteria
   - Add sorting options for workspace list
   - Implement URL-based filter state

**Verification Checklist**:
- [ ] Workspace CRUD operations work correctly
- [ ] UI displays workspace information accurately
- [ ] Floor plan shows correct workspace layout
- [ ] Search and filters return expected results
- [ ] API endpoints handle errors appropriately

## Phase 4: Booking System

**Goal**: Implement booking system with conflict prevention.

**Current State**: Workspace management implemented

**Implementation Steps**:
1. **Booking Data Models**
   ```prisma
   model Booking {
     id          String     @id @default(uuid())
     userId      String
     workspaceId String
     startTime   DateTime
     endTime     DateTime
     status      BookingStatus @default(CONFIRMED)
     createdAt   DateTime   @default(now())
     updatedAt   DateTime   @updatedAt
     user        User       @relation(fields: [userId], references: [id])
     workspace   Workspace  @relation(fields: [workspaceId], references: [id])
   }

   enum BookingStatus {
     PENDING
     CONFIRMED
     CANCELLED
     COMPLETED
   }
   ```
   - Create database migrations
   - Set up relationships between models
   - Add indexes for performance

2. **Booking API**
   - Implement booking creation with conflict detection
   - Create endpoints for managing bookings
   - Add validation for booking times
   - Implement cancellation logic

3. **Booking UI Components**
   - Create booking form with date/time selection
   - Build booking calendar view
   - Implement booking management interface
   - Add confirmation and cancellation flows

4. **Seat Swap Interface**
   - Create interface for finding available alternatives
   - Implement swap request and approval flow
   - Add notification system for swap requests
   - Build UI for managing swap requests

5. **Real-Time Updates**
   - Set up Firebase Realtime Database for booking status
   - Implement WebSocket connection for live updates
   - Create UI components that react to real-time changes
   - Add optimistic UI updates for better UX

**Verification Checklist**:
- [ ] Booking creation prevents conflicts
- [ ] Calendar view shows correct availability
- [ ] Booking management works end-to-end
- [ ] Seat swap functionality works correctly
- [ ] Real-time updates reflect booking changes

## Phase 5: Notifications

**Goal**: Create multi-channel notification system.

**Current State**: Booking system implemented

**Implementation Steps**:
1. **Email Service**
   ```bash
   cd server
   npm install nodemailer @nestjs-modules/mailer
   ```
   - Create email templates for different notifications
   - Implement email service with retry logic
   - Set up email queue for reliability
   - Add email preference management

2. **RabbitMQ Notification Queue**
   - Create notification producer service
   - Implement notification consumer service
   - Set up dead letter queue for failed notifications
   - Add monitoring for queue health

3. **Firebase Cloud Messaging**
   - Configure FCM in client application
   - Implement token management for devices
   - Create notification payload structure
   - Set up background notification handling

4. **Notification Preferences**
   - Create UI for managing notification settings
   - Implement API for saving preferences
   - Add preference-based notification filtering
   - Create notification center UI

5. **Notification Triggers**
   - Set up triggers for booking events
   - Implement reminder notifications
   - Create admin notification system
   - Add notification analytics

**Verification Checklist**:
- [ ] Emails are sent for booking events
- [ ] RabbitMQ processes notification messages
- [ ] Push notifications are delivered to devices
- [ ] Users can manage notification preferences
- [ ] All relevant events trigger appropriate notifications

## Phase 6: Analytics & Reporting

**Goal**: Implement usage tracking and reporting features.

**Current State**: Notification system implemented

**Implementation Steps**:
1. **Usage Tracking Service**
   - Create event tracking system
   - Implement user action logging
   - Set up analytics data collection
   - Add privacy-compliant tracking

2. **Reporting API**
   - Create endpoints for generating reports
   - Implement data aggregation services
   - Add filtering and date range selection
   - Create export functionality for reports

3. **Analytics Dashboard**
   - Build dashboard layout with responsive design
   - Create summary statistics components
   - Implement date range selector
   - Add export functionality for dashboard data

4. **Data Visualization**
   - Implement chart components using D3.js or Chart.js
   - Create booking trends visualization
   - Build occupancy rate charts
   - Add user activity graphs

5. **Heatmap Visualization**
   - Create heatmap component for workspace usage
   - Implement color gradient for usage intensity
   - Add time-based filtering for heatmap
   - Create export functionality for heatmap data

**Verification Checklist**:
- [ ] Usage events are properly tracked and stored
- [ ] Reports generate accurate data based on usage
- [ ] Dashboard displays analytics data clearly
- [ ] Charts render correctly with real data
- [ ] Heatmap accurately represents workspace usage

## Phase 7: Advanced Features

**Goal**: Enhance application with AI and gamification.

**Current State**: Analytics system implemented

**Implementation Steps**:
1. **AI Recommendation Engine**
   ```bash
   cd server
   npm install @tensorflow/tfjs-node
   ```
   - Create user preference model
   - Implement collaborative filtering algorithm
   - Build workspace recommendation service
   - Add recommendation UI components

2. **Streak Tracking**
   - Create streak calculation service
   - Implement streak persistence
   - Add streak visualization components
   - Create streak-based notifications

3. **Rewards System**
   - Define reward types and criteria
   - Implement reward earning logic
   - Create reward redemption flow
   - Build rewards dashboard UI

4. **Responsive Design**
   - Implement mobile-first design approach
   - Create responsive layouts for all components
   - Add touch interactions for mobile
   - Optimize images and assets for different devices

5. **Theme System**
   - Create theme context provider
   - Implement dark/light mode toggle
   - Build theme-aware components
   - Add user theme preference persistence

**Verification Checklist**:
- [ ] Recommendations are relevant to user's history
- [ ] Streaks are correctly tracked and maintained
- [ ] Rewards are properly awarded based on activity
- [ ] Application works well on all device sizes
- [ ] Theme switching works correctly

## Phase 8: Testing & Deployment

**Goal**: Ensure production-ready application with comprehensive testing.

**Current State**: Advanced features implemented

**Implementation Steps**:
1. **Unit Testing**
   ```bash
   cd server
   npm install jest @nestjs/testing supertest
   ```
   - Create test configuration
   - Write unit tests for services
   - Implement controller tests
   - Add utility function tests

2. **Integration Testing**
   - Create test database setup
   - Implement API endpoint tests
   - Add authentication flow tests
   - Create end-to-end workflow tests

3. **Deployment Pipeline**
   - Create Dockerfiles for client and server
   - Set up GitHub Actions workflows
   - Implement staging and production environments
   - Add deployment verification steps

4. **Monitoring & Logging**
   ```bash
   cd server
   npm install winston nest-winston
   ```
   - Implement structured logging
   - Set up error tracking
   - Create performance monitoring
   - Add alerting for critical issues

5. **Security Audit**
   - Perform dependency vulnerability scan
   - Implement security headers
   - Add rate limiting for API endpoints
   - Create security documentation

**Verification Checklist**:
- [ ] All tests pass successfully
- [ ] Application builds and deploys automatically
- [ ] Logging captures relevant application events
- [ ] Monitoring alerts on system issues
- [ ] Security audit passes with no critical issues

## Maintenance and Future Enhancements

**Current State**: Application successfully deployed

**Implementation Steps**:
1. **Database Backups**
   - Set up automated daily backups
   - Implement backup verification
   - Create restore procedures
   - Document backup strategy

2. **User Feedback System**
   - Create feedback collection UI
   - Implement feedback analysis
   - Set up feature request tracking
   - Create feedback reporting dashboard

3. **Feature Planning**
   - Prioritize enhancement requests
   - Create feature roadmap
   - Implement A/B testing framework
   - Set up feature flag system

4. **Security Maintenance**
   - Schedule regular security audits
   - Implement automated dependency updates
   - Create security incident response plan
   - Document security procedures

5. **Performance Optimization**
   - Implement performance monitoring
   - Create optimization backlog
   - Set up performance benchmarking
   - Document optimization strategies

**Verification Checklist**:
- [ ] Backup system is reliable and tested
- [ ] User feedback is collected and analyzed
- [ ] Feature planning process is documented
- [ ] Security maintenance schedule is established
- [ ] Performance optimization plan is in place

---

## Progress Tracking

| Phase | Status | Completion Date | Notes |
|-------|--------|-----------------|-------|
| 1. Foundation Setup | Not Started | | |
| 2. User Authentication | Not Started | | |
| 3. Workspace Management | Not Started | | |
| 4. Booking System | Not Started | | |
| 5. Notifications | Not Started | | |
| 6. Analytics & Reporting | Not Started | | |
| 7. Advanced Features | Not Started | | |
| 8. Testing & Deployment | Not Started | | | 