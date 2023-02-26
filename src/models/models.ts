import { load } from "js-yaml";
import { readFileSync } from "fs";

/**
 * @openapi
 * components:
 *   schemas:
 *     Sponsor:
 *       required:
 *       - image_path
 *       - name
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           example: Istio
 *         image_path:
 *           type: string
 *           example: https://istio.io/v1.12/img/istio-whitelogo-bluebackground-framed.svg
 */
export interface MeetupSponsor {
  name: string;
  image_path: string;
}

/**
 * @openapi
 * components:
 *   schemas:
 *     Speaker:
 *       required:
 *       - company
 *       - image_path
 *       - name
 *       - position
 *       - title
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           example: Dina Setyo
 *         position:
 *           type: string
 *           example: Cloud Platform Engineer
 *         company:
 *           type: string
 *           example: Gojek
 *         title:
 *           type: string
 *           example: Building Developer Experience 101
 *         image_path:
 *           type: string
 *           example: https://cdn.idntimes.com/content-images/post/20200317/5-c732fe8f39e5683aeb3a01b272e1851e.jpg
 */
export interface MeetupSpeaker {
  name: string;
  position: string;
  company: string;
  title: string;
  image_path: string;
}

/**
 * @openapi
 * components:
 *   schemas:
 *     Organizer:
 *       required:
 *       - image_path
 *       - name
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           example: Cloud Native Indonesia
 *         image_path:
 *           type: string
 *           example: https://istio.io/v1.12/img/istio-whitelogo-bluebackground-framed.svg
 */
export interface MeetupOrganizer {
  name: string;
  image_path: string;
}

/**
 * @openapi
 * components:
 *   schemas:
 *    Meetup:
 *      required:
 *      - name
 *      - date
 *      - time
 *      - place
 *      - registration_url
 *      - speakers
 *      - organizers
 *      - sponsors
 *      type: object
 *      properties:
 *        name:
 *          type: string
 *          example: Kubernetes Cloud Native Online Meetup February 2022
 *        date:
 *          type: string
 *          example: 24 February 2022
 *        time:
 *          type: string
 *          example: 19:00 WIB
 *        place:
 *          type: string
 *          example: Youtube
 *        registration_url:
 *          type: string
 *          example: online.kubernetescommunity.id
 *        sponsors:
 *          type: array
 *          items:
 *            $ref: '#/components/schemas/Sponsor'
 *        speakers:
 *          type: array
 *          items:
 *            $ref: '#/components/schemas/Speaker'
 *        organizers:
 *          type: array
 *          items:
 *            $ref: '#/components/schemas/Organizer'
 */
export interface MeetupConfig {
  name: string;
  date: string;
  time: string;
  place: string;
  registration_url: string;
  sponsors: MeetupSponsor[];
  speakers: MeetupSpeaker[];
  organizers: MeetupOrganizer[];
}

/**
 * @openapi
 * components:
 *   schemas:
 *    v1GenerateRequest:
 *      required:
 *      - meetup
 *      - canvas_type
 *      - font_family
 *      - colour_combination
 *      type: object
 *      properties:
 *        canvas_type:
 *          type: string
 *          example: flayer_potrait
 *        font_family:
 *          type: string
 *          example: opensans
 *        colour_combination:
 *          type: string
 *          example: teal
 *        meetup:
 *          type: object
 *          $ref: '#/components/schemas/Meetup'
 */
export interface v1GenerateRequest {
  meetup: MeetupConfig;
  canvas_type: string;
  font_family: string;
  colour_combination: string;
}

/**
 * @openapi
 * components:
 *   schemas:
 *    v1GenerateResponse:
 *      required:
 *      - image_url
 *      type: object
 *      properties:
 *        image_url:
 *          type: string
 *          example: bar
 */
export interface v1GenerateResponse {
  image_url: string;
  response_code: number;
  error_message: string;
}

export const getMeetupConfig = function (configPath: string): MeetupConfig {
  let config: MeetupConfig;

  try {
    config = load(readFileSync(configPath, "utf8")) as MeetupConfig;
    validateMeetupConfig(config);
  } catch (e) {
    console.log(e);
    process.exit(1);
  }

  return config;
};

const validateMeetupConfig = function (config: MeetupConfig) {
  if (!config.speakers) {
    throw "Please fill the speakers";
  }

  if (config.speakers.length === 0) {
    throw "Please fill the speakers";
  }

  if (!config.organizers) {
    throw "Please fill the organizers";
  }

  if (config.organizers.length === 0) {
    throw "Please fill the organizers";
  }
};
