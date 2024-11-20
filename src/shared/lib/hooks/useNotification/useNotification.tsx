import { useEffect } from "react";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";
import { App as AntApp } from "antd";
import { useTranslation } from "react-i18next";
import { NotificationData } from "@shared/const/notifications";
import { TranslationId } from "@shared/const/translation";

interface NotificationProps {
    isError: boolean;
    isSuccess: boolean;
    error: FetchBaseQueryError | SerializedError | undefined;
    notificationKey?: keyof typeof NotificationData;
    reset: () => void;
}

export const useNotification = (props: NotificationProps) => {
    const { isError, isSuccess, error, reset, notificationKey = "default" } = props;
    const { notification } = AntApp.useApp();
    const { t } = useTranslation(TranslationId.NOTIFICATION);

    useEffect(() => {
        if (isError && error) {
            notification.error({
                message: t(NotificationData.error),
                duration: 2,
            });
            reset();
        }

        if (isSuccess) {
            const messageKey = NotificationData[notificationKey];
            notification.success({
                message: t(messageKey),
                duration: 2,
            });
            reset();
        }
    }, [isError, isSuccess, error, notificationKey, notification, t, reset]);
};
