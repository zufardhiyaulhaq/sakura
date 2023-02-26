import { Octokit } from "@octokit/rest";
import { ImageService, ImageObjectInformation } from "./interface";

export interface GithubClientConfiguration {
  token: string;
}

export interface GithubConfiguration {
    username: string;
    repository: string;
    directory: string;
  }

export let NewGithubClient = function (
  configuration: GithubClientConfiguration
): Octokit {
  return new Octokit({
    auth: configuration.token,
  });
};

export class GithubImageService implements ImageService {
  client: Octokit;
  configuration: GithubConfiguration;

  constructor(client: Octokit, configuration: GithubConfiguration) {
    this.client = client
    this.configuration = configuration;
  }

  async upload(image: Buffer,  name: string): Promise<ImageObjectInformation> {
    const { data } = await this.client.repos.createOrUpdateFileContents({
        owner: this.configuration.username,
        repo: this.configuration.repository,
        path: `${this.configuration.directory}/${name}`,
        message: `sakura: Added ${name}`,
        content: image.toString("base64"),
      });

    return {
      url: data.content.download_url
    };
  }
}
