export enum ReplicationRequestMessages{
    VOTE_REQUEST = "VOTE_REQUEST",
    GLOBAL_COMMIT = "GLOBAL_COMMIT",
    GLOBAL_ABORT = "GLOBAL_ABORT"
}

export enum ReplicationResponseMessages{
    VOTE_COMMIT = "VOTE_COMMIT",
    VOTE_ABORT = "VOTE_ABORT"
}
