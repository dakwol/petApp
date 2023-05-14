import {Platform} from "react-native";
import RNFS from "react-native-fs";
// @ts-ignore
import RNVideoHelper from "react-native-video-helper";
import {FFmpegKit, FFmpegKitConfig, ReturnCode} from "ffmpeg-kit-react-native";
import {SCREEN_WIDTH} from "../components/External/Post/constants/dimensions";

export const compressVideo = async (lib: any, videoUri:string, quality?:string, endTime?:number) => {
    switch(lib) {
        case "ffm": {
            return await compressVideoFFM(videoUri, quality, endTime);
        }
        case "rnv": {
            return await compressVideoRNH(videoUri, quality, endTime);
        }
    }

}

export const compressVideoFFM = async (videoUri:string, quality?:string, endTime?:number) => {
    const errorResponse = {
        success: false,
        message: {
            title: `Oops!`, message: `Can't compress selected file`,
            error: "Zscale failed. Please check logs for the details"
        }
    }
    try {
        //Ffmpeg start
        let crop_levels: any = {
            low: 18,
            medium: 23,
            high: 28
        }
        let str_for_ffmpeg_command = "";
        if (quality) {
            str_for_ffmpeg_command = '-crf ' + crop_levels[quality];
        } else {
            str_for_ffmpeg_command = '-crf ' + crop_levels['medium'];
        }

        //hardcode the quality
        str_for_ffmpeg_command = '-crf 28';

        if (endTime) {
            let hhmmss = new Date(endTime * 1000).toISOString().slice(11, 19);
            str_for_ffmpeg_command += ' -to ' + hhmmss;
        }

        let rndm_name = parseInt(String(Math.random() * 10000000));
        //let newSource =  `${RNFS.ExternalDirectoryPath}/video.zscaled_new${rndm_name}.mp4`;

        let newSource = "";
        let newVideoUri = videoUri;
        if (Platform.OS === "android") {
            newSource = `${RNFS.ExternalDirectoryPath}/video.zscaled_new${rndm_name}.mp4`;
            //newVideoUri = videoUri;
        } else {
            newSource = `${RNFS.DocumentDirectoryPath}/video.zscaled_new${rndm_name}.mp4`;
            //newVideoUri = "file:"+videoUri;
        }

        //let fullcommand = `-i "${videoUri}"  -c:v libx264 -preset ultrafast  ${str_for_ffmpeg_command} -c:a copy  ${newSource}`;
        //let fullcommand = `-i "${newVideoUri}"  -c:v libx264 -preset ultrafast  ${str_for_ffmpeg_command} -c:a aac  ${newSource}`;

        let fullcommand = `-i "${newVideoUri}"  -vf "scale=-2:720, fps=30" -vsync 0 -c:v h264 ${str_for_ffmpeg_command} -c:a aac  ${newSource}`;

        console.log('FFMPEG: FULLCOMMAND = ' + fullcommand);
        const session = await FFmpegKit.execute(fullcommand).then(
            (result) => {
                return result;
            },
        );
        const state = FFmpegKitConfig.sessionStateToString(await session.getState());
        const returnCode = await session.getReturnCode();
        const failStackTrace = await session.getFailStackTrace();
        console.log(`FFmpeg process exited with state ${state}`);

        if (ReturnCode.isSuccess(returnCode)) {
            console.log("zscale completed successfully.");
            if (Platform.OS === "android" && !newSource.includes("file:///")) {
                newSource = `file://${newSource}`;
            }
            return {
                success: true,
                fileInfo: {
                    type: "video",
                    fullSize: false,
                    uri: newSource,
                    width: SCREEN_WIDTH,
                    height: SCREEN_WIDTH,
                }
            }
        }
        return {...errorResponse}
    } catch (e) {
        return {...errorResponse}
    }
}

export const compressVideoRNH = async (videoUri:string, quality?:string, endTime?:number)  => {
    try {
        let vr = await RNVideoHelper.compress(videoUri, {
            startTime: 0,
            endTime: endTime,
            quality: quality ? quality : "medium",
            defaultOrientation: 0,
        });
        if (Platform.OS === "android" && !vr.includes("file:///")) {
            vr = `file://${vr}`;
        }
        return {
            success:true,
            fileInfo: {
                type: "video",
                fullSize: false,
                uri: vr,
                width: SCREEN_WIDTH,
                height: SCREEN_WIDTH,
            }
        };
    } catch (e) {
        return {
            success: false,
            message: {
                title: `Oops!`, message: `Can't compress selected file`,
                error: "Zscale failed. Please check logs for the details"
            }
        }
    }


}
