# Gecko product glossary

Product terms used by Gecko applications in this monorepo. Component selection, APIs and composition are documented in the [@geckolabs/elements usage guide](packages/ui/README.md) and its component contracts.

## Language

**Conversation**:
A transcript between one or more administrators and a customer. Conversations appear in the administrator Inbox and the customer-facing live chat widget.

**Administrator**:
An organisation-side participant in a conversation. An administrator may be a human agent or a bot.

**Agent**:
A human live-chat operator acting on behalf of the organisation.

**Bot**:
An automated chat responder acting on behalf of the organisation.

**Customer**:
The end-user participant, such as a potential student contacting the organisation through email, the live chat widget, WhatsApp or Facebook.

**Note**:
An internal message added by an agent to a conversation. Notes are visible only to administrators and never to customers.

**System message**:
An internal conversation update about an event such as an assignment change. System messages remain part of the administrator transcript and are never visible to customers.

**Inbox**:
The desktop workspace where administrators find, assign and respond to conversations and review contact details, activity, tasks, labels, notes and events. Conversation views include My conversations, Unassigned, Open, Closed, Sent, Assigned to bot and Undelivered.

**Live chat widget**:
The customer-facing chat interface embedded on an organisation's website.

**Chat head list**:
The Inbox conversation list from which an administrator selects the active conversation.

**Channel**:
The communication route for a conversation, such as email or live chat. Channel switching is an administrator Inbox workflow; channel availability and delivery rules belong to the product.

**Turn**:
A consecutive run of messages from one sender. A new turn starts when the sender changes.
