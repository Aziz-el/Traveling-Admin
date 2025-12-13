import instance from "../../../../shared/lib/axios/axios";
import { ApiReview, ReviewsResponse } from "../types";

export const fetchReviews = async (): Promise<ReviewsResponse> => {
  const res = await instance.get<ReviewsResponse>("/reviews");
  return res.data;
};

export const createReview = async (payload: Partial<ApiReview>): Promise<ApiReview> => {
  const res = await instance.post<ApiReview>("/reviews", payload);
  return res.data;
};

export const updateReview = async (id: string, payload: Partial<ApiReview>): Promise<ApiReview> => {
  const res = await instance.patch<ApiReview>(`/reviews/${id}`, payload);
  return res.data;
};

export const deleteReview = async (id: string): Promise<void> => {
  await instance.delete(`/reviews/${id}`);
};

export default { fetchReviews, createReview, updateReview, deleteReview };
