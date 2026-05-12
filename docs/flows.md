# flows.md

# Primary User Flows

---

# 1. Quick Note Capture

Goal:
Capture thoughts quickly without interrupting gameplay.

Flow:
1. User lands on Home
2. User taps Quick Note
3. User writes freely
4. Save button appears
5. User taps Save
6. Note is saved as an Entry
7. Confirmation appears

Rules:
- Quick Note is temporary until saved
- V1 does not rely on autosave
- unsaved state must be visible
- destructive exits should warn gently

---

# 2. Expand Quick Note

Goal:
Turn a quick capture into a full note.

Flow:
1. User writes in Quick Note
2. User taps Expand
3. Full-screen editor opens
4. Existing Quick Note content is preserved
5. User may add title and craft sections
6. User saves entry

Rules:
- expansion should feel like the same note breathing wider
- do not reset content
- do not force folder selection before writing

---

# 3. Insert Craft Section

Goal:
Add optional craft-specific structure without turning note into a form.

Trigger:
- user taps Add Detail
- OR future contextual suggestion appears

V1 section options:
- Ingredients
- Use
- Details
- Checklist
- Tips

Flow:
1. User taps Add Detail
2. Minimal bottom sheet appears
3. User chooses section
4. Section inserts inline
5. Keyboard remains active if possible

Rules:
- sections are optional
- no mandatory fields
- no database-like behavior

---

# 4. Search

Goal:
Retrieve memory quickly.

Flow:
1. User taps Search on Home
2. Full-screen Search opens
3. Input autofocuses
4. Keyboard opens
5. Results update as user types
6. User taps result to open entry

Prioritization:
1. pinned entries
2. exact title matches
3. ingredient matches
4. body matches
5. folder matches

---

# 5. View Pinned Notes

Goal:
See active references while playing.

Home:
- horizontal pinned preview cards
- two full cards visible
- half of the third card visible
- top-right View all action
- optional final View all card if more content exists

Pinned Board:
1. User taps Grid/View All in Pinned area
2. Pinned Board opens
3. Fixed preview cards are shown
4. User taps card to open full entry

Rules:
- no nested card scrolling in V1
- fixed preview only
- compact cards
- no large images inside pinned cards

---

# 6. Folder Page

Goal:
Browse worlds/folders and recent entries.

Flow:
1. User taps folder/book icon from top bar
2. Folder page opens
3. User sees folder list
4. User sees recent entries below folder list
5. User taps folder to view entries within that folder

Rules:
- folders only show folders
- no All Notes folder
- no Pinned folder
- no Unsorted folder
- folder list max 5 before View All

---

# 7. Create Folder

Goal:
Create a lightweight world/context.

Flow:
1. User opens Folder page
2. User taps New Folder
3. User enters folder name
4. Optional: user uploads folder image
5. User taps Create

Rules:
- image is optional
- do not block creation if no image is uploaded
- default placeholder may use initials or simple icon

---

# 8. Edit Folder Image

Goal:
Let users personalize folders for easier recognition.

Flow:
1. User taps ellipsis on folder row
2. User selects Change image
3. User uploads image
4. Image appears as small square thumbnail beside folder title

Actions:
- Rename
- Change image
- Remove image
- Delete folder

---

# 9. Account Screen

Goal:
Give users profile, stats, plan, support, and settings.

Flow:
1. User taps avatar on top right
2. Account screen opens
3. User can edit profile/avatar
4. User can view stats
5. User can upgrade
6. User can support via Ko-fi
7. User can manage preferences/data/about

Sections:
- Profile
- Stats
- Plan
- Support
- Preferences
- Data
- About

---

# 10. Upgrade

Recommended V1:
- Free: 50 notes total
- Plus: one-time $5 early supporter unlock
- Plus unlocks unlimited notes and folders

Flow:
1. User reaches note limit OR opens Account
2. User sees calm upgrade prompt
3. User chooses upgrade
4. After successful payment, limit is removed

Rules:
- no aggressive paywall
- no interruption while writing unless limit requires it
- explain limit clearly

---

# 11. Choose Entry Icon

Goal:
Let users quickly identify notes without requiring images.

Flow:
1. User opens entry options or create/edit screen
2. User selects icon
3. User chooses from built-in pixel icons
4. User may later choose emoji or upload an image
5. Icon appears beside the note title or on pinned card

Rules:
- icon choice is optional
- default icon is Crafter / Default
- icons should remain small recognition aids
- do not turn icon selection into a large customization flow

---

# 12. Mascot Micro-Interaction

Goal:
Use the mascot to add warmth without visual noise.

Possible uses:
- loading screen idle loop
- writing state in Quick Note
- empty pinned state
- empty search state
- save confirmation

Rules:
- keep animation subtle
- do not block interaction
- do not overuse

---

# Living Document Rule

Update flows whenever:
- friction appears
- edge cases emerge
- user behavior changes
- product decisions change
