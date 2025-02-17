import { env } from "@/config/env";
import Mux from "@mux/mux-node";

export const mux = new Mux({
  tokenId: env.MUX_ACCESS_TOKEN_ID,
  tokenSecret: env.MUX_SECRET_KEY,
});
