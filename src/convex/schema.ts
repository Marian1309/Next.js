import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

const schema = defineSchema({
  users: defineTable({
    id: v.id('user'),
    name: v.string()
  })
});

export default schema;
