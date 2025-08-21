import { useApiQuery, useApiMutation } from "./apiHooks";
import { useEffect } from "react";

// 알림 목록 불러오기
type NotificationQueryParams = {
  page: number;
  size?: number; // optional, default 10
};

export type NotificationItem = {
  notificationId: number;
  message: string;
  notificationType: string;
  isRead: boolean;
  referenceId: number;
};

export type NotificationListResponse = {
  isSuccess: boolean;
  code: string;
  message: string;
  result: {
    notificationList: NotificationItem[];
    listSize: number;
    totalPage: number;
    totalElements: number;
    isFirst: boolean;
    isLast: boolean;
  };
  success: boolean;
};

// 알림 갯수 요청
export type NotificationCountResult = {
  total: number;
};

export type NotificationCountResponse = {
  isSuccess: boolean;
  code: string;
  message: string;
  result: NotificationCountResult;
  success: boolean;
};

// 알림 읽음 응답 타입
export type NotificationReadResult = {
  notificationId: number;
  message: string;
  isRead: boolean;
};

export type NotificationReadResponse = {
  isSuccess: boolean;
  code: string;
  message: string;
  result: NotificationReadResult;
  success: boolean;
};

// 알림 삭제 응답 타입
export type NotificationDeleteResult = {
  notificationId: number;
  message: string;
};

export type NotificationDeleteResponse = {
  isSuccess: boolean;
  code: string;
  message: string;
  result: NotificationDeleteResult;
  success: boolean;
};

// 알림 목록 요청
export const useNotificationList = ({ page, size = 10 }: NotificationQueryParams) =>
  useApiQuery<NotificationListResponse>({
    method: 'GET',
    endpoint: `${import.meta.env.VITE_API_NOTIFICATION_LIST_ENDPOINT}?page=${page}&size=${size}`,
  });

// 읽지 않은 알림 개수
export const useNotificationCount = () =>
  useApiQuery<NotificationCountResponse>({
    method: "GET",
    endpoint: `${import.meta.env.VITE_API_NOTIFICATION_SIZE_ENDPOINT}`,
  });

// ✅ SSE 알림 구독
export const useNotificationSSE = (onMessage: (event: MessageEvent) => void, lastEventId?: string) => {
  useEffect(() => {
    const headers: Record<string, string> = lastEventId
      ? { "Last-Event-ID": lastEventId }
      : {};

    const queryString = new URLSearchParams(headers).toString();
    const url = `${import.meta.env.VITE_API_NOTIFICATION_SSE_ENDPOINT}${queryString ? `?${queryString}` : ""}`;

    const eventSource = new EventSource(url, { withCredentials: true });

    eventSource.onmessage = onMessage;

    return () => {
      eventSource.close();
    };
  }, [onMessage, lastEventId]);
};

// 알림 읽음 처리
export const usePatchNotification = () =>
  useApiMutation<void, NotificationReadResponse>({
    method: "PATCH",
    endpoint: "", // 호출 시 전달
  });

// 알림 삭제
export const useDeleteNotification = () =>
  useApiMutation<void, NotificationDeleteResponse>({
    method: "DELETE",
    endpoint: "", // 호출 시 전달
  });