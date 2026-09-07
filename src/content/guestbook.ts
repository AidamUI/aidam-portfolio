/**
 * Guestbook copy. Source: content.md §11.
 *
 * Fully anonymous: no name field, no login, nothing tracked back to a
 * sender. Every message reaches Aidam; he approves what becomes public
 * before it's posted. Lands in M6.
 */

export const GUESTBOOK = {
  heading: "Leave an anonymous message",
  intro: "Anonymous. I review messages before they're posted.",

  fieldLabel: "Your message",
  placeholder: "Say anything",
  maxLength: 500,
  /** Rendered as "123 / 500". */
  counterSuffix: "/ 500",

  submit: "Send",
  sent: "Sent. I'll review it before it's posted.",

  emptyWall: "Nothing posted yet.",
  error: "Couldn't send that. Check your connection and try again.",
  rateLimited: "Too many messages this hour. Try again later.",
  tooLong: "That's over 500 characters. Trim it and try again.",
  empty: "Nothing to send yet.",
  /** Shown when the guestbook has no database behind it yet. */
  unavailable: "The guestbook isn't taking messages yet.",

  wallHeading: "Posted",
  /**
   * Posted messages carry a date and nothing else, because there is no
   * attribution to show. Do not add one.
   */
  wallNote: "Messages show a date only.",
} as const;

/** Admin queue at /guestbook/admin, gated by a secret. M6. */
export const GUESTBOOK_ADMIN = {
  heading: "Message queue",
  approve: "Approve",
  reject: "Reject",
  remove: "Delete",
  emptyQueue: "Nothing pending.",
  statusLabels: {
    pending: "Pending",
    approved: "Approved",
    rejected: "Rejected",
  },
} as const;
