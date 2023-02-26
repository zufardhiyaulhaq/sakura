import * as env from "env-var";

export enum ImageHosting {
  minio = "minio",
  github = "github",
}
export interface Settings {
  sakuraServerIP: string;
  sakuraServerPort: number;
  sakuraImageHosting: ImageHosting;
  sakuraMinioAccessKey: string;
  sakuraMinioSecretKey: string;
  sakuraMinioEndpoint: string;
  sakuraMinioPort: number;
  SakuraMinioBucket: string;
  SakuraGithubUsername: string;
  SakuraGithubToken: string;
  SakuraGithubRepository: string;
  SakuraGithubDirectory: string;
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
    .asEnum<ImageHosting>([ImageHosting.minio, ImageHosting.github]);

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

      settings.SakuraMinioBucket = env
      .get("SAKURA_MINIO_BUCKET")
      .required()
      .asString();
  }

  if (settings.sakuraImageHosting == ImageHosting.github) {
    settings.SakuraGithubUsername = env
      .get("SAKURA_GITHUB_USERNAME")
      .required()
      .asString();

    settings.SakuraGithubToken = env
      .get("SAKURA_GITHUB_TOKEN")
      .required()
      .asString();

      settings.SakuraGithubRepository = env
      .get("SAKURA_GITHUB_REPOSITORY")
      .required()
      .asString();

      settings.SakuraGithubDirectory = env
      .get("SAKURA_GITHUB_DIRECTORY")
      .required()
      .asString();
  }

  return settings;
};
