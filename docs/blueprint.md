# **App Name**: StudyHub

## Core Features:

- Virtual Study Rooms: Video/audio rooms for collaborative study sessions.
- Integrated Pomodoro Timer: Synchronized Pomodoro timer to structure study sessions. The timer is global and continuous, with time adjustments restricted to admins.
- Shared Task Lists: Create and share task lists to achieve group goals.
- Peer Chat: Dedicated chat for communication between study group members, with realtime user status (online/offline, last seen).
- Leaderboard: Display a leaderboard of the most active and successful study group members.
- Admin Panel: Administrative interface for managing users, content, and settings.
- Reporting: Users can report inappropriate content or behavior to admins.
- User Profiles: Users can edit their names and upload profile pictures.
- Screen Share: Implement a Screen Share button using the getDisplayMedia() API. Handle the WebRTC signaling (exchanging SDP offers, answers, and ICE candidates) using Cloudflare D1.  Create a SQL table schema named signaling_messages to store the session_id, type (offer/answer/candidate), and payload.  Implement functions to INSERT signaling data into D1 when a user starts sharing.  Implement a polling mechanism (e.g., setInterval) to check the D1 table for new signals from the other peer to complete the connection.
- Video Calling: Implement video calling using Cloudflare Calls (Realtime SFU). Backend (Worker): Create a Cloudflare Worker that uses the Cloudflare Calls API to create sessions. Signaling: Store session IDs and track information in Cloudflare D1. (Note: We will use polling every 2 seconds to check D1 for new tracks since we aren't using WebSockets). Frontend: Use the browser's standard RTCPeerConnection. Logic: Instead of connecting users directly to each other (P2P), connect each user to the Cloudflare App ID provided in the worker. When User A adds a track (video), send the track_id to D1. User B polls D1, sees the new track_id, and requests to "pull" that track from Cloudflare.

## Style Guidelines:

- Primary color: Soft blue (#77B5FE) to create a calming and focused environment. Its light saturation and medium brightness keeps the focus on utility over styling.
- Background color: Very light desaturated blue (#EAF3FE), visibly the same hue as the primary color, creates a relaxing ambiance.
- Accent color: Pale green (#AEE19B), analogous to the blue and in line with the user's request, for a soft, inviting touch, set apart by different saturation and brightness values.
- Body and headline font: 'PT Sans' for a modern yet approachable feel. It's readable in various sizes, ensuring a comfortable reading experience for long study sessions.
- Use simple, minimalist icons in a soft blue or green to represent different study tools and features.
- Clean and intuitive layout with easy navigation. Prioritize a clutter-free interface to reduce distractions.
- Subtle animations for task completion and timer notifications. Aim for gentle and unobtrusive feedback.
- Incorporate liquid glass-like UI elements to provide a modern and visually appealing user experience, ensuring clarity and readability.