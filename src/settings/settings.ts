import * as env from "env-var";

export enum ImageHosting {
  freeImageHost = "freeimagehost",
  minio = "minio",
}
export interface Settings {
  sakuraServerIP: string;
  sakuraServerPort: number;
  sakuraImageHosting: ImageHosting;
  sakuraFreeImageHostAPIKey: string;
}

export const getSettings = function (): Settings {
  var settings = <Settings>{};
  settings.sakuraServerIP = env
    .get("SAKURA_SERVER_IP")
    .required()
    .default("0.0.0.0")
    .asString();
  settings.sakuraServerPort = env
    .get("SAKURA_SERVER_PORT")
    .required()
    .default(3000)
    .asIntPositive();
  settings.sakuraImageHosting = env
    .get("SAKURA_IMAGE_HOSTING")
    .required()
    .asEnum<ImageHosting>([ImageHosting.freeImageHost, ImageHosting.minio]);

  if (settings.sakuraImageHosting == ImageHosting.freeImageHost) {
    settings.sakuraFreeImageHostAPIKey = env
      .get("SAKURA_FREE_IMAGE_HOST_API_KEY")
      .required()
      .asString();
  }

  return settings;
};
