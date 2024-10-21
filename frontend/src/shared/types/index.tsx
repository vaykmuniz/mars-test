export type Position = {
    x: number;
    y: number;
    face: string;
}

export type ResponsePosition = {
    msg?: string;
    current_position?: Position;
}