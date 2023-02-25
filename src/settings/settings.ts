import * as env from "env-var";

export enum ImageHosting {
  minio = "minio",
}
export interface Settings {
  sakuraServerIP: string;
  sakuraServerPort: number;
  sakuraImageHosting: ImageHosting;
  sakuraMinioAccessKey: string;
  sakuraMinioSecretKey: string;
  sakuraMinioEndpoint: string;
  sakuraMinioPort: number;
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
    .asEnum<ImageHosting>([ImageHosting.minio]);

  if (settings.sakuraImageHosting == ImageHosting.minio) {
    settings.sakuraMinioAccessKey = env
      .get("SAKURA_MINIO_ACCESS_KEY")
      .required()
      .asString();

      settings.sakuraMinioAccessKey = env
      .get("SAKURA_MINIO_SECRET_KEY")
      .required()
      .asString();

      settings.sakuraMinioEndpoint = env
      .get("SAKURA_MINIO_ENDPOINT")
      .required()
      .asString();

      settings.sakuraMinioPort = env
      .get("SAKURA_MINIO_PORT")
      .required()
      .asPortNumber();
  }

  return settings;
};
