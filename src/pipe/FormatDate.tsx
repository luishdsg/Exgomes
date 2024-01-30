import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";

export const convertCreatedAt = (createdAt: Date) => {
    const createdAtDate = new Date(createdAt);
    const formattedDistance = formatDistanceToNow(createdAtDate, { locale: ptBR });
    return formattedDistance;
};