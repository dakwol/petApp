import { PostImage, ProcessedImage } from "../types";
import { updateEvent } from "../../../../api/events/updateEvent/updateEvent";
import { getFormData, getMediaForm } from "../../../../utils/formData";
import { createEvent } from "../../../../api/events/createEvent/createEvent";
import { useState } from "react";
import { errorMessage } from "../../../../utils/showMessage";
import { getTranslateMessage, translate } from "../../../../utils/translate";
import { Dictionary } from "../../../../locales/dictionary";
import { showMessage } from "react-native-flash-message";
import { addEventMediaMultiply } from "../../../../api/events/addEventMediaMultiply/addEventMediaMultiply";

import { Platform } from "react-native";
import { addStories } from "../../../../api/user/addStories/addStories";
import { addServiceMedia } from "../../../../api/serviceMedia/addServiceMedia/addServiceMedia";

export function useCreatorActions(mode = "post") {

    async function uploadPost(processedImages: ProcessedImage[], details: string) {

        //console.log('Upload Start!');

        const imageList = [...processedImages];

        const tasks: Promise<PostImage>[] = imageList.map(async (img) => {
            // Here, upload Images to cloud storage such as S3
            // for now, use local path instead of downloadUri
            const file: PostImage = {
                uri: img.uri,
                width: img.width,
                height: img.height,
                extension: img.extension,
                fullSize: img.fullSize,
                type: img.type,
            };

            return file;
        });
        if (mode == "stories") {
            let storiesForm = new FormData();
            storiesForm = getMediaForm(storiesForm, imageList);
            imageList.map((item, index) => {
                storiesForm.append(`descriptions[${index}]`, details);
            });
            await addStories(storiesForm);
            return
        }
        if (mode == "service") {
            let serviceData = new FormData();
            serviceData = getMediaForm(serviceData, imageList);
            imageList.map((servItem: any, index: any) => {
                serviceData.append(`comments[${index}]`, details)
            })
            const responce = await addServiceMedia(serviceData)
            if (responce.data.status != 'success') {
                errorMessage({
                    message: translate(Dictionary.errors.unknownError),
                });
            }
            return
        }
        if (mode == "post") {
            await Promise.all(tasks)
                .then((images) => {
                    const post = createPostObject(images, details);
                    return post;
                })
                .then((postData) => {
                    const fieldsData = {
                        evt_topic: 'a',
                        description: details,
                        type: 2,
                        evt_ctgy_id: 999,
                        evt_address: 'a',
                        evt_lat: 1,
                        evt_long: 1,
                        evt_images: [],
                        evt_priority: 1,
                        is_emergency: 0,
                        evt_status: 1,
                    }
                    return createEvent(getFormData(fieldsData));

                })
                .then((postImg) => {
                    let mediaForm = new FormData();
                    mediaForm.append('event_id', postImg.data);
                    mediaForm = getMediaForm(mediaForm, imageList);
                    return addEventMediaMultiply(mediaForm);
                })
            return
        }
    }

    function createPostObject(images: PostImage[], details: string): any {
        // Here, include other info such as user id
        const post = {
            source: images,
            details: details
        }
        return post;
    }


    return { uploadPost };
}
