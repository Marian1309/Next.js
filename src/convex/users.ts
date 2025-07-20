import { query } from './_generated/server';

export const getUsers = query({
  args: {},
  handler: async (ctx) => await ctx.db.query('users').collect()
});
