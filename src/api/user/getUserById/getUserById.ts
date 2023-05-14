import {API_BASE_URL, apiCall} from '../../api';
import {API_USERS_MODEL} from "../const";
import {IReview} from "../../../types";

export const getUserById = async (payload: any) => {
    const methodUrl = [API_USERS_MODEL.url,API_USERS_MODEL.methods.getUserById.url].join('/');
    const resp = await apiCall('post', API_BASE_URL + methodUrl, payload);

    if(resp && resp.data.status && resp.data.user) {
        let dataUser = resp.data.user;
        dataUser.reviewStat = {
            5:0,
            4:0,
            3:0,
            2:0,
            1:0
        };
        let reviewsRateSum = 0;
        if(dataUser.reviews.length > 0) {
            dataUser.reviews.map ( (review:IReview) => {
                dataUser.reviewStat[review.review_rate]++;
                reviewsRateSum += review.review_rate;
                review.stars = [];
                for (let i = 1; i < 6; i++) {
                    review.stars.push((review.review_rate != null && Math.round(review.review_rate) >= i) ? 1 : 0);
                }
            });
            dataUser.review_rate = (reviewsRateSum / dataUser.reviews.length).toFixed(1);
        }

        dataUser.stars = [];
        for (let i = 1; i < 6; i++) {
            dataUser.stars.push((dataUser.review_rate != null && Math.round(parseFloat(dataUser.review_rate)) >= i) ? 1 : 0);
        }

        return dataUser;
    } else {
        return {};
    }
};
