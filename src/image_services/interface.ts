export interface ImageService {
  client: any;
  configuration: any;
  upload(image: Buffer, name: string): Promise<ImageObjectInformation>;
}

export interface ImageObjectInformation {
  url: string;
}


