import { SetMetadata } from "@nestjs/common";

export const PLUGIN_KEY = "plugin_key";
export const RequirePlugin = (pluginKey: string) => SetMetadata(PLUGIN_KEY, pluginKey);
