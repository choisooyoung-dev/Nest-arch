export default interface Res<T> {
    status: "success" | "fail" | "error";
    message?: string;
    data: T;
}
