/**
 * Guestbook copy. Source: content.md §11.
 *
 * Fully anonymous: no name field, no login, nothing tracked back to a sender.
 * Every message reaches Aidam; he approves what becomes public. The
 * confirmation says exactly that rather than faking a "Posted!" — the honesty
 * is the point, and a visitor who is told the truth is more likely to write
 * something worth reading.
 *
 * The behaviour these strings describe lands in M6.
 */

export const GUESTBOOK = {
  heading: "Leave an anonymous message",
  intro:
    "No name, no login, nothing tracked back to you. Ask me something, tell me something, be honest. I read everything and pick what gets posted here.",

  fieldLabel: "Your message",
  placeholder: "Say anything",
  maxLength: 500,
  /** Rendered as "123 / 500". */
  counterSuffix: "/ 500",

  submit: "Send",
  /** Shown after a successful submit. Not a fake "posted!". */
  sent: "Sent. I read all of these. If it goes up, it goes up here.",

  emptyWall: "Nothing posted yet. Be the first.",
  error: "Couldn't send that. Check your connection and try again.",
  rateLimited: "That's a few too many for one hour. Try again later.",
  tooLong: "That's over 500 characters. Trim it and try again.",
  empty: "Nothing to send yet.",

  wallHeading: "Posted",
  /**
   * Posted messages carry a date and nothing else, because there is no
   * attribution to show. Do not add one.
   */
  wallNote: "Messages show a date and nothing else. There is nothing else.",
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
