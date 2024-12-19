import { PackSchema } from "../types/packSchema";
import { TFunction } from "i18next";
import { typeOptions } from "../const/typeOptions";
import { generateDate } from "@shared/lib/helpers/generateDate/generateDate";

export const excelPackConfig = (item: PackSchema, t: TFunction, lang: string) => {
    const typeLabel = typeOptions.find((option) => option.value === String(item.type))?.label;

    return {
        [t("id", { lng: lang })]: item.id,
        [t("name", { lng: lang })]: item.name,
        [t("type", { lng: lang })]: typeLabel ? t(typeLabel, { lng: lang }) : "",
        [t("createdAt", { lng: lang })]: generateDate(item.createdAt),
        [t("updatedAt", { lng: lang })]: generateDate(item.updatedAt),
    };
};

export type ExcelConfigType = ReturnType<typeof excelPackConfig>;
