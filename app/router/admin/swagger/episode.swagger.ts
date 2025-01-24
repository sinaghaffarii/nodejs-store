/**
 * @swagger
 *  components:
 *      schemas:
 *        AddEpisode:
 *          type: object
 *          required:
 *              -   courseID
 *              -   chapterID
 *              -   title
 *              -   text
 *              -   type
 *              -   video
 *          properties:
 *              courseID:
 *                type: string
 *                example: "6786885c230fbd2d0d1be9a1"
 *              chapterID:
 *                type: string
 *                example: "679157a76099eccea2e2f21e"
 *              title:
 *                type: string
 *                description: the title about this chapter
 *                example: "ویدیو شماره یک : متغیرها"
 *              text:
 *                type: string
 *                description: the text about this chapter
 *                example: "توی این قسمت به طور کامل در رابطه با متغیر ها صحبت شده است"
 *              type:
 *                type: string
 *                description: the episode type (unlock 0r lock)
 *                enum:
 *                  -   unlock
 *                  -   lock
 *              video:
 *                description: the file of video
 *                type: string
 *                format: binary
 *        EditEpisode:
 *          type: object
 *          properties:
 *              title:
 *                type: string
 *                description: the title about this chapter
 *                example: "ویدیو شماره یک : متغیرها"
 *              text:
 *                type: string
 *                description: the text about this chapter
 *                example: "توی این قسمت به طور کامل در رابطه با متغیر ها صحبت شده است"
 *              type:
 *                type: string
 *                description: the episode type (unlock 0r lock)
 *                enum:
 *                  -   unlock
 *                  -   lock
 *              video:
 *                description: the file of video
 *                type: string
 *                format: binary
 */

/**
 * @swagger
 *  /admin/episode/add:
 *      post:
 *          tags: [Episode(AdminPanel)]
 *          summary: create new episode for courses
 *          requestBody:
 *              required: true
 *              content:
 *                      multipart/form-data:
 *                          schema:
 *                              $ref: '#/components/schemas/AddEpisode'
 *          responses:
 *              201:
 *                  description: success
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/publicDefinition'
 */
/**
 * @swagger
 *  /admin/episode/edit/{episodeID}:
 *      patch:
 *          tags: [Episode(AdminPanel)]
 *          summary: edit episode for courses
 *          parameters:
 *              -   in: path
 *                  name: episodeID
 *                  schema:
 *                    type: string
 *                  required: true
 *          requestBody:
 *              required: true
 *              content:
 *                      multipart/form-data:
 *                          schema:
 *                              $ref: '#/components/schemas/EditEpisode'
 *          responses:
 *              201:
 *                  description: success
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/publicDefinition'
 */

/**
 * @swagger
 *  /admin/episode/remove/{episodeID}:
 *      delete:
 *          tags: [Episode(AdminPanel)]
 *          summary: remove episode for courses
 *          parameters:
 *              -   in: path
 *                  name: episodeID
 *                  schema:
 *                    type: string
 *                  required: true
 *          responses:
 *              200:
 *                  description: success
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/publicDefinition'
 */
