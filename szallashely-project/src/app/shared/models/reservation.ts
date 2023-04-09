export interface reservation {
    id: string;
    room_id: string;
    room_type: string;
    room_hotel: string;
    full_price: number;
    user_email: string;
    firstday: Date;
    lastday: Date;
}
