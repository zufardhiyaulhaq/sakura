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
 *           example: foo
 *         image_path:
 *           type: string
 *           example: foo
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
 *           example: foo
 *         position:
 *           type: string
 *           example: bar
 *         company:
 *           type: string
 *           example: foo
 *         title:
 *           type: string
 *           example: bar
 *         image_path:
 *           type: string
 *           example: foo
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
 *           example: foo
 *         image_path:
 *           type: string
 *           example: foo
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
 *          example: bar
 *        date:
 *          type: string
 *          example: foo
 *        time:
 *          type: string
 *          example: foo
 *        place:
 *          type: string
 *          example: bar
 *        registration_url:
 *          type: string
 *          example: foo
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
 *          example: bar
 *        font_family:
 *          type: string
 *          example: foo
 *        colour_combination:
 *          type: string
 *          example: foo
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
