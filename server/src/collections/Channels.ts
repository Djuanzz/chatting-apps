import { CollectionConfig } from "payload/types";

const Channels: CollectionConfig = {
  slug: "channels",
  admin: {
    useAsTitle: "name",
  },
  access: {
    create: () => true,
    read: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "description",
      type: "textarea",
      required: true,
    },
    {
      name: "member",
      type: "relationship",
      relationTo: "users",
      hasMany: true,
    },
  ],
};

export default Channels;
