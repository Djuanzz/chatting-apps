import { CollectionConfig } from "payload/types";
import payload from "payload";

const Messages: CollectionConfig = {
  slug: "messages",
  admin: {
    useAsTitle: "content",
  },
  access: {
    create: () => true,
    read: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    {
      name: "owner",
      type: "relationship",
      relationTo: "users",
    },
    {
      name: "content",
      type: "text",
      required: true,
    },
    {
      name: "channel",
      type: "relationship",
      relationTo: "channels",
      required: true,
    },
  ],
};

export default Messages;
