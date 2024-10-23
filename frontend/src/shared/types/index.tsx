export type Position = {
    id?: number;
    x: number;
    y: number;
    face: string;
}

export type ResponsePosition = {
    msg?: string;
    current_position?: Position;
}